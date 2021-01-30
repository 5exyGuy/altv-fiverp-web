import { Button, Col, Form, Input, Row, Tabs } from 'antd';
import MainLayout from '../../../components/MainLayout';
import { signIn, useSession } from 'next-auth/client';
import Router from 'next/router';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import Link from 'next/link';

type LoginData = {
    email?: string;
    username?: string;
    password?: string;
};

export default function Login(): JSX.Element {
    const [session, loading] = useSession();

    if (!loading && session) Router.push('/');

    const onFinishWithCredentials = async (data: LoginData) => {
        signIn('credentials', { username: data.username, password: data.password })
            .then(() => {
                if ('alt' in window) {
                    const token: string = 'test123'; // TODO: Create a database table for generating login tokens
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
                        <Form.Item name="username" rules={[{ required: true, message: 'Prašome įvesti vartotojo vardą!' }]}>
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Vartotojo vardas" />
                        </Form.Item>
                        <Form.Item name="password" rules={[{ required: true, message: 'Prašome įvesti slaptažodį!' }]}>
                            <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Slaptažodis" />
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
