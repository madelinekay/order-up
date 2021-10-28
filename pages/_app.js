import "../styles/globals.css";
import { ThemeProvider } from "@material-ui/core";
import { CartContextProvider } from "../utils/cart-context";
import Layout from "../components/Layout";
import { useEffect } from "react";
import { SearchContextProvider } from "../utils/search-context";
import theme from "./theme";

// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  // Initialize Firebase
  // useEffect(() => {

  // }, []);

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
