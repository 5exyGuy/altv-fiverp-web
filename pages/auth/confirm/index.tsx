import { Col, Result, Row } from 'antd';
import MainLayout from '../../../components/MainLayout';
import { useSession } from 'next-auth/client';
import { NextRouter, useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Confirm(): JSX.Element {
    const [session, loading] = useSession();
    const [title, setTitle] = useState('Prašome palaukti sekundėlę...');
    const router: NextRouter = useRouter();

    const { type } = router.query;

    useEffect(() => {
        if (type === 'loginwithemail') setTitle('Prisijungimo patvirtinimas');
        else if (type === 'resetpassword') setTitle('Slaptažodžio atstatymo patvirtinimas');
        else if (type === 'registration') setTitle('Registracijos patvirtinimas');

        setTimeout(() => {
            router.push('/');
        }, 5000);
    }, [type, title]);

    return (
        <MainLayout session={session} loading={loading} protected={Boolean(!type)}>
            <Row justify="center" align="middle">
                <Col>
                    <Result
                        status="info"
                        title={title}
                        subTitle="Netrukus į Jūsų nurodytą el. paštą bus išsiųstas laiškas su patvirtinimu. Jei laiško nerandate, patikrinkite, ar išsiųstas pranešimas nėra šiukliadėžėje."
                    />
                </Col>
            </Row>
        </MainLayout>
    );
}
