import {get, post} from '@/shared/fetch';
import {ApplicationType, Message} from '@/shared/structure';


export type CreateMessageDto = Omit<Message & {applicationType?: ApplicationType}, 'messageId'>;

interface GetConversationMessagesDto {conversationId: string}

export const saveMessageToDb = (message: CreateMessageDto) =>
    post<CreateMessageDto, Message>(
        `${process.env.SERVICE_BASE_URL}/api/v1/messages`,
        message
    );

export const getMessagesByConversationId = (conversationId: string) =>
    get<GetConversationMessagesDto, Message[]>(
        `${process.env.SERVICE_BASE_URL}/api/v1/messages`,
        {conversationId}
    );
