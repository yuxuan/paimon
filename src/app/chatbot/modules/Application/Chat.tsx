'use client';

import React, { useCallback, useState } from 'react';
import { Button, Input, Skeleton } from 'antd';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useApplicationContext } from './ApplicationContextProvider';
import { createConversation, createMessage, getMessagesByConversationId } from '../../interfaces';
import { useImmer } from 'use-immer';
import { Message, Role } from '@/shared/structure';

interface ChatProps {
    conversationId?: string
}

export default function Chat (props: ChatProps) {
    const {application} = useApplicationContext();
    const {conversationId, setContextConversationId} = useApplicationContext()
    const [messages, setMessages] = useImmer<Message[]>([]);
    const [inputValue, setInputValue] = useState('');

    const getHistoryMessageQuery = useQuery(
        ['messages', conversationId],
        () => getMessagesByConversationId(conversationId),
        {
            onSuccess(data) {
                if (data.length) {
                    setMessages(data)
                }
            }
        }
    );

    const createMessageMutation = useMutation(createMessage);
    const createConversationMutation = useMutation(createConversation);

    const queryClient = useQueryClient();

    const handleMessageSubmit = useCallback(
        async () => {

            const message = inputValue;

            setInputValue('');

            let tmpConversationId = conversationId;

            if (!tmpConversationId) {
                const {conversationId} = await createConversationMutation.mutateAsync({
                    prompt: message,
                    applicationId: application.applicationId,
                })

                tmpConversationId = conversationId;
                queryClient.invalidateQueries({ queryKey: ['conversationList'] })
                setContextConversationId(tmpConversationId);
            }

            const newMessage = {
                content: message,
                role: Role.USER,
                conversationId: tmpConversationId!
            };

            setMessages(messages => {
                messages.push(newMessage);
            });

            const replyResponse = await createMessageMutation.mutateAsync({
                content: message,
                conversationId: tmpConversationId!,
                role: Role.USER,
                applicationType: application.type
            }); // yiyanresponse

            const replyMessage = {
                content: replyResponse.content,
                conversationId: tmpConversationId!,
                role: Role.ASSISTANT,
            }

            setMessages(messages => {
                messages.push(replyMessage);
            });
        },
        [application, conversationId, createConversationMutation, createMessageMutation, inputValue, queryClient, setContextConversationId, setMessages]
    )

    if (getHistoryMessageQuery.isLoading) {
        return <Skeleton />;
    }

    return (
        <>
            {
                messages.map((message, index) => {
                    return <pre key={index}>{message.content}</pre>;
                })
            }
            <Input.TextArea onChange={e => setInputValue(e.target.value)} value={inputValue} />
            <Button htmlType='submit' onClick={handleMessageSubmit}>提交</Button>
        </>
    )
}
