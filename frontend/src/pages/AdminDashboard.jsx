import { toast } from "react-toastify";

function AdminDashboard() {

    const handleLogout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("role");

        toast.success("Logged out successfully");

        setTimeout(() => {
            window.location.href = "/";
        }, 1500);

    };

    return (

        <div className="p-10">

            <div className="flex justify-between">

                <h1 className="text-3xl font-bold">
                    Admin Dashboard
                </h1>

                <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                >
                    Logout
                </button>

            </div>

            <p className="mt-4">
                Admin can manage books here.
            </p>

        </div>
    );
}

export default AdminDashboard;