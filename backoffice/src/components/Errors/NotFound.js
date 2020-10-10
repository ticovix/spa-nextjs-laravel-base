import React from 'react';
import { Result, Button } from 'antd';
import Router from 'next/router';

const NotFound = () => {
  const handleBack = () => Router.back();

  return (
    <Result
      status="404"
      title="Página não encontrada"
      subTitle="Desculpe, a página que você está tentando acessar não existe."
      extra={
        <Button type="primary" onClick={handleBack}>
          Voltar
        </Button>
      }
    />
  );
};

export default NotFound;
