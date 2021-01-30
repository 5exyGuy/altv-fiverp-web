import { Col, Row, Result, Button } from 'antd';
import { StatusCodes } from 'http-status-codes';
import { useSession } from 'next-auth/client';
import Link from 'next/link';
import { NextRouter, useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import MainLayout from '../../../components/MainLayout';

export default function Confirmed(): JSX.Element {
    const router: NextRouter = useRouter();
    const [session, loading] = useSession();
    const [valid, setValid] = useState(false);

    const { email, token } = router.query;

    useEffect(() => {
        const fetchData = async () => {
            if (session && !loading) return await router.push('/');
            if (!email || !token) return await router.push('/');
            if (Array.isArray(email) || Array.isArray(token)) return await router.push('/');

            const result: Response = await fetch('/api/valid_register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, token }),
            });
            if (result.status !== StatusCodes.OK) return await router.push('/');
            setValid(true);
        };
        fetchData();
    }, [session, loading, email, token, valid]);

    return (
        <MainLayout headerTitle="Registracijos patvirtinimas" session={session} loading={loading} protected={Boolean(!valid || session)}>
            <Row justify="center" align="middle">
                <Col span={10} style={{ margin: '10% 0' }}>
                    <Result
                        status="success"
                        subTitle="Elektroninis paštas sėkmingai patvirtintas. Dabar galite prisijungti prie sistemos."
                        extra={[
                            <Link href="/auth/login">
                                <Button type="primary" key="login">
                                    Prisijungti
                                </Button>
                            </Link>,
                            <Link href="/">
                                <Button key="home">Grįžti į pagrindinį</Button>
                            </Link>,
                        ]}
                    />
                </Col>
            </Row>
        </MainLayout>
    );
}
