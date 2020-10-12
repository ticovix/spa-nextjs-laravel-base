import React from 'react';
import { Layout, Container } from 'components/Layout';
import PageHeader from 'components/PageHeader';
import { ProtectRoute } from 'contexts/auth';

const Dashboard = () => {
  return (
    <Layout>
      <PageHeader title="Dashboard" breadcrumb={{}} />
      <Container>Welcome to dashboard!</Container>
    </Layout>
  );
};

export default ProtectRoute(Dashboard);
