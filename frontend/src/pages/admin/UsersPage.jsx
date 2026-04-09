import { useEffect, useState } from "react";
import { getUsers, deleteUser } from "../../services/userService";
import { toast } from "react-toastify";

function UsersPage() {
    const [users, setUsers] = useState([]);
    useEffect(() => { fetchUsers(); }, []);
    const fetchUsers = async () => {
        const data = await getUsers();
        setUsers(data);
    };
    const handleDelete = async (id) => {
        await deleteUser(id);
        toast.success("User deleted successfully");
        fetchUsers();
    };
    return (
        <div className="bg-white rounded-xl shadow">

            <h2 className="text-xl font-semibold p-6 border-b sticky top-0 bg-white z-10">
                Users
            </h2>

            <div className="h-80 overflow-y-auto">

                <table className="w-full text-left">

                    <thead className="bg-gray-100 sticky top-0">
                        <tr>
                            <th className="p-3">Name</th>
                            <th className="p-3 text-center">Email</th>
                            <th className="p-3 text-center">Borrowed Books</th>
                            <th className="p-3 text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id} className="border-b hover:bg-gray-50">
                                <td className="p-3">{user.name}</td>
                                <td className="p-3 text-center">{user.email}</td>
                                <td className="p-3 text-center">{user.borrowed_books}</td>
                                <td className="p-3 text-center">
                                    <button onClick={() => handleDelete(user.id)} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
export default UsersPage;