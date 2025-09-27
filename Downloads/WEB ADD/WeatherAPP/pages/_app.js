// pages/_app.js
import '../styles/globals.css';  // Ensure this line is here to import the global styles

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
