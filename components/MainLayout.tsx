import React, { ReactElement } from 'react';
import { Avatar, Layout, Menu, PageHeader, Spin } from 'antd';
import { FaHome, FaUserLock, FaUserPlus } from 'react-icons/fa';
import { IoIosStats } from 'react-icons/io';
import { AiFillSetting, AiOutlineLogout } from 'react-icons/ai';
import Router from 'next/router';
import Icon from './Icon';
import { Session, signOut, useSession } from 'next-auth/client';

export default function MainLayout(
    props: Readonly<{ children?: React.ReactNode; headerTitle?: string; session?: Session; loading?: boolean; protected?: boolean }>
): ReactElement {
    const [_session, _loading] = useSession();
    const session: Session = props.session ? props.session : _session;
    const loading: boolean = props.loading ? props.loading : _loading;

    return (
        <div className="background">
            <Layout style={{ backgroundColor: 'transparent' }}>
                <Layout.Header>
                    <Menu mode="horizontal">
                        <Menu.Item key="1" icon={<Icon component={<FaHome size="1.5em" />} />} onClick={() => Router.push('/')}>
                            Pagrindinis
                        </Menu.Item>
                        <Menu.Item key="2" icon={<Icon component={<IoIosStats size="1.5em" />} />} onClick={() => Router.push('/stats')}>
                            Statistika
                        </Menu.Item>

                        {session ? (
                            <Menu.SubMenu
                                icon={<Avatar style={{ marginRight: '10px' }} shape="circle" src={session.user.image} />}
                                style={{ float: 'right' }}
                                title={session.user.name ? session.user.name : session.user.email}
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
                                    onClick={() => signOut()}
                                >
                                    Atsijungti
                                </Menu.Item>
                            </Menu.SubMenu>
                        ) : (
                            <>
                                <Menu.Item
                                    key="3"
                                    icon={<Icon component={<FaUserPlus size="1.5em" />} />}
                                    style={{ float: 'right' }}
                                    onClick={() => Router.push('/auth/register')}
                                >
                                    Registruotis
                                </Menu.Item>
                                <Menu.Item
                                    key="4"
                                    icon={<Icon component={<FaUserLock size="1.5em" />} />}
                                    style={{ float: 'right' }}
                                    onClick={() => Router.push('/auth/login')}
                                >
                                    Prisijungti
                                </Menu.Item>
                            </>
                        )}
                    </Menu>
                </Layout.Header>
                <Layout.Content className="layout-content">
                    {props.protected ? (
                        !session || loading ? (
                            <div className="page-content" style={{ padding: '5%', textAlign: 'center' }}>
                                <Spin size="large" />
                            </div>
                        ) : (
                            <>
                                {props.headerTitle && (
                                    <div className="page-header animate__animated animate__fadeIn">
                                        <PageHeader title={props.headerTitle} />
                                    </div>
                                )}

                                <div className="page-content animate__animated animate__fadeIn">{props.children}</div>
                            </>
                        )
                    ) : (
                        <>
                            {props.headerTitle && (
                                <div className="page-header animate__animated animate__fadeIn">
                                    <PageHeader title={props.headerTitle} />
                                </div>
                            )}

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
