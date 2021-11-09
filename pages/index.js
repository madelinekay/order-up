import MenuItem from "../components/MenuItem";
import SearchContext from "../utils/search-context";

import { useContext } from "react";
import Head from "next/head";

export default function Home() {
  const { filteredMenu } = useContext(SearchContext);

  return (
    <div>
      <Head>
        <title>Thai Pavillion</title>
        <meta name="description" content="Thai Pavillion order system." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div style={{ margin: "0 auto", maxWidth: 1200 }}>
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
      </div>
    </div>
  );
}
