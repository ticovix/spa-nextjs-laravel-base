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
      breadcrumbName: 'Usuários',
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
        handleErrors(e.response.data);
      });
    },
    [users, mutate]
  );

  return (
    <Layout>
      <PageHeader
        title="Usuários"
        breadcrumb={{ routes }}
        extra={[
          <Button key="0" onClick={() => setUser({})} type="primary">
            <PlusOutlined /> Usuário
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
                <Tooltip title="Editar" key={0}>
                  <Button
                    type="primary"
                    icon={<EditOutlined />}
                    onClick={() => setUser(user)}
                  />
                </Tooltip>,
                <Popconfirm
                  placement="leftTop"
                  title="Deseja realmente remover?"
                  onConfirm={() => removeUser(user)}
                  okText="Sim"
                  cancelText="Não"
                  key={1}
                >
                  <Tooltip title="Remover">
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
