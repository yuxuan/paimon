import Application from '../../modules/Application';

export default async function ApplicationPage({params}: {params: {id: string}}) {
    const {id} = params;
    return (
        <Application id={id} />
    );
}
