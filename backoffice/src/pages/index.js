import React from 'react';
import Layout from 'components/Layout';
import { Row, Col, PageHeader } from 'antd';
import { ProtectRoute } from 'contexts/auth';

const Dashboard = () => {
  const routes = [
    {
      path: 'index',
      breadcrumbName: 'First-level Menu',
    },
    {
      path: 'first',
      breadcrumbName: 'Second-level Menu',
    },
    {
      path: 'second',
      breadcrumbName: 'Third-level Menu',
    },
  ];

  return (
    <Layout>
      <PageHeader
        className="site-page-header"
        title="Title"
        breadcrumb={{ routes }}
        subTitle="This is a subtitle"
      />
      <Row>
        <Col xs={12} lg={6}>
          Teste
        </Col>
        <Col xs={12} lg={6}>
          Teste
        </Col>
        <Col xs={12} lg={6}>
          Teste
        </Col>
        <Col xs={12} lg={6}>
          Teste
        </Col>
      </Row>
    </Layout>
  );
};

export default ProtectRoute(Dashboard);
