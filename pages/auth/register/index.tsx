import { Button, Col, Form, Input, Row } from 'antd';
import MainLayout from '../../../components/MainLayout';
import { useSession } from 'next-auth/client';
import Router from 'next/router';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { StatusCodes } from 'http-status-codes';
import { useEffect } from 'react';

type RegistrationData = {
    username: string;
    email: string;
    password: string;
    repeatpassword: string;
};

export default function Register(): JSX.Element {
    const [session, loading] = useSession();

    useEffect(() => {
        const check = async () => {
            if (!loading && session) await Router.push('/');
        };
        check();
    });

    const onFinish = async (data: RegistrationData) => {
        const result: Response = await fetch('/api/authentication/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (result.status !== StatusCodes.OK) return; // TODO: Show an error message
        // TODO: Show a success message
    };

    return (
        <MainLayout headerTitle="Registracija" session={session} loading={loading} protected={Boolean(!loading && session)}>
            <Row justify="center" align="middle">
                <Col span={10} style={{ margin: '10% 0' }}>
                    <Form initialValues={{ remember: true }} onFinish={onFinish}>
                        <Form.Item name="username" rules={[{ required: true, message: 'Prašome įvesti vartotojo vardą!' }]}>
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Vartotojo vardas" />
                        </Form.Item>
                        <Form.Item name="email" rules={[{ required: true, message: 'Prašome įvesti elektroninio pašto adresą!' }]}>
                            <Input prefix={<MailOutlined className="site-form-item-icon" />} type="email" placeholder="El. paštas" />
                        </Form.Item>
                        <Form.Item name="password" rules={[{ required: true, message: 'Prašome įvesti slaptažodį!' }]}>
                            <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Slaptažodis" />
                        </Form.Item>
                        <Form.Item
                            name="repeatpassword"
                            rules={[
                                {
                                    required: true,
                                    message: 'Prašome patvirtinti slaptažodį!',
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
                                placeholder="Pakartokite slaptažodį"
                            />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                Registruotis
                            </Button>
                            arba <Link href="/auth/login">prisijunk dabar!</Link>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </MainLayout>
    );
}
