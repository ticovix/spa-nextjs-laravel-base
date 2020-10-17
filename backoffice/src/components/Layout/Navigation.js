import React from 'react';
import Link from 'next/link';
import { Menu } from 'antd';
import { UserOutlined, DashboardOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import { v4 as uuidv4 } from 'uuid';

const Navigation = () => {
  const menus = [
    {
      description: 'Dashboard',
      icon: <DashboardOutlined />,
      href: '/',
      key: uuidv4(),
    },
    {
      description: 'Users',
      icon: <UserOutlined />,
      href: '/users',
      key: uuidv4(),
    },
  ];

  const currentMenu = menus.find((menu) => menu.href === useRouter().pathname);
  const activeMenu = currentMenu ? [currentMenu.key] : null;

  return (
    <Menu theme="dark" mode="inline" selectedKeys={activeMenu}>
      {menus.map((menu) => (
        <Menu.Item icon={menu.icon} key={menu.key}>
          <Link href={menu.href}>{menu.description}</Link>
        </Menu.Item>
      ))}
    </Menu>
  );
};

export default Navigation;
