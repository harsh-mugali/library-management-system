function RecentActivity({ activities }) {

    return (

        <div className="bg-white p-6 rounded-xl shadow">

            <h2 className="text-xl font-semibold mb-4">
                Recent Activity
            </h2>

            <ul className="space-y-2 text-gray-600">

                {activities.map((item, index) => (

                    <li key={index}>

                        {item.returned ? (

                            <span>
                                <strong>{item.user}</strong> returned <strong>{item.book}</strong>
                            </span>

                        ) : (

                            <span>
                                <strong>{item.user}</strong> issued <strong>{item.book}</strong>
                            </span>

                        )}

                    </li>

                ))}

            </ul>

        </div>

    );

}

export default RecentActivity;