import { useEffect, useState } from "react";
import { getBooksByCategory } from "../../services/bookService";

function CategoryPage() {
    const [categories, setCategories] = useState({});
    useEffect(() => { loadCategories(); }, []);
    const loadCategories = async () => {
        const data = await getBooksByCategory();
        setCategories(data);
    };
    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Books by Category</h1>
            {Object.keys(categories).map((cat) => (
                <div key={cat} className="bg-white shadow rounded-lg mb-6 p-4">
                    <h2 className="text-xl font-semibold mb-3 text-teal-600">{cat}</h2>
                    <ul className="space-y-2">
                        {categories[cat].map((book, index) => (
                            <li key={index} className="border-b pb-1">{book.title} — {book.author}</li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}
export default CategoryPage;