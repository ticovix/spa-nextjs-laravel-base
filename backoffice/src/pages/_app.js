import React from 'react';
import Router from 'next/router';
import { Provider } from 'react-redux';
import { store, persistor } from '../store';
import { PersistGate } from 'redux-persist/integration/react';
import { AuthProvider } from 'contexts/auth';
import { SWRConfig } from 'swr';
import { ConfigProvider } from 'antd';
import ptBR from 'antd/lib/locale/pt_BR';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

export default function App({ Component, pageProps }) {
  const swrConfig = {
    refreshInterval: 0,
  };

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SWRConfig value={swrConfig}>
          <AuthProvider>
            <ConfigProvider locale={ptBR}>
              <Component {...pageProps} />
            </ConfigProvider>
          </AuthProvider>
        </SWRConfig>
      </PersistGate>
    </Provider>
  );
}
