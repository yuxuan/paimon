'use client';

import {useState, useEffect} from 'react';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {Button} from 'antd';
import {Application, Conversation} from '@/shared/structure';
import {getApplication, getConversationsByApplicationId} from '../../interfaces';
import {ApplicationContextProvider} from './ApplicationContextProvider';
import Conversations from './Conversations';
import Chat from './Chat';

function Sidebar({children}: {children: React.ReactNode}) {
    return (
        <div className="h-[calc(100vh_-_100px)] min-h-[calc(100vh_-_100px)] bg-white w-1/5 overflow-auto">
            {children}
        </div>
    );
}

interface Props {
    application: Application;
    conversations: Conversation[];
}

const queryClient = new QueryClient();

function ApplicationApp({application, conversations}: Props) {

    if (!application || !conversations) {
        return null;
    }

    return (
        <QueryClientProvider client={queryClient}>
            <ApplicationContextProvider application={application}>
                <div className="flex">
                    <Button type="link" href="/chatbot">返回应用列表</Button>
                    <p>{application.description}</p>
                </div>
                <div className="flex gap-5 overflow-hidden">
                    <Sidebar>
                        {
                            conversations.length > 0 ? <Conversations conversations={conversations} /> : <p>暂无会话</p>
                        }
                    </Sidebar>
                    <div className="flex-1 overflow-hidden max-h-[calc(100vh_-_100px)]">
                        <Chat />
                    </div>
                </div>
            </ApplicationContextProvider>
        </QueryClientProvider>
    );
}

export default function ApplicationPage({id}: {id: string}) {
    const [application, setApplication] = useState<any>();
    const [conversations, setconversations] = useState<any>();

    useEffect(
        () => {
            getApplication(id).then(application => setApplication(application));
            getConversationsByApplicationId(id).then(conversations => setconversations(conversations));
        },
        []
    );

    return (
        <ApplicationApp application={application} conversations={conversations} />
    );
}
