import NextAuth from 'next-auth';

// eslint-disable-next-line new-cap
const handler = NextAuth({
    providers: null as any,
    cookies: {a: '1f'} as any,
});

export {handler as GET, handler as POST};
