import API from "../utils/api";

export const getBooks = async () => {
  try {

    const res = await API.get("/books");

    return res.data;

  } catch (error) {

    console.error("Error fetching books:", error);

    return [];

  }
};

export const addBook = async (bookData) => {
  try {

    const res = await API.post("/books", bookData);

    return res.data;

  } catch (error) {

    console.error("Error adding book:", error);

  }

};

export const deleteBook = async (id) => {
  try {
    const res = await API.delete(`/books/${id}`);
    return res.data;
  } catch (error) {
    console.error("Error deleting book:", error);
  }
};

export const updateBook = async (id, data) => {
  try {
    const res = await API.put(`/books/${id}`, data);
    return res.data;
  } catch (error) {
    console.error("Error updating book:", error);
  }
};