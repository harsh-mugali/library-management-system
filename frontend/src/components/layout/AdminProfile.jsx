import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminProfile() {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [showLogout, setShowLogout] = useState(false);
    const adminName = localStorage.getItem("adminName") || "Admin";
    const adminEmail = localStorage.getItem("adminEmail") || "admin@gmail.com";
    const logout = () => {
        localStorage.clear();
        navigate("/");
    };
    return (
        <div className="relative">
            <button onClick={() => setOpen(!open)} className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg shadow">
                <div className="w-8 h-8 bg-teal-600 text-white flex items-center justify-center rounded">A</div>
                <span className="font-semibold">Profile</span>
            </button>

            {open && (
                <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-teal-600 text-white flex items-center justify-center rounded">{adminName.charAt(0)}</div>
                        <div>
                            <p className="font-semibold">{adminName}</p>
                            <p className="text-sm text-gray-500">{adminEmail}</p>
                        </div>
                    </div>
                    <button onClick={() => setShowLogout(true)} className="w-full bg-red-500 text-white py-2 rounded">Logout</button>
                </div>
            )}

            {showLogout && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                    <div className="bg-white p-6 rounded-xl shadow-lg w-80 text-center relative z-50">
                        <h2 className="text-lg font-semibold mb-4">Are you sure you want to logout?</h2>
                        <div className="flex justify-center gap-4">
                            <button onClick={() => setShowLogout(false)} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
                            <button onClick={logout} className="px-4 py-2 bg-red-500 text-white rounded">Logout</button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}
export default AdminProfile;