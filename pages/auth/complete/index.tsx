import { Col, Result, Row } from 'antd';
import MainLayout from '../../../components/MainLayout';
import { useSession } from 'next-auth/client';
import { NextRouter, useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Verify(): JSX.Element {
    const [session, loading] = useSession();
    const router: NextRouter = useRouter();
    const [title, setTitle] = useState('');
    const [subTitle, setSubTitle] = useState('');

    const { type } = router.query;

    useEffect(() => {
        const run = async () => {
            if (!type) return;
            if (Array.isArray(type)) return await router.push('/');

            if (type === 'loginwithemail') {
                setTitle('Prisijungimas sėkmingas');
                setSubTitle('Jūs sėkmingai prisijungėte prie sistemos!');
            } else if (type === 'resetpassword') {
                setTitle('Slaptažodžio atstatymas sėkmingas');
                setSubTitle('Jūs sėkmingai pakeitėte savo paskyros slaptažodį! Dabar galite prisijungti prie sistemos.');
            } else if (type === 'registration') {
                setTitle('Registracija sėkminga');
                setSubTitle('Jūs sėkmingai užbaigėte registraciją! Dabar galite prisijungti prie sistemos.');
            }

            setTimeout(async () => {
                await router.push('/');
            }, 5000);
        };
        run();
    }, [type, title, subTitle]);

    return (
        <MainLayout session={session} loading={loading} protected={Boolean(!type || Array.isArray(type))}>
            <Row justify="center" align="middle">
                <Col>
                    <Result status="info" title={title} subTitle={subTitle} />
                </Col>
            </Row>
        </MainLayout>
    );
}
