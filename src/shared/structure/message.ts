export const RoleConst = {
    USER: 'USER',
    ASSISTANT: 'ASSISTANT',
} as const;

export type Role = (typeof RoleConst)[keyof typeof RoleConst];

interface MessageBase {
    conversationId: string;
    role: Role;
    content: string;
    messageId: string;
}

export type Message = Omit<MessageBase, 'messageId'>;
