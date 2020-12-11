import React, { ReactElement } from 'react';
import { Layout, Menu } from 'antd';

export default function MainLayout(
    props: Readonly<{
        menu: ReactElement;
        children?: React.ReactNode;
    }>
): ReactElement {
    return (
        <div className="background">
            <Layout style={{ backgroundColor: 'transparent' }}>
                <Layout.Header>
                    <Menu mode="horizontal">{props.menu}</Menu>
                </Layout.Header>
                <Layout.Content className="layout-content">{props.children}</Layout.Content>
                <Layout.Footer style={{ textAlign: 'center' }}>
                    FiveRP.LT © 2020 Created by <a href="https://github.com/5exyGuy/">5exyGuy</a>
                </Layout.Footer>
            </Layout>
        </div>
    );
}
