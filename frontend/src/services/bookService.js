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
  try{

  const res = await API.post("/books",bookData);

  return res.data;

  }catch(error){

  console.error("Error adding book:",error);

  }

};