import { Card, PageHeader, Tag, Button, Row, Typography, Divider, Col, Space } from 'antd';
import { url } from 'inspector';
import React, { ReactElement } from 'react';

const { Paragraph } = Typography;

const Content = ({ children }) => {
    return (
        <Row>
            <div style={{ flex: 1 }}>{children}</div>
        </Row>
    );
};

const content = (
    <>
        <Paragraph>
            orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy
            text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has
            survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
        </Paragraph>
        <Paragraph>
            It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The
            point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here,
            content here', making it look like readable English.
        </Paragraph>
        <div>
            <Button>Skaityti daugiau</Button>
        </div>
    </>
);

export default function Index(): ReactElement {
    return (
        <div style={{ padding: '3%' }}>
            {[1, 2, 3, 4, 5].map(() => {
                return (
                    <Row justify="space-around" align="middle" style={{ paddingBottom: '3%' }}>
                        <Col span={11}>
                            <Card className="news">
                                <PageHeader
                                    title="Title"
                                    className="site-page-header"
                                    subTitle="This is a subtitle"
                                    tags={<Tag color="blue">Running</Tag>}
                                    avatar={{ src: 'https://avatars1.githubusercontent.com/u/8186664?s=460&v=4' }}
                                >
                                    <Content>{content}</Content>
                                </PageHeader>
                            </Card>
                        </Col>
                        <Col span={11}>
                            <Card className="news">
                                <PageHeader
                                    title="Title"
                                    className="site-page-header"
                                    subTitle="This is a subtitle"
                                    tags={<Tag color="blue">Running</Tag>}
                                    avatar={{ src: 'https://avatars1.githubusercontent.com/u/8186664?s=460&v=4' }}
                                >
                                    <Content>{content}</Content>
                                </PageHeader>
                            </Card>
                        </Col>
                    </Row>
                );
            })}
        </div>
    );
}
