export const Role = {
    USER: 'USER',
    ASSISTANT: 'ASSISTANT',
} as const;

export type Role = (typeof Role)[keyof typeof Role];

interface MessageBase {
    conversationId: string;
    role: Role;
    content: string;
    messageId: string;
}

export type Message = Omit<MessageBase, 'messageId'>;