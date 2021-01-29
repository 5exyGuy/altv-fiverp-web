import { Avatar, PageHeader } from 'antd';
import { useSession } from 'next-auth/client';
import Router from 'next/router';
import { useEffect } from 'react';
import MainLayout from '../../components/MainLayout';

export default function Profile(): JSX.Element {
    const [session, loading] = useSession();

    if (!loading && !session) Router.push('/');

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('/api/user/profile');
            const json = await res.json();
        };
        fetchData();
    }, [session]);

    if (typeof window !== 'undefined' && loading) return null;

    return (
        <MainLayout headerTitle="Profilis" session={session} loading={loading} protected={Boolean(!session)}>
            <Avatar shape="square" size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }} src={session?.user?.image} />
        </MainLayout>
    );
}
