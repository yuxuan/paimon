'use client';

import React, {useCallback, useState} from 'react';
import {Button, Input, Skeleton, Space} from 'antd';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {useImmer} from 'use-immer';
import {useBoolean} from 'huse';
import {Message as TypeMessage, RoleConst} from '@/shared/structure';
import {createConversation, createMessage, getMessagesByConversationId} from '../../interfaces';
import Message from '../../components/Message';
import {useApplicationContext} from './ApplicationContextProvider';

export default function Chat() {
    const {application} = useApplicationContext();
    const {conversationId, setContextConversationId} = useApplicationContext();
    const [thinking, {on: onThink, off: offThink}] = useBoolean(false);
    const [messages, setMessages] = useImmer<TypeMessage[]>([]);
    const [inputValue, setInputValue] = useState('');

    const getHistoryMessageQuery = useQuery(
        ['messages', conversationId],
        () => getMessagesByConversationId(conversationId),
        {
            onSuccess(data) {
                if (data.length) {
                    setMessages(data);
                }
            },
        }
    );

    const createMessageMutation = useMutation(createMessage);
    const createConversationMutation = useMutation(createConversation);

    const queryClient = useQueryClient();

    const handleMessageSubmit = useCallback(
        async () => {
            onThink();
            const message = inputValue;

            setInputValue('');

            let tmpConversationId = conversationId;

            if (!tmpConversationId) {
                const {conversationId} = await createConversationMutation.mutateAsync({
                    prompt: message,
                    applicationId: application.applicationId,
                });

                tmpConversationId = conversationId;
                queryClient.invalidateQueries({queryKey: ['conversationList']});
                setContextConversationId(tmpConversationId);
            }

            const newMessage = {
                content: message,
                role: RoleConst.USER,
                conversationId: tmpConversationId!,
            };

            try {
                const replyMessage = {
                    content: '正在思考...',
                    conversationId: tmpConversationId!,
                    role: RoleConst.ASSISTANT,
                };

                setMessages(messages => {
                    messages.push(newMessage, replyMessage);
                });
                const replyResponse = await createMessageMutation.mutateAsync({
                    content: message,
                    conversationId: tmpConversationId!,
                    role: RoleConst.USER,
                    applicationType: application.type,
                    applicationId: application.applicationId,
                });

                setMessages(messages => {
                    messages.splice(messages.length - 1, 1, {...replyMessage, content: replyResponse.content});
                });
                offThink();
            } catch (e) {
                setMessages(messages => {
                    messages.splice(messages.length - 1, 1, {
                        content: '响应失败了呢...',
                        role: RoleConst.ASSISTANT,
                        conversationId: tmpConversationId!,
                    });
                });
                console.error(e);
                offThink();
            }
        },
        [
            application,
            conversationId,
            createConversationMutation,
            createMessageMutation,
            inputValue, queryClient,
            setContextConversationId,
            setMessages,
            offThink,
            onThink,
        ]
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
                </div>
                <Space direction="vertical" size={10} className="w-full mt-[10px]">
                    <Input.TextArea
                        onChange={onChange}
                        value={inputValue}
                        disabled={thinking}
                        placeholder={thinking ? '正在思考' : '回车或点击提交'}
                        onPressEnter={handleMessageSubmit}
                    />
                    <Button htmlType="submit" onClick={handleMessageSubmit} type="primary">提交</Button>
                </Space>
            </div>
        </>
    );
}
