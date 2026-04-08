import { useState } from "react";
import UserSidebar from "../../components/layout/UserSidebar";
import AvailableBooks from "./AvailableBooks";
import MyBorrowedBooks from "./MyBorrowedBooks";
import OverdueBooks from "./OverdueBooks";
import BorrowHistory from "./BorrowHistory";

function UserDashboard() {
  const [activePage, setActivePage] = useState("available");
  return (
    <div className="flex">
      <UserSidebar setActivePage={setActivePage} />
      <div className="flex-1 p-8">
        {activePage === "available" && <AvailableBooks />}
        {activePage === "borrowed" && <MyBorrowedBooks />}
        {activePage === "overdue" && <OverdueBooks />}
        {activePage === "history" && <BorrowHistory />}
      </div>
    </div>
  );
}
export default UserDashboard;