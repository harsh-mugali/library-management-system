function StatsCards({ stats }) {

    return (

        <div className="grid grid-cols-4 gap-6 mb-10">

            <div className="bg-gradient-to-r from-teal-500 to-teal-700 text-white p-6 rounded-xl">
                <p>Total Books</p>
                <h2 className="text-3xl font-bold">{stats.total_books}</h2>
            </div>

            <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-white p-6 rounded-xl">
                <p>Books Issued</p>
                <h2 className="text-3xl font-bold">{stats.issued_books}</h2>
            </div>

            <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-xl">
                <p>Books Returned</p>
                <h2 className="text-3xl font-bold">{stats.returned_books}</h2>
            </div>

            <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-xl">
                <p>Total Users</p>
                <h2 className="text-3xl font-bold">{stats.total_users}</h2>
            </div>

        </div>

    );

}

export default StatsCards;