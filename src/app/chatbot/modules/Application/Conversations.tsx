'use client';

import {useQuery} from '@tanstack/react-query';
import {Menu} from 'antd';
import {Conversation} from '@/shared/structure';
import {getConversationsByApplicationId} from '../../interfaces';
import {useApplicationContext} from './ApplicationContextProvider';
import {ConversationItem} from './ConversationItem';
import NewConversationModalForm from './NewConversationModalForm';

interface Props {
    conversations: Conversation[];
}

export default function Conversations(props: Props) {
    const conversations = props.conversations;
    const {application, conversationId, setContextConversationId} = useApplicationContext();

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
                <ConversationItem conversation={conversation} />
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
            <NewConversationModalForm />
            <Menu
                onSelect={handleSelect}
                items={items}
                selectedKeys={[conversationId || '']}
                style={{backgroundColor: 'rgb(242, 243, 245)', border: 0}}
            />
        </>
    );
}
