import API from "../utils/api";

const defaultStats = {
  total_books: 0,
  total_users: 0,
  issued_books: 0,
  returned_books: 0
};

export const getDashboardStats = async () => {

  try {

    const res = await API.get("/dashboard");

    return res.data;

  } catch (error) {

    console.error("Dashboard API Error:", error);

    return defaultStats;

  }

};