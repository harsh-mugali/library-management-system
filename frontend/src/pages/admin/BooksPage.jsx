import { useEffect, useState } from "react";
import { getBooks } from "../../services/bookService";

function BooksPage() {

  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    const data = await getBooks();
    setBooks(data);
  };

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">Library Books</h1>

      <div className="grid grid-cols-3 gap-4">
        {books.map((book) => (
          <div key={book.id} className="p-4 border rounded shadow">
            <h2 className="text-xl font-bold">{book.title}</h2>
            <p>Author: {book.author}</p>
            <p>Category: {book.category}</p>
          </div>
        ))}
      </div>

    </div>
  );
}

export default BooksPage;