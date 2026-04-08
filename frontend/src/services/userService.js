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

export const getAvailableBooks = async () => {
    try {
        const res = await API.get("/available-books");
        return res.data;
    } catch (error) {
        console.error(error);
        return [];
    }
};

export const borrowBook = async (data) => {
    try {
        const res = await API.post("/borrow-book", data);
        return res.data;
    } catch (error) {
        console.error(error);
    }
};

export const getMyBooks = async (userId) => {
    try {
        const res = await API.get(`/my-books/${userId}`);
        return res.data;
    } catch (error) {
        console.error(error);
        return [];
    }
};

export const getOverdueBooks = async (userId) => {
    try {
        const res = await API.get(`/my-overdue/${userId}`);
        return res.data;
    } catch (error) {
        console.error(error);
        return [];
    }
};

export const payFine = async (id) => {
    try {
        const res = await API.put(`/pay-fine/${id}`);
        return res.data;
    } catch (error) {
        console.error(error);
    }
};

export const getBorrowHistory = async (userId) => {
    try {
        const res = await API.get(`/borrow-history/${userId}`);
        return res.data;
    } catch (error) {
        console.error(error);
        return [];
    }
};