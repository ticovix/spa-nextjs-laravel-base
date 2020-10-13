import React, { useState, useRef, useLayoutEffect } from 'react';
import Navigation from './Navigation';
import 'assets/styles/theme.less';
import logoLg from 'assets/images/logo.png';
import logoSm from 'assets/images/logo-sm.png';
import useAuth from 'contexts/auth';
import Link from 'next/link';
import { Layout as AntdLayout, Avatar, Dropdown, Menu } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  LogoutOutlined,
  DownOutlined,
  UpOutlined,
  KeyOutlined,
} from '@ant-design/icons';
import { Container } from './styles';
import { v4 as uuid } from 'uuid';

const { Header, Sider, Content, Footer } = AntdLayout;

const Layout = ({ children }) => {
  const layout = useRef(null);
  const [collapsed, setCollapsed] = useState(false);
  const [userNavVisible, setUserNavVisible] = useState(false);
  const BtnNavCollapsed = collapsed ? MenuUnfoldOutlined : MenuFoldOutlined;
  const CaretIcon = userNavVisible ? DownOutlined : UpOutlined;
  const [logo, setLogo] = useState(logoLg);

  const { logout, user } = useAuth();

  useLayoutEffect(() => {
    if (collapsed) {
      layout.current.classList.add('collapsed');
      if (layout.current.clientWidth > 768) {
        setLogo(logoSm);
      }
    } else {
      layout.current.classList.remove('collapsed');
      setLogo(logoLg);
    }
  }, [collapsed, layout]);

  const userMenu = (
    <Menu id="nav-user">
      <Menu.Item key={uuid()} icon={<UserOutlined />}>
        <Link href="/user">My Account</Link>
      </Menu.Item>
      <Menu.Item key={uuid()} icon={<KeyOutlined />}>
        <Link href="/user/change-password">Change Password</Link>
      </Menu.Item>
      <Menu.Item
        key={uuid()}
        icon={<LogoutOutlined />}
        onClick={() => logout()}
      >
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <div id="theme" className="ant-layout ant-layout-has-sider" ref={layout}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">
          <Link href="/">
            <img src={logo} alt="Logo" />
          </Link>
        </div>
        <Navigation></Navigation>
      </Sider>
      <AntdLayout className="site-layout">
        <Header className="main-header white-header">
          <BtnNavCollapsed
            className="trigger"
            onClick={() => {
              setCollapsed(!collapsed);
            }}
          />
          <div id="nav-header">
            <Dropdown
              overlay={userMenu}
              trigger={['click']}
              onVisibleChange={(visible) => setUserNavVisible(visible)}
            >
              <a
                id="user"
                className="ant-dropdown-link"
                onClick={(e) => e.preventDefault()}
              >
                <Avatar
                  icon={<UserOutlined />}
                  src={user.photo}
                  className="avatar"
                />
                {user.name}
                <CaretIcon className="caret-icon" />
              </a>
            </Dropdown>
          </div>
        </Header>
        <Content>{children}</Content>
        <Footer style={{ textAlign: 'center' }}>Project ©2020</Footer>
      </AntdLayout>
    </div>
  );
};

export { Layout, Container };

export default Layout;
