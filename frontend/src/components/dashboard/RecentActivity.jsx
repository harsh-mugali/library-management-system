function RecentActivity({ activities }) {

    return (

        <div className="bg-white rounded-xl shadow">

            <h2 className="text-xl font-semibold p-6 border-b sticky top-0 bg-white">
                Recent Activity
            </h2>

            <div className="h-72 overflow-y-auto p-6">

                <ul className="space-y-2 text-gray-600">

                    {activities.map((a, index) => (
                        <li key={index}>
                            {a.action === "returned"
                                ? `Returned ${a.book}`
                                : `${a.user} issued ${a.book}`}
                        </li>
                    ))}

                </ul>

            </div>

        </div>
    );

}

export default RecentActivity;