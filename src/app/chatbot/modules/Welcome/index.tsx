'use client';

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import WelcomeForm from "./WelcomeForm";

const queryClient = new QueryClient();

export default function Welcome() {
    return (
        <QueryClientProvider client={queryClient}>
            <WelcomeForm />
        </QueryClientProvider>
    )
}