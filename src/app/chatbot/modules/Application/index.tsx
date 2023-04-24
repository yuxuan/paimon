'use client';

import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {Button} from 'antd';
import {Application, Conversation} from '@/shared/structure';
import {ApplicationContextProvider} from './ApplicationContextProvider';
import Conversations from './Conversations';
import Chat from './Chat';

function Sidebar({children}: {children: React.ReactNode}) {
    return (
        <div className="h-[calc(100vh_-_100px)] min-h-[calc(100vh_-_100px)] bg-white w-1/5">
            {children}
        </div>
    );
}

interface Props {
    application: Application;
    conversations: Conversation[];
}

const queryClient = new QueryClient();

export default function ApplicationApp({application, conversations}: Props) {
    return (
        <QueryClientProvider client={queryClient}>
            <ApplicationContextProvider application={application}>
                <Button type="link" href="/chatbot">返回应用列表</Button>
                <p>{application.description}</p>
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
