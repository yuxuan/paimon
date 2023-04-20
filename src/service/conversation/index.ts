import {post} from '@/shared/fetch';
import {Conversation} from '@/shared/structure';

export interface SaveConversationDto {
    prompt: string;
    applicationId: string;
    user?: string;
}

export const saveConversationToDb = (conversation: SaveConversationDto) => post<SaveConversationDto, Conversation>(
    `${process.env.SERVICE_BASE_URL}/api/v1/conversations`,
    conversation
);
