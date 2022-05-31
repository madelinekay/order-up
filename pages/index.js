import SearchContext from "../utils/search-context";
import Orders from "../components/Orders";

import { useContext } from "react";
import Head from "next/head";

export default function Home() {
  const { filteredMenu } = useContext(SearchContext);

  return (
    <div>
      <Head>
        <title>Thai Pavilion</title>
        <meta name="description" content="Thai Pavilion order system." />
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#f9f2fe" />
      </Head>
      <Orders />
    </div>
  );
}
