
import {PageContainer} from '../../components/ProLayout';

export default async function ChatbotLayout({children}: {children: React.ReactNode}) {
    return (
        <PageContainer className="w-screen h-screen min-h-screen">
            {children}
        </PageContainer>
    );
}
