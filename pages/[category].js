import MenuItem from "../components/MenuItem";
import { useRouter } from "next/router";
import data from "../utils/data";

const Category = () => {
    const router = useRouter();
    const { category } = router.query;

    if (!category) {
        return null;
    }

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
                {data.filter(item => item.category === category).map(item => <MenuItem key={item} item={item} category={category.toString()} />)}
            </div>
        </div>
    );
};

export default Category;
