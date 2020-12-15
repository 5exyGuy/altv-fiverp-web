import { Avatar } from 'antd';
import { useSession } from 'next-auth/client';
import MainLayout from '../../components/MainLayout';

export default function Profile(): JSX.Element {
    const [session, loading] = useSession();

    return (
        <MainLayout headerTitle="Profilis">
            <Avatar shape="square" size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }} src={session?.user?.image} />
        </MainLayout>
    );
}
