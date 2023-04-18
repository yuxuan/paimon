export type ApplicationType = 'yiyan'|'gpt';

export interface Application {
    applicationId: string;
    accessToken: string;
    type: ApplicationType;
    description?: string;
}

