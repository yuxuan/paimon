import {Message} from '@/shared/structure';

const QIANFAN_URL = 'https://aip.baidubce.com/rpc/2.0/ai_custom/v1/wenxinworkshop/chat/completions';

export const chat = async ({token, messages}: {token: string, messages: Message[]}) => {
    const messagesSanitized = messages.map(({content, role}) => ({content, role: role.toLowerCase()}));

    const payload = {messages: messagesSanitized};

    // eslint-disable-next-line no-console
    console.log('🚀 ~ chat ~ payload:', payload);

    const data = await fetch(
        `${QIANFAN_URL}?access_token=${token}`,
        {
            method: 'POST',
            body: JSON.stringify(payload),
        }
    ).then(res => res.json());

    return data;
};
