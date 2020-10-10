import React from 'react';
import { Breadcrumb as BreadcrumbBase } from 'antd';
import { breadcrumbConfig } from 'utils';

const Breadcrumb = (props) => {
  props = { ...props, routes: breadcrumbConfig(props.routes) };

  return <BreadcrumbBase itemRender={itemRender} {...props} />;
};

export default Breadcrumb;
