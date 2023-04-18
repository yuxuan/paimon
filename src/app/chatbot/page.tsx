import Welcome from './modules/Welcome';

export default async function Chatbot() {
    return (
        <div className="w-screen h-screen min-h-screen">
            Welcome to chatbot
            <div className="w-1/2 h-1/2 flex items-center bg-white justify-center place-self-center">
                <Welcome />
            </div>
        </div>
    );
}
