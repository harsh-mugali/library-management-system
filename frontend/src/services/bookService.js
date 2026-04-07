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