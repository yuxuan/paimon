'use client';

import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {Menu} from 'antd';
import {DeleteOutlined} from '@ant-design/icons';
import {Conversation} from '@/shared/structure';
import {getConversationsByApplicationId, deleteConversation} from '../../interfaces';
import {useApplicationContext} from './ApplicationContextProvider';

interface Props {
    conversations: Conversation[];
}

export default function Conversations(props: Props) {
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
                    <div className="flex-1">{conversation.prompt}</div>
                    <div onClick={e => handleRemoveConversation(e, conversation.conversationId)}>
                        <DeleteOutlined />
                    </div>
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
        <Menu
            onSelect={handleSelect}
            items={items}
            selectedKeys={[conversationId || '']}
        />
    );
}
