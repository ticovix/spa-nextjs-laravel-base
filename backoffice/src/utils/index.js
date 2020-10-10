import { notification, message } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import Link from 'next/link';

export function getIntervalValidateStatus(status) {
  return status >= 200 && status < 500;
}

const acceptedTypes = ['success', 'error', 'warning', 'info'];

export const quickMessage = (description, type = 'info') => {
  if (!acceptedTypes.includes(type)) message.info(description);

  message[type](description);
};

export const notify = (
  message,
  type = 'error',
  description = '',
  duration = 4.5
) => {
  if (!acceptedTypes.includes(type))
    notification.info({
      message,
      description,
      duration,
    });

  notification[type]({
    message,
    description,
    duration,
  });
};

export const successMessage = (message) => {
  return notify(message, 'success');
};

export const errorMessage = (message) => {
  return notify(message, 'error');
};

export const warningMessage = (message) => {
  return notify(message, 'warning');
};

export const infoMessage = (message) => {
  return notify(message);
};

export const handleErrors = (exception) => {
  if (!exception.response) {
    errorMessage(
      'Servidor indisponível no momento. Tente novamente mais tarde.'
    );

    return;
  }

  let { errors, message } = exception.response.data;

  if (typeof errors !== 'undefined') {
    for (let error in errors) {
      errorMessage(errors[error]);
    }

    return;
  }

  if (typeof message !== 'undefined') {
    errorMessage(message);

    return;
  }
};

export const validateCPF = (cpf) => {
  const regex = new RegExp('\\D', 'g');
  let strCPF = cpf.replace(regex, '');
  strCPF = String(strCPF);

  let Soma;
  let Resto;
  Soma = 0;
  if (
    strCPF === '00000000000' ||
    strCPF === '11111111111' ||
    strCPF === '22222222222' ||
    strCPF === '33333333333' ||
    strCPF === '44444444444' ||
    strCPF === '55555555555' ||
    strCPF === '66666666666' ||
    strCPF === '77777777777' ||
    strCPF === '88888888888' ||
    strCPF === '99999999999'
  )
    return false;

  for (let i = 1; i <= 9; i++)
    Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
  Resto = (Soma * 10) % 11;

  if (Resto === 10 || Resto === 11) Resto = 0;
  if (Resto !== parseInt(strCPF.substring(9, 10))) return false;

  Soma = 0;
  for (let i = 1; i <= 10; i++)
    Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
  Resto = (Soma * 10) % 11;

  if (Resto === 10 || Resto === 11) Resto = 0;
  if (Resto !== parseInt(strCPF.substring(10, 11))) return false;
  return true;
};

export const validateDate = (data) => {
  const reg = /[^\d\/\.]/gi; // Mascara = dd/mm/aaaa | dd.mm.aaaa
  var valida = data.replace(reg, ''); // aplica mascara e valida só numeros
  if (valida && valida.length === 10) {
    // é válida, então ;)
    var ano = data.substr(6),
      mes = data.substr(3, 2),
      dia = data.substr(0, 2),
      M30 = ['04', '06', '09', '11'],
      v_mes = /(0[1-9])|(1[0-2])/.test(mes),
      v_ano = /(19[1-9]\d)|(20\d\d)|2100/.test(ano),
      rexpr = new RegExp(mes),
      fev29 = ano % 4 ? 28 : 29;

    if (v_mes && v_ano) {
      if (mes === '02') return dia >= 1 && dia <= fev29;
      else if (rexpr.test(M30)) return /((0[1-9])|([1-2]\d)|30)/.test(dia);
      else return /((0[1-9])|([1-2]\d)|3[0-1])/.test(dia);
    }
  }
  return false;
};

export const validatePostalCode = (cep) => {
  return cep.length === 8;
};

export const isEmpty = (obj) => {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
};

export const filterNumber = (str) => {
  var regex = new RegExp('\\D', 'g');
  return str.replace(regex, '');
};

export const dateBr2mysql = (date) => {
  if (!date) return '';

  const d = date.split('/');

  return `${d[2]}-${d[1]}-${d[0]}`;
};

export const isBrowser = () => typeof window !== 'undefined';

export function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

export function breadcrumbConfig(breadcrumbRoutes) {
  const routes = [{ path: '/', breadcrumbName: <HomeOutlined /> }];
  const itemRender = (route, params, routes, paths) => {
    const last = routes.indexOf(route) === routes.length - 1;
    if (last) {
      return <span>{route.breadcrumbName}</span>;
    }

    return <Link href={route.path}>{route.breadcrumbName}</Link>;
  };
  let breadcrumb = { itemRender, routes: routes };

  if (breadcrumbRoutes) {
    breadcrumb = {
      ...breadcrumb,
      routes: routes.concat(breadcrumbRoutes),
    };
  }

  return breadcrumb;
}
