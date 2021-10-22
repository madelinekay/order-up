import "../styles/globals.css";
import { ThemeProvider } from "@material-ui/core";
import { CartContextProvider } from "../utils/cart-context";
import Layout from "../components/Layout";
import { useEffect } from "react";
import { SearchContextProvider } from "../utils/search-context";
import theme from "./theme";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, onValue } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA1oL-kZSAuizXIH5lCiGMJmxBqJ26ZMAk",
  authDomain: "thai-calculator.firebaseapp.com",
  databaseURL: "https://thai-calculator-default-rtdb.firebaseio.com",
  projectId: "thai-calculator",
  storageBucket: "thai-calculator.appspot.com",
  messagingSenderId: "1031090262907",
  appId: "1:1031090262907:web:7c4a5b38650205fc0ee3de",
  measurementId: "G-9ZKH40PXLV",
};

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  // Initialize Firebase
  useEffect(() => {
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);
    const database = getDatabase(app);
    const ordersRef = ref(database, "recentOrders");
    onValue(ordersRef, (snapshot) => {
      const data = snapshot.val();
      console.log("data", data);
    });
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
