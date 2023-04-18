import {Application} from '@/shared/structure';
import {get, post} from '@/shared/fetch';
import {CreateApplicationDto} from '@/service/applicaiton';

export async function getApplications() {
    const data = await get<unknown, Application[]>('http://localhost:3000/api/v1/applications');
    return data;
}

export const getApplication = async (id: string) => {
    const data = await get<unknown, Application>(
        `http://localhost:3000/api/v1/applications/${id}`
    );
    return data;
};


export const createApplication = ({accessToken, description, type}: CreateApplicationDto) =>
    post<CreateApplicationDto, Application>(
        'http://localhost:3000/api/v1/applications',
        {accessToken, description, type}
    );
