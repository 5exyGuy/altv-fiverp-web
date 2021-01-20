import { Button, Card, Col, PageHeader, Result, Row } from 'antd';
import Link from 'next/link';
import React from 'react';
import MainLayout from '../components/MainLayout';

export default function Error404() {
    return (
        <MainLayout headerTitle="Klaida">
            <Row justify="center" align="middle">
                <Col>
                    <Result
                        status="404"
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
        </MainLayout>
    );
}
