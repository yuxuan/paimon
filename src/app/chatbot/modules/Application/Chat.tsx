'use client';

import React, {useCallback, useState} from 'react';
import {Button, Input, Skeleton, Space} from 'antd';
import {useMutation, useQuery} from '@tanstack/react-query';
import {useImmer} from 'use-immer';
import {useBoolean} from 'huse';
import {Message as TypeMessage, RoleConst, Application} from '@/shared/structure';
import {createMessage, getMessagesByConversationId} from '../../interfaces';
import Message from '../../components/Message';
import {useApplicationContext} from './ApplicationContextProvider';

interface ThingkMessagePlaceholderProps {
    conversationId: string;
    application: Application;
}

const ThingkMessagePlaceholder = ({conversationId, application}: ThingkMessagePlaceholderProps) => {
    return (
        <Message
            message={{
                content: '正在思考...',
                conversationId: conversationId,
                role: RoleConst.ASSISTANT,
            }}
            applicationType={application.type}
        />
    );
};

export default function Chat() {
    const {application, conversationId} = useApplicationContext();
    const [thinking, {on: onThink, off: offThink}] = useBoolean(false);
    const [messages, setMessages] = useImmer<TypeMessage[]>([]);
    const [inputValue, setInputValue] = useState('');

    const getHistoryMessageQuery = useQuery(
        ['messages', conversationId],
        () => getMessagesByConversationId(conversationId),
        {
            onSuccess(data) {
                setMessages(data);
            },
        }
    );

    const createMessageMutation = useMutation(createMessage);

    const handleMessageSubmit = useCallback(
        async () => {
            onThink();
            const message = inputValue;

            setInputValue('');

            const newMessage = {
                content: message,
                role: RoleConst.USER,
                conversationId: conversationId!,
            };

            try {
                const replyMessage = {
                    content: '正在思考...',
                    conversationId: conversationId!,
                    role: RoleConst.ASSISTANT,
                };

                setMessages(messages => {
                    messages.push(newMessage);
                });

                const replyResponse = await createMessageMutation.mutateAsync({
                    content: message,
                    conversationId: conversationId!,
                    role: RoleConst.USER,
                    applicationType: application.type,
                    applicationId: application.applicationId,
                });

                setMessages(messages => {
                    messages.push({...replyMessage, content: replyResponse.content});
                });
            } catch (e) {
                setMessages(messages => {
                    messages.splice(messages.length - 1, 1, {
                        content: '响应失败了呢...',
                        role: RoleConst.ASSISTANT,
                        conversationId: conversationId!,
                    });
                });
                console.error(e);
            }
            finally {
                offThink();
            }
        },
        [application, conversationId, createMessageMutation, inputValue, setMessages, offThink, onThink]
    );

    const onChange = useCallback(
        (e: any) => {
            setInputValue(e.target.value);
        },
        []
    );
    const displayStyle = getHistoryMessageQuery.isLoading ? 'hidden' : 'block';

    return (
        <>
            {getHistoryMessageQuery.isLoading && <Skeleton />}
            <div className={displayStyle}>
                <div className="overflow-y-auto h-[calc(100vh_-_206px)] break-all">
                    {
                        conversationId && messages.map((message, index) => {
                            return (
                                // eslint-disable-next-line react/no-array-index-key
                                <Message key={index} message={message} applicationType={application.type} />
                            );
                        })
                    }
                    {
                        thinking ? (
                            <ThingkMessagePlaceholder conversationId={conversationId!} application={application} />)
                            : null
                    }
                </div>
                <Space direction="vertical" size={10} className="w-full mt-[10px]">
                    <Input.TextArea
                        onChange={onChange}
                        value={inputValue}
                        disabled={thinking}
                        placeholder={thinking ? '正在思考' : '请输入问题'}
                    />
                    <Button htmlType="submit" onClick={handleMessageSubmit} type="primary">提交</Button>
                </Space>
            </div>
        </>
    );
}
