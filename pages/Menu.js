import { useContext } from 'react'
import MenuItem from "../components/MenuItem";
import SearchContext from "../utils/search-context";

import data from "../utils/data";

import { useRouter } from "next/router";

const Menu = () => {
    const router = useRouter();
    const { filteredMenu } = useContext(SearchContext);

    return (

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
    );
};

export default Menu;
