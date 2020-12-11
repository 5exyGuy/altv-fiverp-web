import { Button, Checkbox, Col, Input, Row, Form, PageHeader, message } from 'antd';
import Link from 'next/link';
import useUser from '../../../lib/client/hooks/User';
import './style.module.less';

export default function Login(): JSX.Element {
    const { mutate } = useUser({ redirectTo: '/', redirectIfFound: true });

    const submitLogin = async (data: any) => {
        const result: Response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
            body: JSON.stringify(data),
        });

        if (result.status === 200) {
            const user: any = await result.json();
            await mutate(user);
            message.success('This is an success message');
        } else message.error('This is an error message');
    };

    return (
        <>
            <div className="page-header animate__animated animate__fadeIn">
                <PageHeader title="Prisijungimas" subTitle="This is a subtitle" />
            </div>
            <div className="page-content" style={{ padding: '5%' }}>
                <Row justify="center" align="middle">
                    <Col span={8}>
                        <Form onFinish={submitLogin} name="normal_login" initialValues={{ rememberMe: false }}>
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
                                <Form.Item name="rememberMe" noStyle>
                                    <Checkbox>Prisiminti mane</Checkbox>
                                </Form.Item>

                                <a className="login-form-forgot" href="">
                                    Pamiršau slaptažodį
                                </a>
                            </Form.Item>

                            <Form.Item>
                                <Button type="primary" htmlType="submit" className="login-form-button">
                                    Prisijungti
                                </Button>
                                arba <Link href="/register">registruotis!</Link>
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>
            </div>
        </>
    );
}
