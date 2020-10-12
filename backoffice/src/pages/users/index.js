import React, { useState, useCallback } from 'react';
import { Layout, Container } from 'components/Layout';
import PageHeader from 'components/PageHeader';
import { List, Avatar, Tooltip, Button, Popconfirm } from 'antd';
import { ProtectRoute } from 'contexts/auth';
import { getUsers, remove } from 'services/user';
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  UserOutlined,
} from '@ant-design/icons';
import FormData from './FormData';
import { handleErrors } from 'utils';

const Users = () => {
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState({});
  const { data: users, mutate } = getUsers();
  const routes = [
    {
      path: 'users',
      breadcrumbName: 'Users',
    },
  ];

  const setUser = (user) => {
    setData(user);
    setVisible(true);
  };

  const removeUser = useCallback(
    (user) => {
      mutate(
        users.filter((item) => item.id !== user.id),
        false
      );

      remove(user.id).catch((e) => {
        mutate(users);
        handleErrors(e);
      });
    },
    [users, mutate]
  );

  return (
    <Layout>
      <PageHeader
        title="Users"
        breadcrumb={{ routes }}
        extra={[
          <Button key="0" onClick={() => setUser({})} type="primary">
            <PlusOutlined /> User
          </Button>,
        ]}
      />
      <Container>
        <List
          itemLayout="horizontal"
          dataSource={users ? users : []}
          loading={!users}
          renderItem={(user) => (
            <List.Item
              actions={[
                <Tooltip title="Edit" key={0}>
                  <Button
                    type="primary"
                    icon={<EditOutlined />}
                    onClick={() => setUser(user)}
                  />
                </Tooltip>,
                <Popconfirm
                  placement="leftTop"
                  title="Do you really want to remove it?"
                  onConfirm={() => removeUser(user)}
                  okText="Yes"
                  cancelText="No"
                  key={1}
                >
                  <Tooltip title="Remove">
                    <Button type="danger" icon={<DeleteOutlined />} />
                  </Tooltip>
                </Popconfirm>,
              ]}
            >
              <List.Item.Meta
                avatar={<Avatar icon={<UserOutlined />} src={user.photo} />}
                title={user.name}
                description={user.email}
              />
            </List.Item>
          )}
        />
      </Container>
      <FormData
        visible={visible}
        setVisible={setVisible}
        data={data}
        setData={setData}
        users={users}
        mutate={mutate}
      />
    </Layout>
  );
};

export default ProtectRoute(Users);
