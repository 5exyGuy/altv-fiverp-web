import { Button, Col, Form, Input, Result, Row } from 'antd';
import MainLayout from '../../../components/MainLayout';
import { useSession } from 'next-auth/client';
import { NextRouter, useRouter } from 'next/router';
import { LockOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { StatusCodes } from 'http-status-codes';
import Link from 'next/link';

type ResetPasswordData = {
    password: string;
    repeatpassword: string;
};

export default function Reset(): JSX.Element {
    const router: NextRouter = useRouter();
    const [session, loading] = useSession();
    const [valid, setValid] = useState(false);
    const [visible, setVisible] = useState(false);

    const { email, token } = router.query;

    useEffect(() => {
        const fetchData = async () => {
            if (session && !loading) return await router.push('/');
            if (!email || !token) return await router.push('/');
            if (Array.isArray(email) || Array.isArray(token)) return await router.push('/');

            const result: Response = await fetch('/api/valid_reset_password', {
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

    const onFinish = async (data: ResetPasswordData) => {
        const result: Response = await fetch('/api/cauth/reset_password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, token, password: data.password }),
        });
        if (result.status === StatusCodes.OK) setVisible(true);
    };

    return (
        <MainLayout headerTitle="Slaptažodžio atstatymas" session={session} loading={loading} protected={Boolean(!valid || session)}>
            <Row justify="center" align="middle">
                <Col span={10} style={{ margin: '10% 0' }}>
                    {visible ? (
                        <Result
                            status="success"
                            subTitle="Slaptažodis sėkmingai atstatytas. Dabar galite prisijungti prie sistemos."
                            extra={[
                                <Link href="/auth/login">
                                    <Button key="login">Prisijungti</Button>
                                </Link>,
                                <Link href="/">
                                    <Button key="home">Grįžti į pagrindinį</Button>
                                </Link>,
                            ]}
                        />
                    ) : (
                        <Form onFinish={onFinish}>
                            <Form.Item name="password" rules={[{ required: true, message: 'Prašome įvesti naują slaptažodį!' }]}>
                                <Input
                                    prefix={<LockOutlined className="site-form-item-icon" />}
                                    type="password"
                                    placeholder="Naujas slaptažodis"
                                />
                            </Form.Item>
                            <Form.Item
                                name="repeatpassword"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Prašome patvirtinti naują slaptažodį!',
                                    },
                                    ({ getFieldValue }) => ({
                                        validator(rule, value) {
                                            if (!value || getFieldValue('password') === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject('Slaptažodžiai nesutampa!');
                                        },
                                    }),
                                ]}
                            >
                                <Input
                                    prefix={<LockOutlined className="site-form-item-icon" />}
                                    type="password"
                                    placeholder="Pakartokite naują slaptažodį"
                                />
                            </Form.Item>

                            <Form.Item>
                                <Button type="primary" htmlType="submit" className="login-form-button">
                                    Atstatyti
                                </Button>
                            </Form.Item>
                        </Form>
                    )}
                </Col>
            </Row>
        </MainLayout>
    );
}
