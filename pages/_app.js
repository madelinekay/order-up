import "../styles/globals.css";
import theme from "../styles/theme";
import { CartContextProvider } from "../utils/cart-context";
import Layout from "../components/Layout";
import { SearchContextProvider } from "../utils/search-context";

import { ThemeProvider } from "@material-ui/core";
import { useEffect } from "react";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CartContextProvider>
        <SearchContextProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </SearchContextProvider>
      </CartContextProvider>
    </ThemeProvider>
  );
}

export default MyApp;
