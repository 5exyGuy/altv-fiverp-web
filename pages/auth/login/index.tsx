import { Button, Col, Form, Input, Row, Tabs } from 'antd';
import MainLayout from '../../../components/MainLayout';
import { signIn, useSession } from 'next-auth/client';
import Router from 'next/router';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './login.style.less';
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
        await signIn('credentials', { username: data.username, password: data.password });
    };

    const onFinishWithEmail = async (data: LoginData) => {
        await signIn('email', { email: data.email });
    };

    return (
        <MainLayout headerTitle="Prisijungimas" session={session} loading={loading} protected={Boolean(!loading && session)}>
            <Row justify="center" align="middle">
                <Col span={10} style={{ margin: '10% 0' }}>
                    <Tabs defaultActiveKey="1" centered>
                        <Tabs.TabPane tab="Prisijungti su slaptažodžiu" key="1">
                            <Form onFinish={onFinishWithCredentials}>
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
                                    <a className="login-form-forgot" href="">
                                        Pamiršau slaptažodį
                                    </a>
                                </Form.Item>

                                <Form.Item>
                                    <Button type="primary" htmlType="submit" className="login-form-button">
                                        Prisijungti
                                    </Button>
                                    arba <Link href="/auth/register">registruokis dabar!</Link>
                                </Form.Item>
                            </Form>
                        </Tabs.TabPane>
                        <Tabs.TabPane tab="Prisijungti su el. paštu" key="2">
                            <Form onFinish={onFinishWithEmail}>
                                <Form.Item name="email" rules={[{ required: true, message: 'Prašome įvesti elektroninio pašto adresą!' }]}>
                                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="El. paštas" />
                                </Form.Item>
                                <Form.Item>
                                    Prisijungimas elektroniniu paštu nereikalauja papildomos registracijos, užtenka patvirtinti Jūsų
                                    elektroninio pašto dėžutėje gautą laišką su patvirtinimu ir Jūs automatiškai prijungiami prie sistemos.
                                </Form.Item>

                                <Form.Item>
                                    <Button type="primary" htmlType="submit" className="login-form-button">
                                        Prisijungti
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Tabs.TabPane>
                    </Tabs>
                </Col>
            </Row>
        </MainLayout>
    );
}
