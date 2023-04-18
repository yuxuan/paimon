export default async function ChatbotLayout({children}: {children: React.ReactNode}) {
    return (
        <div className="w-screen h-screen min-h-screen">
            {children}
        </div>
    )
}