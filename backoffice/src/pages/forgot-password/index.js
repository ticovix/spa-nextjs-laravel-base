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
import logo from 'assets/images/logo.svg';
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
        successMessage('E-mail enviado com sucesso!');
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
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              loading={loading}
              block
            >
              Enviar
            </Button>
            <Button onClick={() => router.back()} type="text">
              Voltar
            </Button>
          </Form>
        </BoxBody>
      </Box>
    </Container>
  );
};

export default ForgotPassword;
