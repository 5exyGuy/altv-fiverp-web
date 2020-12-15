import { Col, Row } from 'antd';
import MainLayout from '../../../components/MainLayout';
import { providers, signin } from 'next-auth/client';

export default function Login(): JSX.Element {
    return (
        <MainLayout headerTitle="Prisijungimas">
            <Row justify="center" align="middle">
                <Col span={8}>
                    {Object.values(providers).map((provider) => (
                        <p key={provider.name}>
                            <a href={provider.signinUrl} onClick={(e) => e.preventDefault()}>
                                <button onClick={() => signin(provider)}>Sign in with {provider.name}</button>
                            </a>
                        </p>
                    ))}
                </Col>
            </Row>
        </MainLayout>
    );
}
