import { Menu, message } from 'antd';
import { AppProps } from 'next/app';
import Head from 'next/head';
import Router from 'next/router';
import React from 'react';
import MainLayout from '../components/MainLayout';
import useUser from '../lib/client/hooks/User';
import { BiNews } from 'react-icons/bi';
import { FaHome, FaUserAlt, FaUserLock, FaUserPlus } from 'react-icons/fa';
import { IoIosStats } from 'react-icons/io';
import { AiFillSetting, AiOutlineLogout } from 'react-icons/ai';
import './style.module.less';
import Icon from '../components/Icon';

export default function App({ Component, pageProps }: AppProps): JSX.Element {
    const [user, loading, mutate] = useUser();

    const submitLogout = async () => {
        const result: Response = await fetch('/api/auth/logout', {
            method: 'POST',
        });

        if (result.status === 200) {
            const user: any = await result.json();
            await mutate(user);
            message.success('This is an success message');
        } else message.error('This is an error message');
    };

    return (
        <React.Fragment>
            <Head>
                <title>FiveRP.LT</title>
                <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" />
            </Head>
            <MainLayout
                menu={
                    <>
                        <Menu.Item key="1" icon={<Icon component={<FaHome size="1.5em" />} />} onClick={() => Router.push('/')}>
                            Pagrindinis
                        </Menu.Item>
                        <Menu.Item key="2" icon={<Icon component={<BiNews size="1.5em" />} />} onClick={() => Router.push('/news')}>
                            Naujienos
                        </Menu.Item>
                        <Menu.Item key="3" icon={<Icon component={<IoIosStats size="1.5em" />} />} onClick={() => Router.push('/stats')}>
                            Statistika
                        </Menu.Item>

                        {user ? (
                            <Menu.SubMenu
                                icon={<Icon component={<FaUserAlt size="1.5em" />} />}
                                style={{ float: 'right' }}
                                title={user.username}
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
                                    onClick={submitLogout}
                                >
                                    Atsijungti
                                </Menu.Item>
                            </Menu.SubMenu>
                        ) : (
                            <>
                                <Menu.Item
                                    key="5"
                                    icon={<Icon component={<FaUserPlus size="1.5em" />} />}
                                    style={{ float: 'right' }}
                                    onClick={() => Router.push('/register')}
                                >
                                    Registruotis
                                </Menu.Item>
                                <Menu.Item
                                    key="6"
                                    icon={<Icon component={<FaUserLock size="1.5em" />} />}
                                    style={{ float: 'right' }}
                                    onClick={() => Router.push('/login')}
                                >
                                    Prisijungti
                                </Menu.Item>
                            </>
                        )}
                    </>
                }
            >
                <Component {...pageProps} />
            </MainLayout>
        </React.Fragment>
    );
}
