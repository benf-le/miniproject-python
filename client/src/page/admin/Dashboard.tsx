import DoughnutChart from "../../components/admin/DoughnutChart.tsx";
import HeaderAdmin from "../../components/admin/HeaderAdmin.tsx";
import StockEmpty from "./StockEmpty.tsx";
import Stock from "./Stock.tsx";


function Dashboard() {


    return (
        <>
            <HeaderAdmin/>
            {/** ---------------------- User source channels table  ------------------------- */}
            <div className="grid lg:grid-cols-3 mt-4 px-10 grid-cols-2 gap-6">
                <DoughnutChart />
                <Stock />
                <StockEmpty />
            </div>

        </>
    );
}

export default Dashboard;
