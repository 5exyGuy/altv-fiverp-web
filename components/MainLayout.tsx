import React, { ReactElement, useState } from 'react';
import { Button, Layout, Input, Menu, Modal, Form, Checkbox, Tabs, message } from 'antd';
import { createFromIconfontCN, LoginOutlined, UserAddOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import { useUser } from '../services/request/auth/Hooks';

const Icon = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_2209993_s3w4xl9yid.js',
});

const { Header, Sider, Content } = Layout;

React.Component.prototype.props;

export default function MainLayout(
    props: Readonly<any> &
        Readonly<{
            children?: React.ReactNode;
        }>
): ReactElement {
    const [user, { mutate }] = useUser();
    const [authVisible, setAuthVisible] = useState(false);
    const router = useRouter();

    const submitLogin = async (e: any) => {
        const result: Response = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({}),
        });

        if (result.status === 200) {
            const user: any = await result.json();
            mutate(user);
            message.success('This is an success message');
        } else message.error('This is an error message');
    };

    return (
        <div className="content">
            <Layout style={{ height: '100vh', backgroundColor: 'transparent' }}>
                <Sider>
                    <div className="logo">FiveRP.LT</div>
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                        <Menu.Item key="1" icon={<Icon type="iconnews1" />} onClick={() => router.push('/')}>
                            Naujienos
                        </Menu.Item>
                        <Menu.Item key="3" icon={<Icon type="iconstats" />} onClick={() => router.push('/stats')}>
                            Statistika
                        </Menu.Item>
                        <Menu.Item key="4" icon={<LoginOutlined />} onClick={() => setAuthVisible(true)}>
                            Prisijungti
                        </Menu.Item>
                        <Menu.Item key="5" icon={<UserAddOutlined />} onClick={() => setAuthVisible(true)}>
                            Registruotis
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{ backgroundColor: '#141414', padding: 0 }}>
                        <Menu mode="horizontal">
                            <Menu.Item key="mail">Navigation One</Menu.Item>
                            <Menu.Item key="app">Navigation Two</Menu.Item>
                        </Menu>
                    </Header>
                    <Content style={{ paddingTop: 3 }}>{props.children}</Content>
                </Layout>
            </Layout>
            <Modal
                title="Autenfikacija"
                visible={authVisible}
                onCancel={() => setAuthVisible(false)}
                onOk={() => setAuthVisible(false)}
                footer={[
                    <Button key="back" onClick={() => setAuthVisible(false)}>
                        Uždaryti
                    </Button>,
                ]}
                style={{ top: '20%' }}
            >
                <Tabs defaultActiveKey="1" centered>
                    <Tabs.TabPane tab="Prisijungti" key="1">
                        <Form initialValues={{ remember: false }} onFinish={submitLogin}>
                            <Form.Item
                                name="username"
                                rules={[
                                    {
                                        required: true,
                                        message: '',
                                    },
                                ]}
                                hasFeedback
                            >
                                <Input placeholder="Vartotojo vardas" />
                            </Form.Item>
                            <Form.Item
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: '',
                                    },
                                ]}
                                hasFeedback
                            >
                                <Input type="password" placeholder="Slaptažodis" />
                            </Form.Item>
                            <Form.Item>
                                <Form.Item name="remember">
                                    <Checkbox checked={false}>Prisiminti mane</Checkbox>
                                </Form.Item>

                                {/* <a href="">Pamiršau slaptažodį</a> */}
                            </Form.Item>

                            <Form.Item>
                                <Button type="primary" htmlType="submit">
                                    Prisijungti
                                </Button>
                            </Form.Item>
                        </Form>
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Registruotis" key="2">
                        <Form>
                            <Form.Item
                                name="username"
                                rules={[
                                    {
                                        required: true,
                                        message: '',
                                    },
                                ]}
                                hasFeedback
                            >
                                <Input placeholder="Vartotojo vardas" />
                            </Form.Item>
                            <Form.Item
                                name="email"
                                rules={[
                                    {
                                        required: true,
                                        message: '',
                                    },
                                ]}
                                hasFeedback
                            >
                                <Input type="email" placeholder="El. paštas" />
                            </Form.Item>
                            <Form.Item
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: '',
                                    },
                                ]}
                                hasFeedback
                            >
                                <Input type="password" placeholder="Slaptažodis" />
                            </Form.Item>
                            <Form.Item
                                name="repeatpassword"
                                rules={[
                                    {
                                        required: true,
                                        message: '',
                                    },
                                ]}
                                hasFeedback
                            >
                                <Input type="password" placeholder="Pakartokite slaptažodį" />
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit">
                                    Registruotis
                                </Button>
                            </Form.Item>
                        </Form>
                    </Tabs.TabPane>
                    <Tabs.TabPane tab={<div style={{ color: '#e84749' }}>Pamiršau</div>} key="3">
                        <Form>
                            <Form.Item
                                name="email"
                                rules={[
                                    {
                                        required: true,
                                        message: '',
                                    },
                                ]}
                                hasFeedback
                            >
                                <Input type="email" placeholder="El. paštas" />
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit">
                                    Siųsti
                                </Button>
                            </Form.Item>
                        </Form>
                    </Tabs.TabPane>
                </Tabs>
            </Modal>
        </div>
    );
}
