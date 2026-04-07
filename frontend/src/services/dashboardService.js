import API from "../utils/api";

export const getDashboardStats = async () => {
  try {

    const res = await API.get("/dashboard");

    return res.data;

  } catch (error) {

    if (error.response) {
      console.error("Server Error:", error.response.data);
    } 
    else if (error.request) {
      console.error("Network Error:", error.request);
    } 
    else {
      console.error("Error:", error.message);
    }

    return {
      total_books: 0,
      total_users: 0,
      issued_books: 0,
      returned_books: 0
    };

  }
};