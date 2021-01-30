import { Button, Col, Form, Input, Row, Modal, Alert, Result } from 'antd';
import MainLayout from '../../../components/MainLayout';
import { useSession } from 'next-auth/client';
import Router, { NextRouter, useRouter } from 'next/router';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { StatusCodes } from 'http-status-codes';
import { useEffect, useState } from 'react';

type RegistrationData = {
    username: string;
    email: string;
    password: string;
    repeatpassword: string;
};

export default function Register(): JSX.Element {
    const [session, loading] = useSession();
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');

    useEffect(() => {
        const check = async () => {
            if (!loading && session) await Router.push('/');
        };
        check();
    });

    const showMessage = (content: string, type: 'success' | 'info' | 'warning' | 'error') => {
        setMessage(content);
        setMessageType(type);
    };

    const onFinish = async (data: RegistrationData) => {
        const result: Response = await fetch('/api/cauth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const responseData = await result.json();

        showMessage(responseData.message, responseData.type);
        if (result.status === StatusCodes.OK) setVisible(true);
    };

    return (
        <MainLayout headerTitle="Registracija" session={session} loading={loading} protected={Boolean(session)}>
            <Row justify="center" align="middle">
                <Col span={10} style={{ margin: '10% 0' }}>
                    {visible ? (
                        <Result
                            status="success"
                            subTitle="Registracijos patvirtinimas sėkmingai išsiųstas į nurodytą elektroninį paštą."
                            extra={[
                                <Link href="/">
                                    <Button key="home">Grįžti į pagrindinį</Button>
                                </Link>,
                            ]}
                        />
                    ) : (
                        <Form onFinish={onFinish}>
                            <Form.Item>
                                <Alert
                                    className={
                                        message.length > 0 ? 'animate__animated animate__fadeIn' : 'animate__animated animate__fadeOut'
                                    }
                                    message={message}
                                    type={messageType as 'success' | 'info' | 'warning' | 'error'}
                                />
                            </Form.Item>
                            <Form.Item name="username" rules={[{ required: true, message: 'Prašome įvesti vartotojo vardą!' }]}>
                                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Vartotojo vardas" />
                            </Form.Item>
                            <Form.Item name="email" rules={[{ required: true, message: 'Prašome įvesti elektroninio pašto adresą!' }]}>
                                <Input prefix={<MailOutlined className="site-form-item-icon" />} type="email" placeholder="El. paštas" />
                            </Form.Item>
                            <Form.Item name="password" rules={[{ required: true, message: 'Prašome įvesti slaptažodį!' }]}>
                                <Input
                                    prefix={<LockOutlined className="site-form-item-icon" />}
                                    type="password"
                                    placeholder="Slaptažodis"
                                />
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
                                <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                                    Registruotis
                                </Button>
                                arba <Link href="/auth/login">prisijunk dabar!</Link>
                            </Form.Item>
                        </Form>
                    )}
                </Col>
            </Row>
        </MainLayout>
    );
}
