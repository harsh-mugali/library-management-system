import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";

function UserProfile() {

    const [open, setOpen] = useState(false);
    const [showLogout, setShowLogout] = useState(false);

    const name = localStorage.getItem("userName");
    const email = localStorage.getItem("userEmail");

    const logout = () => {
        localStorage.clear();
        window.location.href = "/";
    };

    return (

        <div className="relative">

            <div
                className="flex items-center gap-2 cursor-pointer bg-teal-500 border border-teal-600 shadow-sm px-4 py-2 rounded-lg hover:bg-teal-600 transition"
                onClick={() => setOpen(!open)}
            >
                <FaUserCircle size={22} />
                <span className="font-semibold text-white">Profile</span>
            </div>

            {open && (

                <div className="absolute right-0 mt-3 w-64 bg-gray-50 border border-gray-200 shadow-xl rounded-xl p-4 z-50">

                    <div className="flex items-center gap-3 mb-4">

                        <div className="bg-teal-600 text-white px-3 py-2 rounded-full">
                            {name?.charAt(0)}
                        </div>

                        <div>
                            <p className="font-semibold text-gray-800">{name}</p>
                            <p className="text-sm text-gray-500">{email}</p>
                        </div>

                    </div>

                    <button
                        onClick={() => setShowLogout(true)}
                        className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg"
                    >
                        Logout
                    </button>

                </div>

            )}

            {showLogout && (

                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">

                    <div className="bg-white p-6 rounded-xl shadow-lg text-center w-80">

                        <p className="mb-6 font-semibold">
                            Are you sure you want to logout?
                        </p>

                        <div className="flex justify-center gap-4">

                            <button
                                onClick={() => setShowLogout(false)}
                                className="px-4 py-2 bg-gray-300 rounded"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={logout}
                                className="px-4 py-2 bg-red-500 text-white rounded"
                            >
                                Logout
                            </button>

                        </div>

                    </div>

                </div>

            )}

        </div>

    );

}

export default UserProfile;