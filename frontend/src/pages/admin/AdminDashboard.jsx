import { useEffect, useState } from "react";
import Sidebar from "../../components/layout/Sidebar";
import StatsCards from "../../components/dashboard/StatsCards";
import IssuedChart from "../../components/dashboard/IssuedChart";
import { getDashboardStats } from "../../services/dashboardService";

function AdminDashboard(){

const [stats,setStats] = useState({
total_books:0,
total_users:0,
issued_books:0,
returned_books:0
});

const [chartData,setChartData] = useState([]);

useEffect(()=>{
loadDashboard();
},[]);

const loadDashboard = async () => {

const data = await getDashboardStats();

setStats(data);

setChartData([
{ name:"Issued", value:data.issued_books },
{ name:"Returned", value:data.returned_books }
]);

};

return(

<div className="flex min-h-screen bg-gray-100">

<Sidebar/>

<div className="flex-1 p-8">

<h1 className="text-3xl font-bold mb-8">
Dashboard
</h1>

<StatsCards stats={stats}/>

<div className="grid grid-cols-2 gap-6">

<IssuedChart chartData={chartData}/>

</div>

</div>

</div>

);

}

export default AdminDashboard;