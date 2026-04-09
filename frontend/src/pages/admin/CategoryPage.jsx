import { useEffect, useState } from "react";
import { getBooksByCategory } from "../../services/bookService";
import SearchBar from "../../components/common/SearchBar";
import { filterData } from "../../utils/filterData";

function CategoryPage() {
    const [categories, setCategories] = useState({});
    const [search, setSearch] = useState("");
    useEffect(() => { loadCategories(); }, []);
    const loadCategories = async () => {
        const data = await getBooksByCategory();
        setCategories(data);
    };
    const filteredCategories = Object.keys(categories).filter(cat =>
        cat.toLowerCase().includes(search.toLowerCase())
    );
    return (
        <div>
            <div className="flex justify-between items-center p-6 border-b sticky top-0 bg-white z-10">

                <h2 className="text-xl font-semibold">
                    Books by Category
                </h2>

                <SearchBar
                    placeholder="Search books..."
                    value={search}
                    onChange={setSearch}
                />

            </div>

            {filteredCategories.map((cat) => (
                <div key={cat} className="bg-white shadow rounded-lg mb-6 p-4">

                    <h2 className="text-xl font-semibold mb-3 text-teal-600 sticky top-0 bg-white z-10">
                        {cat}
                    </h2>

                    <div className="max-h-56 overflow-y-auto">

                        <ul className="space-y-2">

                            {categories[cat].map((book, index) => (
                                <li key={index} className="border-b pb-1">
                                    {book.title} — {book.author}
                                </li>
                            ))}

                        </ul>

                    </div>

                </div>
            ))}

        </div>
    );
}
export default CategoryPage;