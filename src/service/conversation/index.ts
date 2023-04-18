import { post } from "@/shared/fetch";
import { Conversation } from "@/shared/structure";

export type SaveConversationDto = {
    prompt: string;
    applicationId: string;
    user?: string;
}

export const saveConversationToDb = (conversation: SaveConversationDto) => post<SaveConversationDto, Conversation>(
    `http://localhost:3002/api/v1/conversations`,
    conversation
)