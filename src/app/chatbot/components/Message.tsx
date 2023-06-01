'use client';

import Image from 'next/image';
import {Space, Tooltip} from 'antd';
import styled from '@emotion/styled';
import {RedoOutlined} from '@ant-design/icons';
import {Message as TypeMessage, ApplicationType} from '@/shared/structure';
import yiyanAvatar from '../../../../public/yiyan.png';
import gptAvatar from '../../../../public/chatgpt.png';
import userAvatar from '../../../../public/user.png';
import CopyClipBoard from './CopyClipBoard';

interface Props {
    message: TypeMessage;
    applicationType: ApplicationType;
}

const YiyanAvatar = () => <Image src={yiyanAvatar} className="w-8 h-8 rounded-md" alt="yiyan avatar" />;
const GptAvatar = () => <Image src={gptAvatar} className="w-8 h-8 rounded-md" alt="yiyan avatar" />;
const UserAvatar = () => <Image src={userAvatar} className="w-8 h-8 rounded-md" alt="yiyan avatar" />;

const genAnswer = (role: string) => styled.pre`
    white-space: pre-wrap;
    border-radius: 5px;
    padding: 10px;
    max-width: 92%;
    background-color: ${role === 'ASSISTANT' ? 'rgb(219 234 254)' : 'rgb(229 231 235)'};
`;


const Retry = () => {
    return (
        <div className="text-[#94a3b8] hover:text-[#64748b] hover:cursor-pointer flex items-center">
            <RedoOutlined />
        </div>
    );
};

interface TooltipContentProps {
    messageContent: string;
}

const TooltipContent = ({messageContent}: TooltipContentProps) => {
    return (
        <Space>
            <CopyClipBoard content={messageContent} />
            <Retry />
        </Space>
    );
};
export default function Message({message, applicationType}: Props) {
    const assistantAvatar = applicationType === 'yiyan' ? <YiyanAvatar /> : <GptAvatar />;
    const userAvatar = <UserAvatar />;
    const Answer = genAnswer(message.role);

    return (
        <div className="flex items-start gap-1 mb-5">
            {message.role === 'ASSISTANT' ? assistantAvatar : userAvatar }
            <Tooltip title={<TooltipContent messageContent={message.content} />} color="#fff" placement="topRight">
                <Answer>
                    {message.content}
                </Answer>
            </Tooltip>
        </div>
    );
}
