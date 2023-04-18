'use client';

import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {Application, Conversation} from '@/shared/structure';
import {ApplicationContextProvider} from './ApplicationContextProvider';
import Conversations from './Conversations';
import Chat from './Chat';

function Sidebar({children}: {children: React.ReactNode}) {
    return (
        <div className="">
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
                <p>{application.description}</p>
                <div className="flex">
                    <Sidebar>
                        {
                            conversations.length > 0 ? <Conversations conversations={conversations} /> : <p>暂无会话</p>
                        }
                    </Sidebar>
                    <div className="flex-1">
                        <Chat />
                    </div>
                </div>
            </ApplicationContextProvider>
        </QueryClientProvider>
    );
}
