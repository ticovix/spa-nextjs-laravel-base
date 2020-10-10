import React from 'react';
import { Container, Box, BoxFooter, BoxBody } from 'assets/styles/styled';
import { Checkbox, Form, Input, Button, Divider, Image } from 'antd';
import 'assets/styles/theme.less';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import logo from 'assets/images/logo.svg';
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
              label="E-mail"
              className="label"
              name="email"
              rules={[
                {
                  required: true,
                  message: 'Digite seu e-mail',
                },
                {
                  type: 'email',
                  message: 'E-mail inválido',
                },
              ]}
            >
              <Input
                type="email"
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="exemplo@empresa.com"
                size="large"
              />
            </Form.Item>
            <Form.Item
              label="Senha"
              className="label"
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Digite sua senha',
                },
              ]}
            >
              <Input
                type="password"
                prefix={<LockOutlined className="site-form-item-icon" />}
                placeholder="Sua senha"
                size="large"
              />
            </Form.Item>
            <Form.Item className="login-form-forgot">
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Lembrar senha</Checkbox>
              </Form.Item>
              <Link href="/forgot-password">Esqueci minha senha</Link>
            </Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              size="large"
              loading={isLoading}
              block
            >
              Acessar
            </Button>
          </Form>
        </BoxBody>
        <BoxFooter>
          <Divider className="no-margin">OU</Divider>
          <p>
            Não é cadastrado? <a href="">Crie uma conta!</a>
          </p>
        </BoxFooter>
      </Box>
    </Container>
  );
};

export default Login;
