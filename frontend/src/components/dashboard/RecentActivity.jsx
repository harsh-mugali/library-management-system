function RecentActivity({ activities }) {

    return (

        <div className="bg-white p-6 rounded-xl shadow h-72 overflow-y-auto">

            <h2 className="text-xl font-semibold mb-4">
                Recent Activity
            </h2>

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
    );

}

export default RecentActivity;