import React, { ReactElement, useState } from 'react';
import { Layout, Menu } from 'antd';
import {
    createFromIconfontCN,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    LoginOutlined,
    UserAddOutlined,
} from '@ant-design/icons';
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
    const [collapsed, setCollapsed] = useState(false);
    const router = useRouter();

    const toggle = () => {
        setCollapsed(!collapsed);
    };

    return (
        <div className="content">
            <Layout style={{ height: '100vh', backgroundColor: 'transparent' }}>
                <Sider trigger={null} collapsible collapsed={collapsed}>
                    <div className="logo">FiveRP.LT</div>
                    <Menu
                        theme="dark"
                        mode="inline"
                        defaultSelectedKeys={['1']}
                    >
                        <Menu.Item
                            key="1"
                            icon={<Icon type="iconnews1" />}
                            onClick={() => router.push('/')}
                        >
                            Naujienos
                        </Menu.Item>
                        <Menu.Item
                            key="2"
                            icon={<Icon type="iconupdate" />}
                            onClick={() => router.push('/updates')}
                        >
                            Atnaujinimai
                        </Menu.Item>
                        <Menu.Item
                            key="3"
                            icon={<Icon type="iconstats" />}
                            onClick={() => router.push('/stats')}
                        >
                            Statistika
                        </Menu.Item>
                        <Menu.Item
                            key="4"
                            icon={<LoginOutlined />}
                            onClick={() => router.push('/login')}
                        >
                            Prisijungti
                        </Menu.Item>
                        <Menu.Item
                            key="5"
                            icon={<UserAddOutlined />}
                            onClick={() => router.push('/register')}
                        >
                            Registruotis
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout
                    className="site-layout"
                    style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)' }}
                >
                    <Header
                        className="site-layout-background"
                        style={{ padding: 0 }}
                    >
                        {React.createElement(
                            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                            {
                                className: 'trigger',
                                onClick: toggle,
                            }
                        )}
                    </Header>
                    <Content
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            minHeight: 280,
                        }}
                    >
                        {props.children}
                    </Content>
                </Layout>
            </Layout>
        </div>
    );
}
