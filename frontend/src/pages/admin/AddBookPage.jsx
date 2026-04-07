import { useState } from "react";
import { addBook } from "../../services/bookService";
import { toast } from "react-toastify";

function AddBookPage() {

    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [category, setCategory] = useState("");
    const [isbn, setIsbn] = useState("");
    const [year, setYear] = useState("");
    const [copies, setCopies] = useState(1);

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!title || !author || !category || !isbn || !year || !copies) {

            toast.error("All fields are required!");

            return;
        }

        const bookData = {
            title,
            author,
            category,
            isbn,
            published_year: year,
            total_copies: copies
        };

        try {

            await addBook(bookData);

            toast.success("Book added successfully!");

            setTitle("");
            setAuthor("");
            setCategory("");
            setIsbn("");
            setYear("");
            setCopies(1);

        } catch (error) {

            toast.error("Failed to add book");

        }

    };

    return (

        <div className="flex justify-center items-center min-h-[80vh]">

            <div className="bg-white shadow-xl rounded-xl p-10 w-full max-w-3xl">

                <h1 className="text-3xl font-bold mb-8 text-gray-700 text-center">
                    Add New Book
                </h1>

                <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">

                    {/* Title */}

                    <div className="col-span-2">
                        <label className="text-gray-600 text-sm">Book Title</label>

                        <input
                            type="text"
                            placeholder="Enter book title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full p-3 border rounded-lg mt-1 focus:ring-2 focus:ring-teal-500"
                        />
                    </div>

                    {/* Author */}

                    <div>
                        <label className="text-gray-600 text-sm">Author</label>

                        <input
                            type="text"
                            placeholder="Author name"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                            className="w-full p-3 border rounded-lg mt-1 focus:ring-2 focus:ring-teal-500"
                        />
                    </div>

                    {/* Category */}

                    <div>
                        <label className="text-gray-600 text-sm">Category</label>

                        <input
                            type="text"
                            placeholder="Category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full p-3 border rounded-lg mt-1 focus:ring-2 focus:ring-teal-500"
                        />
                    </div>

                    {/* ISBN */}

                    <div>
                        <label className="text-gray-600 text-sm">ISBN</label>

                        <input
                            type="text"
                            placeholder="ISBN number"
                            value={isbn}
                            onChange={(e) => setIsbn(e.target.value)}
                            className="w-full p-3 border rounded-lg mt-1 focus:ring-2 focus:ring-teal-500"
                        />
                    </div>

                    {/* Published Year */}

                    <div>
                        <label className="text-gray-600 text-sm">Published Year</label>

                        <input
                            type="number"
                            placeholder="Year"
                            value={year}
                            onChange={(e) => setYear(e.target.value)}
                            className="w-full p-3 border rounded-lg mt-1 focus:ring-2 focus:ring-teal-500"
                        />
                    </div>

                    {/* Total Copies */}

                    <div className="col-span-2">
                        <label className="text-gray-600 text-sm">Total Copies</label>

                        <input
                            type="number"
                            placeholder="Number of copies"
                            value={copies}
                            onChange={(e) => setCopies(e.target.value)}
                            className="w-full p-3 border rounded-lg mt-1 focus:ring-2 focus:ring-teal-500"
                        />
                    </div>

                    {/* Button */}

                    <div className="col-span-2 flex justify-center">

                        <button className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-lg font-semibold transition">

                            Add Book

                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}

export default AddBookPage;