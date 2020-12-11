import { Button, Col, Input, Row, Form, PageHeader, message } from 'antd';
import Link from 'next/link';
import './style.module.less';

export default function Register(): JSX.Element {
    const submitRegistration = async (data: any) => {
        const result: Response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
            body: JSON.stringify(data),
        });

        if (result.status === 200) {
            message.success('This is an success message');
        } else message.error('This is an error message');
    };

    return (
        <>
            <div className="page-header animate__animated animate__fadeIn">
                <PageHeader title="Registracija" subTitle="This is a subtitle" />
            </div>
            <div className="page-content" style={{ padding: '5%' }}>
                <Row justify="center" align="middle" style={{ height: '100%' }}>
                    <Col span={8}>
                        <Form onFinish={submitRegistration} name="normal_login" className="login-form">
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
                                <Button type="primary" htmlType="submit" className="login-form-button">
                                    Registruotis
                                </Button>
                                arba <Link href="/login">prisijungti!</Link>
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>
            </div>
        </>
    );
}
