function TopBooks({ books }) {

    return (

        <div className="bg-white rounded-xl shadow mt-8">

            <h2 className="text-xl font-semibold p-6 border-b sticky top-0 bg-white">
                Top Borrowed Books
            </h2>

            <div className="h-72 overflow-y-auto">

                <table className="w-full text-left">

                    <thead className="bg-white sticky top-0">

                        <tr className="border-b">
                            <th className="p-3">Book Title</th>
                            <th className="p-3 text-center">Borrow Count</th>
                        </tr>

                    </thead>

                    <tbody>

                        {books.length === 0 ? (

                            <tr>

                                <td colSpan="2" className="text-center p-4 text-gray-500">
                                    No data available
                                </td>

                            </tr>

                        ) : (

                            books.map((book, index) => (

                                <tr key={index} className="border-b hover:bg-gray-50">

                                    <td className="p-3">{book.title}</td>

                                    <td className="p-3 text-center font-semibold text-teal-600">
                                        {book.borrow_count}
                                    </td>

                                </tr>

                            ))

                        )}

                    </tbody>

                </table>

            </div>

        </div>

    );

}

export default TopBooks;