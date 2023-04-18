import { Application as TypeApplication } from '@/shared/structure';
import { getConversationsByApplicationId } from '../../interfaces';
import Application from '../../modules/Application';

export default async function ApplicaitonPage({params}: {params: {id: string}}) {
    const {id} = params;
    const application = await fetch(
        `http://localhost:3000/api/v1/applications/${id}`,
        {
            // cache: 'force-cache',
            cache: 'no-store',
            next: {revalidate: 0}
        }
    ).then(res => res.json()) as TypeApplication;
    console.log(application);
    const conversations = await getConversationsByApplicationId(id);
    return (
        <Application application={application} conversations={conversations} />
    )
}
