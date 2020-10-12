import React, { useState } from 'react';
import { useRouter } from 'next/router';
import {
  Container,
  Box,
  BoxHeader,
  BoxBody,
  BoxTitle,
} from 'assets/styles/styled';
import { Form, Input, Button, Image } from 'antd';
import 'assets/styles/theme.less';
import { LockOutlined } from '@ant-design/icons';
import logo from 'assets/images/logo.png';
import { resetPassword } from 'services/forgotPassword';
import { successMessage, handleErrors } from 'utils';

const resetUserPassword = () => {
  const router = useRouter();
  const { email, token } = router.query;
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const handleSubmit = (values) => {
    setLoading(true);
    resetPassword({ ...values, email, token })
      .then((response) => {
        form.resetFields();
        successMessage('Updated password successful!');
        router.push('/login');
      })
      .catch((e) => handleErrors(e))
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Container>
      <Image src={logo} className="logo" />
      <Box>
        <BoxHeader>
          <BoxTitle>Reset Password</BoxTitle>
        </BoxHeader>
        <BoxBody>
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            hideRequiredMark
          >
            <Form.Item
              label="Password"
              className="label"
              name="password"
              rules={[
                {
                  min: 6,
                },
                {
                  required: true,
                },
              ]}
            >
              <Input
                type="password"
                prefix={<LockOutlined className="site-form-item-icon" />}
                placeholder=""
                size="large"
              />
            </Form.Item>
            <Form.Item
              label="Repeat Password"
              className="label"
              name="password_confirmation"
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
              <Input
                type="password"
                prefix={<LockOutlined className="site-form-item-icon" />}
                placeholder=""
                size="large"
              />
            </Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              loading={loading}
              block
            >
              Reset
            </Button>
            <Button onClick={() => router.push('/login')} type="text">
              Back
            </Button>
          </Form>
        </BoxBody>
      </Box>
    </Container>
  );
};

export default resetUserPassword;
