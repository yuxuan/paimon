import Welcome from './modules/Welcome';

export default async function Chatbot() {
    return (
        <div className="h-[calc(100vh_-_100px)] min-h-[calc(100vh_-_100px)]">
            <div className="w-full h-full flex items-center bg-white justify-center place-self-center">
                <Welcome />
            </div>
        </div>
    );
}
