import { Button, Card, Col, Result, Row } from 'antd';
import Link from 'next/link';
import React from 'react';

export default function Error404() {
    return (
        <div className="page-content">
            <Row justify="center" align="middle">
                <Col>
                    <Result
                        title="404"
                        subTitle="Deja, jūsų aplankyto puslapio nėra."
                        extra={
                            <Link href="/">
                                <Button type="primary">Grįžti atgal</Button>
                            </Link>
                        }
                    />
                </Col>
            </Row>
        </div>
    );
}
