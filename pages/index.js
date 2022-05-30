import MenuItem from "../components/MenuItem";
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
      {/* <div style={{ margin: "0 auto", maxWidth: 1200 }}>
        <div
          style={{
            padding: 30,
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gridTemplateRows: "repeat(auto-fill, 1fr)",
            gridGap: 20,
          }}
        >
          {filteredMenu.map((item) => {
            return <MenuItem key={item.name} item={item} />;
          })}
        </div>
      </div> */}
      <Orders />
    </div>
  );
}
