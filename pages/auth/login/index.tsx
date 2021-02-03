import { Alert, Button, Col, Form, Input, Row } from 'antd';
import MainLayout from '../../../components/MainLayout';
import { signIn, useSession } from 'next-auth/client';
import { NextRouter, useRouter } from 'next/router';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { CommonTranslations } from '../../../translations/Common';
import { MessageType } from '../../../lib/server/request/JsonMessage';
import { AuthenticationTranslations } from '../../../translations/Authentication';

type LoginData = {
    email?: string;
    username?: string;
    password?: string;
};

export default function Login(): JSX.Element {
    const router: NextRouter = useRouter();
    const [session, loading] = useSession();
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');
    const { error } = router.query;

    useEffect(() => {
        const check = async () => {
            if (!loading && session) await router.push('/');
            if (Array.isArray(error)) return await router.push('/');

            switch (error) {
                case 'SERVER_ERROR':
                    setMessage(CommonTranslations.SERVER_ERROR);
                    setMessageType(MessageType.ERROR);
                    break;
                case 'COULD_NOT_FIND_SUCH_USER':
                    setMessage(AuthenticationTranslations.COULD_NOT_FIND_SUCH_USER);
                    setMessageType(MessageType.WARNING);
                    break;
                case 'USER_IS_NOT_VERIFIED':
                    setMessage(AuthenticationTranslations.USER_IS_NOT_VERIFIED);
                    setMessageType(MessageType.WARNING);
                    break;
                case 'PASSWORD_IS_NOT_CORRECT':
                    setMessage(AuthenticationTranslations.PASSWORD_IS_NOT_CORRECT);
                    setMessageType(MessageType.WARNING);
                    break;
            }
        };
        check();
    }, [loading, session, error]);

    const onFinishWithCredentials = async (data: LoginData) => {
        signIn('credentials', { username: data.username, password: data.password })
            .then(() => {
                if ('alt' in window) {
                    const token = 'test123'; // TODO: Create a database table for generating login tokens
                    alt.emit('pushToken', token);
                }
            })
            .catch(() => {
                if ('alt' in window) alt.emit('pushToken', 'error');
            });
    };

    return (
        <MainLayout headerTitle="Prisijungimas" session={session} loading={loading} protected={Boolean(session)}>
            <Row justify="center" align="middle">
                <Col span={10} style={{ margin: '10% 0' }}>
                    <Form onFinish={onFinishWithCredentials}>
                        <Form.Item>
                            <Alert
                                className={
                                    message.length > 0
                                        ? 'animate__animated animate__fadeIn'
                                        : 'animate__animated animate__fadeOut'
                                }
                                message={message}
                                type={messageType as 'success' | 'info' | 'warning' | 'error'}
                            />
                        </Form.Item>
                        <Form.Item name="username" rules={[{ required: true, message: 'Prašome įvesti vartotojo vardą!' }]}>
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Vartotojo vardas" />
                        </Form.Item>
                        <Form.Item name="password" rules={[{ required: true, message: 'Prašome įvesti slaptažodį!' }]}>
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="Slaptažodis"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Link href="/auth/login/forgot_password">Pamiršau slaptažodį</Link>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                                Prisijungti
                            </Button>
                            arba <Link href="/auth/register">registruokis dabar!</Link>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </MainLayout>
    );
}
