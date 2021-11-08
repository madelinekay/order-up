import { useContext } from "react";
import Head from "next/head";
import Image from "next/image";
import Card from "@material-ui/core/Card";
import Link from "next/link";
import { CardContent, makeStyles } from "@material-ui/core";
import flatten from "lodash/flatten";

import MenuItem from "../components/MenuItem";
import data from "../utils/data";
import SearchContext from "../utils/search-context";

export default function Home() {
  // let transformed = [];
  // Object.values(data).map((arr) => arr.map((item) => transformed.push(item)));

  const { filteredMenu } = useContext(SearchContext);

  // map = [x, y, z] -> [fn(x), fn(y), fn(z)]
  // reduce = [x, y, z] -> A

  // const map = (array, fn) => array.reduce((acc, x) => [...acc, fn(x)], []);

  return (
    <div>
      <Head>
        <title>Thai Mad-ness</title>
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
