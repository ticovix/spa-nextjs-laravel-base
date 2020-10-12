import React, { useState } from 'react';
import { Layout, Container } from 'components/Layout';
import PageHeader from 'components/PageHeader';
import { Form, Button, Input } from 'antd';
import { changePassword } from 'services/account';
import { successMessage, handleErrors } from 'utils';

const changePasswod = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const routes = [
    {
      breadcrumbName: 'Change Password',
      path: '/user/change-password',
    },
  ];

  const handleSubmit = (values) => {
    setLoading(true);
    changePassword(values)
      .then(() => {
        form.resetFields();
        successMessage('Updated password sucessful!');
      })
      .catch((e) => {
        handleErrors(e);
      })
      .finally(() => setLoading(false));
  };

  return (
    <Layout>
      <PageHeader title="Change Password" breadcrumb={{ routes }} />
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
            label="Current Password"
            rules={[{ required: true }]}
          >
            <Input type="password" />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[{ min: 6 }, { required: true }]}
          >
            <Input type="password" />
          </Form.Item>
          <Form.Item
            name="password_confirmation"
            label="Repeat Password"
            rules={[
              {
                required: true,
              },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }

                  return Promise.reject('The repeated password is different');
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
              Save
            </Button>
          </Form.Item>
        </Form>
      </Container>
    </Layout>
  );
};

export default changePasswod;
