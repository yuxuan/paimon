'use client';

import Image from 'next/image';
import {Message as TypeMessage, ApplicationType} from '@/shared/structure';
import CopyClipBoard from './CopyClipBoard';
import {Tooltip} from 'antd';
import styled from '@emotion/styled';
import yiyanAvatar from '../../../../public/yiyan.png';
import gptAvatar from '../../../../public/chatgpt.png';
import userAvatar from '../../../../public/user.png';

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

export default function Message({message, applicationType}: Props) {
    const assistantAvatar = applicationType === 'yiyan' ? <YiyanAvatar /> : <GptAvatar />;
    const userAvatar = <UserAvatar />;
    const Answer = genAnswer(message.role);

    return (
        <div className="flex items-start gap-1 mb-5">
            {message.role === 'ASSISTANT' ? assistantAvatar : userAvatar }
            <Tooltip title={<CopyClipBoard content={message.content} />} color="#fff" placement="topRight">
                <Answer>
                    {message.content}
                </Answer>
            </Tooltip>
        </div>
    );
}
