import { useState } from "react";
import UserSidebar from "../../components/layout/UserSidebar";
import DashboardHome from "./DashboardHome";
import AvailableBooks from "./AvailableBooks";
import MyBorrowedBooks from "./MyBorrowedBooks";
import OverdueBooks from "./OverdueBooks";
import BorrowHistory from "./BorrowHistory";
import UserProfile from "../../components/layout/UserProfile";
import FineHistory from "./FineHistory";

function UserDashboard() {
  const [activePage, setActivePage] = useState("dashboard");
  return (
    <div className="flex">
      <UserSidebar setActivePage={setActivePage} />
      <div className="flex-1 p-8">
        <div className="flex justify-end mb-6">
          <UserProfile />
        </div>
        {activePage === "dashboard" && <DashboardHome />}
        {activePage === "available" && <AvailableBooks />}
        {activePage === "borrowed" && <MyBorrowedBooks />}
        {activePage === "overdue" && <OverdueBooks />}
        {activePage === "history" && <BorrowHistory />}
        {activePage === "fineHistory" && <FineHistory />}
      </div>
    </div>
  );
}
export default UserDashboard;