import {getApplication, getConversationsByApplicationId} from '../../interfaces';
import Application from '../../modules/Application';

export default async function ApplicationPage({params}: {params: {id: string}}) {
    const {id} = params;
    const application = await getApplication(
        id,
        {
            // cache: 'force-cache',
            cache: 'no-store',
            next: {revalidate: 0},
        }
    );

    const conversations = await getConversationsByApplicationId(id);

    return (
        <Application application={application} conversations={conversations} />
    );
}
