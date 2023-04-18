import { Message } from '@/shared/structure';
import {Configuration, OpenAIApi} from 'openai';

let openai: OpenAIApi;

export const initOpenAi = (accessToken: string) => {
    const configuration = new Configuration({
        apiKey: accessToken,
    });
    openai = new OpenAIApi(configuration);
}

export const chat = ({token, messages}: {token: string, messages: Message[]}) => {
    const messagesSanitized = messages.map(({content, role}) => ({content, role: role.toLowerCase()}));

    const payload = {
        model: 'gpt-3.5-turbo-0301',
        messages: messagesSanitized,
    }
    return fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
    }).then(res => res.json());
};
