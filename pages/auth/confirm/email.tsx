import { Col, Row, Form, Input, Button } from 'antd';

export default function Email(): JSX.Element {
    return (
        <div className="page-content" style={{ padding: '5%' }}>
            <Row justify="center" align="middle">
                <Col span={8}>
                    <Form name="normal_login">
                        <Form.Item
                            name="confirmationToken"
                            rules={[
                                {
                                    required: true,
                                    message: '',
                                },
                            ]}
                            hasFeedback
                        >
                            <Input placeholder="Patvirtinimo kodas" />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                Patvirtinti
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </div>
    );
}
