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
    },
    {
      description: 'Users',
      icon: <UserOutlined />,
      href: '/users',
    },
  ];

  const indexMenu = menus.findIndex(
    (menu) => menu.href === useRouter().pathname
  );
  const activeMenu = indexMenu >= 0 ? [indexMenu.toString()] : null;

  return (
    <Menu theme="dark" mode="inline" selectedKeys={activeMenu}>
      {menus.map((menu) => (
        <Menu.Item icon={menu.icon} key={uuidv4()}>
          <Link href={menu.href}>{menu.description}</Link>
        </Menu.Item>
      ))}
    </Menu>
  );
};

export default Navigation;
