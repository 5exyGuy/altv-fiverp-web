import { Col, Row } from 'antd';
import MainLayout from '../../../components/MainLayout';
import { useSession } from 'next-auth/client';
import Router from 'next/router';

export default function Forgot(): JSX.Element {
    const [session, loading] = useSession();

    if (!loading && session) Router.push('/');

    return (
        <MainLayout headerTitle="Prisijungimo patvirtinimas" session={session} loading={loading} protected={Boolean(!loading && session)}>
            <Row justify="center" align="middle">
                <Col span={10} style={{ margin: '10% 0' }}></Col>
            </Row>
        </MainLayout>
    );
}
