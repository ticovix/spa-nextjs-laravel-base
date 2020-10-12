import React from 'react';
import { Container, Box, BoxFooter, BoxBody } from 'assets/styles/styled';
import { Checkbox, Form, Input, Button, Divider, Image } from 'antd';
import 'assets/styles/theme.less';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import logo from 'assets/images/logo.png';
import useAuth from 'contexts/auth';
import Link from 'next/link';

const Login = () => {
  const { login, isLoading } = useAuth();
  const handleSubmit = (user) => login(user);

  return (
    <Container>
      <Image src={logo} className="logo" />
      <Box>
        <BoxBody>
          <Form layout="vertical" onFinish={handleSubmit} hideRequiredMark>
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
            <Form.Item
              label="Password"
              className="label"
              name="password"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input
                type="password"
                prefix={<LockOutlined className="site-form-item-icon" />}
                placeholder="Your Password"
                size="large"
              />
            </Form.Item>
            <Form.Item className="login-form-forgot">
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
              <Link href="/forgot-password">Forgot password?</Link>
            </Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              size="large"
              loading={isLoading}
              block
            >
              Login
            </Button>
          </Form>
        </BoxBody>
        <BoxFooter>
          <Divider className="no-margin">OR</Divider>
          <p>
            Need an account? <a href="">Sign up now!</a>
          </p>
        </BoxFooter>
      </Box>
    </Container>
  );
};

export default Login;
