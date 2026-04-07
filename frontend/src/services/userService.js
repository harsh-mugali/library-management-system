import API from "../utils/api";

export const getUsers = async () => {
    try {
        const res = await API.get("/users");
        return res.data;
    } catch (error) {
        console.error("Error fetching users:", error);
        return [];
    }
};

export const addUser = async (data) => {
    try {
        const res = await API.post("/users", data);
        return res.data;
    } catch (error) {
        console.error("Error adding user:", error);
    }
};

export const deleteUser = async (id) => {
    try {
        const res = await API.delete(`/users/${id}`);
        return res.data;
    } catch (error) {
        console.error("Error deleting user:", error);
    }
};