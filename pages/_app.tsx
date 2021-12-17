import '../lib/globalStyles.css';
import type { AppProps /*, AppContext */ } from 'next/app';

export default ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />;
};
