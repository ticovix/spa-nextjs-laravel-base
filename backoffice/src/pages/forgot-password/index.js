import React, { useState } from 'react';
import {
  Container,
  Box,
  BoxHeader,
  BoxBody,
  BoxTitle,
} from 'assets/styles/styled';
import { Form, Input, Button, Image } from 'antd';
import 'assets/styles/theme.less';
import { UserOutlined } from '@ant-design/icons';
import logo from 'assets/images/logo.png';
import { useRouter } from 'next/router';
import { sendEmail } from 'services/forgotPassword';
import { successMessage, handleErrors } from 'utils';

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const router = useRouter();
  const handleSubmit = (values) => {
    setLoading(true);
    sendEmail(values.email)
      .then((response) => {
        form.resetFields();
        successMessage(
          'Sent email successful! In a moment you will receive an email to reset your password.'
        );
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
              label="Email"
              className="label"
              name="email"
              rules={[
                {
                  required: true,
                },
                {
                  type: 'email',
                },
              ]}
            >
              <Input
                type="email"
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="example@company.com"
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
              Send
            </Button>
            <Button onClick={() => router.back()} type="text">
              Back
            </Button>
          </Form>
        </BoxBody>
      </Box>
    </Container>
  );
};

export default ForgotPassword;
