import { useEffect, useState } from "react";
import { getBooks, deleteBook } from "../../services/bookService";
import { toast } from "react-toastify";

function BooksPage() {

  const [books, setBooks] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

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

  const handleDelete = async () => {

    await deleteBook(selectedBook.id);

    toast.success("Book deleted successfully");

    setShowDeleteModal(false);

    fetchBooks();
  };

  return (

    <div>

      <h1 className="text-3xl font-bold mb-6">
        Books
      </h1>

      <table className="w-full bg-white shadow rounded">

        <thead className="bg-gray-200">

          <tr>

            <th className="p-3 text-left">Title</th>
            <th className="p-3 text-left">Author</th>
            <th className="p-3 text-left">Category</th>
            <th className="p-3 text-center">Year</th>
            <th className="p-3 text-center">Copies</th>
            <th className="p-3 text-center">Actions</th>

          </tr>

        </thead>

        <tbody>

          {books.map((book) => (

            <tr key={book.id} className="border-b">

              <td className="p-3 text-left">{book.title}</td>
              <td className="p-3 text-left">{book.author}</td>
              <td className="p-3 text-left">{book.category}</td>
              <td className="p-3 text-center">{book.published_year}</td>
              <td className="p-3 text-center">{book.total_copies}</td>

              <td className="p-3 flex justify-center gap-2">

                <button
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

    </div>

  );

}

export default BooksPage;