'use client';

import Image from 'next/image';
import {Message as TypeMessage, ApplicationType} from '@/shared/structure';
import yiyanAvatar from '../../../../public/yiyan.png';
import gptAvatar from '../../../../public/ChatGPT.png';
import userAvatar from '../../../../public/user.png';

interface Props {
    message: TypeMessage;
    applicationType: ApplicationType;
}

const YiyanAvatar = () => <Image src={yiyanAvatar} className="w-8 h-8 rounded-md" alt="yiyan avatar" />;
const GptAvatar = () => <Image src={gptAvatar} className="w-8 h-8 rounded-md" alt="yiyan avatar" />;
const UserAvatar = () => <Image src={userAvatar} className="w-8 h-8 rounded-md" alt="yiyan avatar" />;

export default function Message({message, applicationType}: Props) {
    const assistantAvatar = applicationType === 'yiyan' ? <YiyanAvatar /> : <GptAvatar />;
    const userAvatar = <UserAvatar />;

    return (
        <div className="flex items-start gap-1 mb-5">
            {message.role === 'ASSISTANT' ? assistantAvatar : userAvatar }
            <pre className="whitespace-pre-wrap">{message.content}</pre>
        </div>
    );
}
