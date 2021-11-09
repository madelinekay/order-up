import "../styles/globals.css";
import { ThemeProvider } from "@material-ui/core";
import { CartContextProvider } from "../utils/cart-context";
import Layout from "../components/Layout";
import { useEffect } from "react";
import { SearchContextProvider } from "../utils/search-context";
import theme from "../styles/theme";

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
