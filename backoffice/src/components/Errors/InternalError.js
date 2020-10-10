import React from 'react';
import { Result, Button } from 'antd';
import Router from 'next/router';

const InternalError = () => {
  const handleBack = () => Router.back();

  return (
    <Result
      status="500"
      title="Erro Interno"
      subTitle="Desculpe, algo deu errado. Tente novamente mais tarde."
      extra={
        <Button type="primary" onClick={handleBack}>
          Voltar
        </Button>
      }
    />
  );
};

export default InternalError;
