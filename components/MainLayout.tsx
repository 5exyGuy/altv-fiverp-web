import React, { ReactElement } from 'react';
import { Avatar, Layout, Menu, PageHeader, Spin } from 'antd';
import { BiNews } from 'react-icons/bi';
import { FaHome, FaUserAlt, FaUserLock } from 'react-icons/fa';
import { IoIosStats } from 'react-icons/io';
import { AiFillSetting, AiOutlineLogout } from 'react-icons/ai';
import Router from 'next/router';
import Icon from './Icon';
import { useSession } from 'next-auth/client';

export default function MainLayout(props: Readonly<{ children?: React.ReactNode; headerTitle: string }>): ReactElement {
    const [session, loading] = useSession();

    return (
        <div className="background">
            <Layout style={{ backgroundColor: 'transparent' }}>
                <Layout.Header>
                    <Menu mode="horizontal">
                        <Menu.Item key="1" icon={<Icon component={<FaHome size="1.5em" />} />} onClick={() => Router.push('/')}>
                            Pagrindinis
                        </Menu.Item>
                        <Menu.Item key="2" icon={<Icon component={<BiNews size="1.5em" />} />} onClick={() => Router.push('/news')}>
                            Naujienos
                        </Menu.Item>
                        <Menu.Item key="3" icon={<Icon component={<IoIosStats size="1.5em" />} />} onClick={() => Router.push('/stats')}>
                            Statistika
                        </Menu.Item>

                        {session ? (
                            <Menu.SubMenu
                                icon={<Avatar style={{ marginRight: '10px' }} shape="circle" src={session.user.image} />}
                                style={{ float: 'right' }}
                                title={session.user.name}
                            >
                                <Menu.Item
                                    key="setting:1"
                                    icon={<Icon component={<AiFillSetting size="1.5em" />} />}
                                    onClick={() => Router.push('/profile')}
                                >
                                    Profilis
                                </Menu.Item>
                                <Menu.Item
                                    key="setting:2"
                                    icon={<Icon component={<AiOutlineLogout size="1.5em" />} />}
                                    // onClick={submitLogout}
                                >
                                    Atsijungti
                                </Menu.Item>
                            </Menu.SubMenu>
                        ) : (
                            <Menu.Item
                                key="6"
                                icon={<Icon component={<FaUserLock size="1.5em" />} />}
                                style={{ float: 'right' }}
                                onClick={() => Router.push('/auth/login')}
                            >
                                Prisijungti
                            </Menu.Item>
                        )}
                    </Menu>
                </Layout.Header>
                <Layout.Content className="layout-content">
                    {loading ? (
                        <div className="page-content" style={{ padding: '5%', textAlign: 'center' }}>
                            <Spin size="large" />
                        </div>
                    ) : (
                        <>
                            <div className="page-header animate__animated animate__fadeIn">
                                <PageHeader title={props.headerTitle} />
                            </div>
                            <div className="page-content animate__animated animate__fadeIn">{props.children}</div>
                        </>
                    )}
                </Layout.Content>
                <Layout.Footer style={{ textAlign: 'center' }}>
                    FiveRP.LT © 2020 Created by <a href="https://github.com/5exyGuy/">5exyGuy</a>
                </Layout.Footer>
            </Layout>
        </div>
    );
}
