import { Avatar } from 'antd';
import { useSession } from 'next-auth/client';
import { useEffect } from 'react';
import MainLayout from '../../components/MainLayout';

export default function Profile(): JSX.Element {
    const [session, loading] = useSession();

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('/api/user/profile');
            const json = await res.json();
            console.log(json);
        };
        fetchData();
    }, [session]);

    return (
        <MainLayout headerTitle="Profilis">
            <Avatar shape="square" size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }} src={session?.user?.image} />
        </MainLayout>
    );
}
