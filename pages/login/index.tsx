import { Button, Card, Checkbox, Col, Input, Row, Form, PageHeader } from 'antd';
import React, { ReactElement } from 'react';
import Link from 'next/link';
import './style.module.less';

export default function Login(): ReactElement {
    return (
        <Row justify="center" align="middle" style={{ height: '100%' }}>
            <Col>
                <Card>
                    <PageHeader title="Prisijungimas" />
                    <Form name="normal_login" className="login-form" initialValues={{ remember: false }}>
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
                            <Form.Item name="remember" noStyle>
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
                </Card>
            </Col>
        </Row>
    );
}
