import { Button, Col, Form, Input, Row, Tabs } from 'antd';
import MainLayout from '../../../components/MainLayout';
import { useSession } from 'next-auth/client';
import Router from 'next/router';
import { MailOutlined } from '@ant-design/icons';
import './login.style.less';
import { StatusCodes } from 'http-status-codes';

type ForgotData = { email: string };

export default function Forgot(): JSX.Element {
    const [session, loading] = useSession();

    if (!loading && session) Router.push('/');

    const onFinish = async (data: ForgotData) => {
        const result: Response = await fetch('/api/authentication/forgot', { method: 'POST', body: JSON.stringify(data) });
        if (result.status !== StatusCodes.OK) return; // TODO: Show an error message
        // TODO: Show a success message
    };

    return (
        <MainLayout headerTitle="Slaptažodžio atstatymas" session={session} loading={loading} protected={Boolean(!loading && session)}>
            <Row justify="center" align="middle">
                <Col span={10} style={{ margin: '10% 0' }}>
                    <Form onFinish={onFinish}>
                        <Form.Item name="email" rules={[{ required: true, message: 'Prašome įvesti elektroninio pašto adresą!' }]}>
                            <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="El. paštas" />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                Siųsti
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </MainLayout>
    );
}
