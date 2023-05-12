'use client';

import {useState, useEffect} from 'react';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {Button} from 'antd';
import styled from '@emotion/styled';
import {Application, Conversation} from '@/shared/structure';
import {getApplication, getConversationsByApplicationId} from '../../interfaces';
import {ApplicationContextProvider} from './ApplicationContextProvider';
import Conversations from './Conversations';
import Chat from './Chat';
const SidebarContent = styled.div`
    height: calc(100vh - 100px);
    min-height: calc(100vh - 100px);
    flex-basis: 250px;
    background-color: rgb(242, 243, 245);
    box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;
    overflow: auto;
    padding: 20px 10px;
    border: 1px solid rgba(0,0,0,.1);
    border-radius: 8px;
`;
function Sidebar({children}: {children: React.ReactNode}) {
    return (
        <SidebarContent>
            {children}
        </SidebarContent>
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
                    <h3>{application.description}</h3>
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
        [id]
    );

    return (
        <ApplicationApp application={application} conversations={conversations} />
    );
}
