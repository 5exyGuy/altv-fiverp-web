import { Alert, Button, Col, Form, Input, Modal, Result, Row } from 'antd';
import MainLayout from '../../../components/MainLayout';
import { useSession } from 'next-auth/client';
import Router, { NextRouter, useRouter } from 'next/router';
import { MailOutlined } from '@ant-design/icons';
import { StatusCodes } from 'http-status-codes';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { MessageType } from '../../../lib/server/request/JsonMessage';

type ForgotData = { email: string };

export default function Forgot(): JSX.Element {
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

    const showMessage = (content: string, type: MessageType) => {
        setMessage(content);
        setMessageType(type);
    };

    const onFinish = async (data: ForgotData) => {
        const result: Response = await fetch('/api/cauth/forgot_password', { method: 'POST', body: JSON.stringify(data) });
        const responseData = await result.json();
        showMessage(responseData.message, responseData.type);

        if (result.status === StatusCodes.OK) setVisible(true);
    };

    return (
        <MainLayout headerTitle="Slaptažodžio atstatymas" session={session} loading={loading} protected={Boolean(session)}>
            <Row justify="center" align="middle">
                <Col span={10} style={{ margin: '10% 0' }}>
                    {visible ? (
                        <Result
                            status="success"
                            subTitle="Slaptažodžio atstatymo patvirtinimas sėkmingai išsiųstas į nurodytą elektroninį paštą."
                            extra={[
                                <Link href="/">
                                    <Button key="home">Grįžti į pagrindinį</Button>
                                </Link>,
                            ]}
                        />
                    ) : (
                        <Form onFinish={onFinish}>
                            <Alert
                                className={message.length > 0 ? 'animate__animated animate__fadeIn' : 'animate__animated animate__fadeOut'}
                                message={message}
                                type={messageType as 'success' | 'info' | 'warning' | 'error'}
                            />
                            <Form.Item name="email" rules={[{ required: true, message: 'Prašome įvesti elektroninio pašto adresą!' }]}>
                                <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="El. paštas" />
                            </Form.Item>

                            <Form.Item>
                                <Button type="primary" htmlType="submit" className="login-form-button">
                                    Siųsti
                                </Button>
                            </Form.Item>
                        </Form>
                    )}
                </Col>
            </Row>
        </MainLayout>
    );
}
