import { Button, Card, Col, Input, Row, Form, PageHeader } from 'antd';
import React, { ReactElement } from 'react';
import Link from 'next/link';
import './style.module.less';

export default function Register(): ReactElement {
    return (
        <Row justify="center" align="middle" style={{ height: '100%' }}>
            <Col>
                <Card>
                    <PageHeader title="Registracija" />
                    <Form name="normal_login" className="login-form">
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
                </Card>
            </Col>
        </Row>
    );
}
