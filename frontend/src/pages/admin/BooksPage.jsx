import { useEffect, useState } from "react";
import { getBooks, deleteBook, updateBook } from "../../services/bookService";
import { toast } from "react-toastify";
import SearchBar from "../../components/common/SearchBar";
import {filterData} from "../../utils/filterData";

function BooksPage() {

  const [books, setBooks] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  const [showEditModal, setShowEditModal] = useState(false);
  const [editBook, setEditBook] = useState(null);

  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    const data = await getBooks();
    setBooks(data);
  };

  const confirmDelete = (book) => {
    setSelectedBook(book);
    setShowDeleteModal(true);
  };

  const openEditModal = (book) => {
    setEditBook(book);
    setShowEditModal(true);
  };

  const handleDelete = async () => {

    await deleteBook(selectedBook.id);

    toast.success("Book deleted successfully");

    setShowDeleteModal(false);

    fetchBooks();
  };

  const handleUpdate = async () => {

    await updateBook(editBook.id, editBook);

    toast.success("Book updated successfully");

    setShowEditModal(false);

    fetchBooks();

  };

  const filteredBooks=filterData(books,search,["title","author","category"]);

  return (

    <div className="bg-white rounded-xl shadow">

      <div className="flex justify-between items-center p-6 border-b sticky top-0 bg-white z-10">

        <h2 className="text-xl font-semibold">
          Books
        </h2>

        <SearchBar
          placeholder="Search books..."
          value={search}
          onChange={setSearch}
        />

      </div>

      <div className="h-80 overflow-y-auto">

        <table className="w-full text-left">

          <thead className="bg-gray-100 sticky top-0">
            <tr>
              <th className="p-3">Title</th>
              <th className="p-3 text-center">Author</th>
              <th className="p-3 text-center">Category</th>
              <th className="p-3 text-center">Year</th>
              <th className="p-3 text-center">Copies</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>

            {filteredBooks.map((book) => (

              <tr key={book.id} className="border-b">

                <td className="p-3 text-left">{book.title}</td>
                <td className="p-3 text-center">{book.author}</td>
                <td className="p-3 text-center">{book.category}</td>
                <td className="p-3 text-center">{book.published_year}</td>
                <td className="p-3 text-center">{book.total_copies}</td>

                <td className="p-3 flex justify-center gap-2">

                  <button
                    onClick={() => openEditModal(book)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => confirmDelete(book)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>


        {/* DELETE MODAL */}

        {showDeleteModal && (

          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">

            <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center">

              <h2 className="text-lg font-semibold mb-4">
                Delete this book?
              </h2>

              <p className="text-gray-600 mb-6">
                {selectedBook?.title}
              </p>

              <div className="flex justify-center gap-4">

                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 bg-gray-300 rounded"
                >
                  Cancel
                </button>

                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-500 text-white rounded"
                >
                  Delete
                </button>

              </div>

            </div>

          </div>

        )}

        {showEditModal && editBook && (

          <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm">

            <div className="bg-white shadow-xl rounded-xl p-10 w-full max-w-2xl">

              <h2 className="text-2xl font-bold mb-8 text-gray-700 text-center">
                Edit Book
              </h2>

              <div className="grid grid-cols-2 gap-6">

                {/* Title */}

                <div className="col-span-2">
                  <label className="text-gray-600 text-sm">Book Title</label>

                  <input
                    type="text"
                    value={editBook.title}
                    onChange={(e) => setEditBook({ ...editBook, title: e.target.value })}
                    className="w-full p-3 border rounded-lg mt-1 focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                {/* Author */}

                <div>
                  <label className="text-gray-600 text-sm">Author</label>

                  <input
                    type="text"
                    value={editBook.author}
                    onChange={(e) => setEditBook({ ...editBook, author: e.target.value })}
                    className="w-full p-3 border rounded-lg mt-1 focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                {/* Category */}

                <div>
                  <label className="text-gray-600 text-sm">Category</label>

                  <input
                    type="text"
                    value={editBook.category}
                    onChange={(e) => setEditBook({ ...editBook, category: e.target.value })}
                    className="w-full p-3 border rounded-lg mt-1 focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                {/* Year */}

                <div>
                  <label className="text-gray-600 text-sm">Published Year</label>

                  <input
                    type="number"
                    value={editBook.published_year}
                    onChange={(e) => setEditBook({ ...editBook, published_year: e.target.value })}
                    className="w-full p-3 border rounded-lg mt-1 focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                {/* Copies */}

                <div>
                  <label className="text-gray-600 text-sm">Total Copies</label>

                  <input
                    type="number"
                    value={editBook.total_copies}
                    onChange={(e) => setEditBook({ ...editBook, total_copies: e.target.value })}
                    className="w-full p-3 border rounded-lg mt-1 focus:ring-2 focus:ring-teal-500"
                  />
                </div>

              </div>

              {/* Buttons */}

              <div className="flex justify-center gap-4 mt-8">

                <button
                  onClick={() => setShowEditModal(false)}
                  className="px-5 py-2 bg-gray-300 rounded-lg"
                >
                  Cancel
                </button>

                <button
                  onClick={handleUpdate}
                  className="px-6 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-semibold"
                >
                  Update Book
                </button>

              </div>

            </div>

          </div>

        )}

      </div>

    </div>

  );

}

export default BooksPage;