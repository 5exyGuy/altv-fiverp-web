import React, { ReactElement, useState } from 'react';
import { Layout, Menu } from 'antd';
import { createFromIconfontCN, MenuUnfoldOutlined, MenuFoldOutlined, LoginOutlined, UserAddOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';

const Icon = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_2209993_s3w4xl9yid.js',
});

const { Header, Sider, Content } = Layout;

React.Component.prototype.props;

export default function MainLayout(
    props: Readonly<any> &
        Readonly<{
            children?: React.ReactNode;
        }>
): ReactElement {
    const router = useRouter();

    return (
        <div className="content">
            <Layout style={{ height: '100vh', backgroundColor: 'transparent' }}>
                <Sider>
                    <div className="logo">FiveRP.LT</div>
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                        <Menu.Item key="1" icon={<Icon type="iconnews1" />} onClick={() => router.push('/')}>
                            Naujienos
                        </Menu.Item>
                        <Menu.Item key="3" icon={<Icon type="iconstats" />} onClick={() => router.push('/stats')}>
                            Statistika
                        </Menu.Item>
                        <Menu.Item key="4" icon={<LoginOutlined />} onClick={() => router.push('/login')}>
                            Prisijungti
                        </Menu.Item>
                        <Menu.Item key="5" icon={<UserAddOutlined />} onClick={() => router.push('/register')}>
                            Registruotis
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{ backgroundColor: '#141414', padding: 0 }}>
                        <Menu mode="horizontal">
                            <Menu.Item key="mail">Navigation One</Menu.Item>
                            <Menu.Item key="app">Navigation Two</Menu.Item>
                        </Menu>
                    </Header>
                    <Content style={{ paddingTop: 3 }}>{props.children}</Content>
                </Layout>
            </Layout>
        </div>
    );
}
