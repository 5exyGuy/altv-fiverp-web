import { Col, Result, Row } from 'antd';
import MainLayout from '../../../components/MainLayout';
import { useSession } from 'next-auth/client';
import { NextRouter, useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Verify(): JSX.Element {
    const [session, loading] = useSession();
    const [title, setTitle] = useState('Prašome palaukti sekundėlę...');
    const [subTitle, setSubTitle] = useState('Prašome palaukti sekundėlę...');
    const router: NextRouter = useRouter();

    const { type } = router.query;

    useEffect(() => {
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

        setTimeout(() => {
            router.push('/');
        }, 5000);
    }, [type]);

    return (
        <MainLayout session={session} loading={loading} protected={Boolean(!type)}>
            <Row justify="center" align="middle">
                <Col>
                    <Result status="info" title={title} subTitle={subTitle} />
                </Col>
            </Row>
        </MainLayout>
    );
}
