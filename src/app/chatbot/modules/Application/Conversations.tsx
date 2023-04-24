'use client';

import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {Menu, theme, GlobalToken, Button} from 'antd';
import {DeleteOutlined} from '@ant-design/icons';
import styled from '@emotion/styled';
import {Conversation} from '@/shared/structure';
import {getConversationsByApplicationId, deleteConversation} from '../../interfaces';
import {useApplicationContext} from './ApplicationContextProvider';

const genRemoveIconWrapper = (token: GlobalToken) => styled.div`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 24px;
    height: 24px;
    border-radius: 50%;
    :hover {
        background-color: ${token.colorBgTextHover};
    }
`;

interface Props {
    conversations: Conversation[];
}

export default function Conversations(props: Props) {
    const {token} = theme.useToken();
    const RemoveIconWrapper = genRemoveIconWrapper(token);
    const conversations = props.conversations;
    const {application, conversationId, setContextConversationId} = useApplicationContext();
    const queryClient = useQueryClient();

    const deleteConversationMutation = useMutation(
        deleteConversation,
        {
            onSuccess() {
                queryClient.invalidateQueries({queryKey: ['conversationList']});
            },
        });

    const handleRemoveConversation = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, clickId: string) => {
        e.stopPropagation();
        deleteConversationMutation.mutate(clickId);
    };

    const listConversations = useQuery(
        ['conversationList', application.applicationId],
        () => getConversationsByApplicationId(application.applicationId),
        {
            initialData: conversations,
        }
    );

    const items = listConversations.data?.map((conversation: Conversation) => {
        return {
            key: conversation.conversationId,
            label: (
                <div className="flex items-center">
                    <div className="truncate">{conversation.prompt}</div>
                    <RemoveIconWrapper onClick={e => handleRemoveConversation(e, conversation.conversationId)}>
                        <DeleteOutlined />
                    </RemoveIconWrapper>

                </div>
            ),
            value: conversation.conversationId,
        };
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const handleSelect = ({item, key}: {item: any, key: string}) => {
        setContextConversationId(key);
    };

    return (
        <>
            <Button onClick={() => setContextConversationId(null)}>新建对话</Button>

            <Menu
                onSelect={handleSelect}
                items={items}
                selectedKeys={[conversationId || '']}
            />
        </>
    );
}
