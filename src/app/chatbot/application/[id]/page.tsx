import {Application as TypeApplication} from '@/shared/structure';
import {getConversationsByApplicationId} from '../../interfaces';
import Application from '../../modules/Application';

export default async function ApplicationPage({params}: {params: {id: string}}) {
    const {id} = params;
    const application = await fetch(
        `${process.env.API_BASE_URL}/api/v1/applications/${id}`,
        {
            // cache: 'force-cache',
            cache: 'no-store',
            next: {revalidate: 0},
        }
    ).then(res => res.json()) as TypeApplication;

    const conversations = await getConversationsByApplicationId(id);

    return (
        <Application application={application} conversations={conversations} />
    );
}
