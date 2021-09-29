import "../styles/globals.css";
import { CartContextProvider } from "../utils/cart-context";
import Layout from "../components/Layout";
import { useEffect } from "react";
import { SearchContextProvider } from "../utils/search-context";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    // <CartContextProvider>
    <SearchContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SearchContextProvider>

    // </CartContextProvider>
  );
}

export default MyApp;
