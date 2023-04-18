import {post} from '@/shared/fetch';
import {Application, ApplicationType} from '@/shared/structure';

export interface CreateApplicationDto {
    accessToken: string;
    description: string;
    type: ApplicationType;
}

export const saveApplicationToDb = (application: CreateApplicationDto) =>
    post<CreateApplicationDto, Application>(
        'http://localhost:3002/api/v1/applications',
        application
    );
