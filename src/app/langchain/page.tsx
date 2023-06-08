import {OpenAI} from 'langchain/llms/openai';
import {cookies} from 'next/headers';

export default async function Chatbot() {
    const cookieStore = cookies();
    const token = cookieStore.get('token')?.value;

    const model = new OpenAI({openAIApiKey: token, temperature: 0.9});
    const res = await model.call(
        'What would be a good company name a company that makes colorful socks?'
    );
    return (
        <div className="h-[calc(100vh_-_100px)] min-h-[calc(100vh_-_100px)]">
            <div className="w-full h-full">
                hello {res}
            </div>
        </div>
    );
}
