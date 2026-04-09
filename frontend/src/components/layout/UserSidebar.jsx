function UserSidebar({ setActivePage }) {
    return (
        <div className="w-64 bg-teal-700 text-white p-6 min-h-screen">
            <h1 className="text-2xl font-bold mb-8">Library</h1>
            <ul className="space-y-4">
                <li onClick={() => setActivePage("dashboard")} className="p-3 cursor-pointer hover:bg-teal-600 rounded">Dashboard</li>
                <li onClick={() => setActivePage("available")} className="cursor-pointer hover:bg-teal-600 p-3 rounded">Available Books</li>
                <li onClick={() => setActivePage("borrowed")} className="cursor-pointer hover:bg-teal-600 p-3 rounded">My Borrowed Books</li>
                <li onClick={() => setActivePage("overdue")} className="cursor-pointer hover:bg-teal-600 p-3 rounded">Overdue + Fine</li>
                <li onClick={() => setActivePage("history")} className="cursor-pointer hover:bg-teal-600 p-3 rounded">Borrow History</li>
                <li onClick={() => setActivePage("fineHistory")} className="cursor-pointer hover:bg-teal-600 p-3 rounded">Fine History</li>
            </ul>
        </div>
    );
}
export default UserSidebar;