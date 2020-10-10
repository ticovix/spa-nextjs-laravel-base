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
import logo from 'assets/images/logo.svg';
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
        successMessage('Senha alterada com sucesso!');
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
          <BoxTitle>Redefinir Senha</BoxTitle>
        </BoxHeader>
        <BoxBody>
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            hideRequiredMark
          >
            <Form.Item
              label="Senha"
              className="label"
              name="password"
              rules={[
                {
                  min: 6,
                },
                {
                  required: true,
                  message: 'Digite a nova senha',
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
              label="Repetir Senha"
              className="label"
              name="password_confirmation"
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
              Salvar
            </Button>
            <Button onClick={() => router.push('/login')} type="text">
              Voltar
            </Button>
          </Form>
        </BoxBody>
      </Box>
    </Container>
  );
};

export default resetUserPassword;
