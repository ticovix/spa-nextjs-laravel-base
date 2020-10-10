import React, { useState } from 'react';
import { Layout, Container } from 'components/Layout';
import PageHeader from 'components/PageHeader';
import { Form, Button, Input } from 'antd';
import useAuth from 'contexts/auth';
import InputMask from 'react-input-mask';
import { changePassword } from 'services/account';
import { successMessage, handleErrors } from 'utils';

const changePasswod = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const routes = [
    {
      breadcrumbName: 'Alterar Senha',
      path: '/user/change-password',
    },
  ];

  const handleSubmit = (values) => {
    setLoading(true);
    changePassword(values)
      .then(() => {
        form.resetFields();
        successMessage('Senha alterada com sucesso!');
      })
      .catch((e) => {
        handleErrors(e);
      })
      .finally(() => setLoading(false));
  };

  return (
    <Layout>
      <PageHeader title="Alterar Senha" breadcrumb={{ routes }} />
      <Container>
        <Form
          form={form}
          labelCol={{ xs: { span: 24 }, sm: { span: 8 } }}
          wrapperCol={{ xs: { span: 24 }, sm: { span: 8 } }}
          onFinish={handleSubmit}
          id="form"
        >
          <Form.Item
            name="old_password"
            label="Senha Atual"
            rules={[{ required: true, message: 'Digite a senha atual' }]}
          >
            <Input type="password" />
          </Form.Item>
          <Form.Item
            name="password"
            label="Senha"
            rules={[
              { min: 6 },
              { required: true, message: 'Digite a nova senha' },
            ]}
          >
            <Input type="password" />
          </Form.Item>
          <Form.Item
            name="password_confirmation"
            label="Repita a Senha"
            rules={[
              {
                required: true,
                message: 'Repita a nova senha',
              },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }

                  return Promise.reject('A senha repetida está diferente');
                },
              }),
            ]}
          >
            <Input type="password" />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              xs: { span: 24, offset: 0 },
              sm: { span: 16, offset: 8 },
            }}
          >
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              disabled={loading}
            >
              Salvar
            </Button>
          </Form.Item>
        </Form>
      </Container>
    </Layout>
  );
};

export default changePasswod;
