'use client';

import {useMutation, useQueryClient} from '@tanstack/react-query';
import {theme, Spin, GlobalToken} from 'antd';
import {DeleteOutlined} from '@ant-design/icons';
import {useBoolean} from 'huse';
import {useCallback} from 'react';
import styled from '@emotion/styled';
import {Conversation} from '@/shared/structure';
import {deleteConversation} from '../../interfaces';
import {useApplicationContext} from './ApplicationContextProvider';

const genRemoveIconWrapper = (themeToken: GlobalToken) => styled.div`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 24px;
    height: 24px;
    border-radius: 50%;
    :hover {
        background-color: ${themeToken.colorBgTextHover};
    }
`;

interface Props {
    conversation: Conversation;
}

export const ConversationItem = ({conversation}: Props) => {
    const {token: themeToken} = theme.useToken();
    const RemoveIconWrapper = genRemoveIconWrapper(themeToken);
    const queryClient = useQueryClient();
    const {setContextConversationId} = useApplicationContext();

    const [deleteLoading, {on: deleteLoadingOn, off: deleteLoadingOff}] = useBoolean(false);
    const deleteConversationMutation = useMutation(
        deleteConversation,
        {
            onSuccess() {
                queryClient.invalidateQueries({queryKey: ['conversationList']});
                setContextConversationId(null);
            },
            onSettled() {
                deleteLoadingOff();
            },
        }
    );
    const handleRemoveConversation = useCallback(
        (e: any, clickId: string) => {
            e.stopPropagation();
            deleteLoadingOn();
            deleteConversationMutation.mutateAsync(clickId);

        },
        [deleteConversationMutation, deleteLoadingOn]
    );

    return (
        <div className="flex items-center justify-between">
            <div className="truncate">{conversation.prompt}</div>
            <RemoveIconWrapper onClick={e => handleRemoveConversation(e, conversation.conversationId)}>
                {deleteLoading ? <Spin /> : <DeleteOutlined />}
            </RemoveIconWrapper>
        </div>
    );
};
