function Sidebar({ setActivePage }) {

    return (

        <div className="w-64 bg-gradient-to-b from-teal-600 to-teal-800 text-white p-6">

            <h1 className="text-2xl font-bold mb-10">Library</h1>

            <ul className="space-y-4">

                <li
                    onClick={() => setActivePage("dashboard")}
                    className="cursor-pointer hover:bg-teal-500 p-3 rounded"
                >
                    Dashboard
                </li>

                <li
                    onClick={() => setActivePage("books")}
                    className="cursor-pointer hover:bg-teal-500 p-3 rounded"
                >
                    Books
                </li>

                <li
                    onClick={() => setActivePage("addBook")}
                    className="cursor-pointer hover:bg-teal-500 p-3 rounded"
                >
                    Add Book
                </li>

                <li
                    onClick={() => setActivePage("users")}
                    className="cursor-pointer hover:bg-teal-500 p-3 rounded"
                >
                    Users
                </li>

            </ul>

        </div>

    );

}

export default Sidebar;