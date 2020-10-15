import React from 'react';
import { PageHeader as PageHeaderBase } from 'antd';
import { breadcrumbConfig } from 'utils';

const PageHeader = (props) => {
  props = {
    ...props,
    ghost: props.ghost === undefined ? false : props.ghost,
  };

  if (props.breadcrumb?.routes) {
    props = {
      ...props,
      breadcrumb: breadcrumbConfig(props.breadcrumb?.routes),
    };
  }

  return <PageHeaderBase {...props} />;
};

export default PageHeader;
