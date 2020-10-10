import React from 'react';
import { Result, Button } from 'antd';

const NotAuthorized = () => {
  return (
    <Result
      status="403"
      title="Acesso não autorizado"
      subTitle="Desculpe, para acessar esta página é necessário estar logado. Você está sendo
  redirecionado para tela de login."
    />
  );
};

export default NotAuthorized;
