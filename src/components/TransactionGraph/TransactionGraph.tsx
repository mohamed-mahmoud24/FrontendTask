import { useState } from "react";
import { Line, Bar , Pie, PolarArea } from "react-chartjs-2";
import "chart.js/auto";

interface Transaction {
    id: number;
    customer_id: number;
    date: string;
    amount: number;
}

interface Props {
    transactions: Transaction[];
}

const TransactionGraph: React.FC<Props> = ({ transactions }) => {
    const [chartType, setChartType] = useState("line");
    const data = {
        labels: transactions.map((transaction) => transaction.date),
        datasets: [
            {
                label: "Transactions",
                data: transactions.map((transaction) => transaction.amount),
                fill: false,
            },
        ],
    };

    return (
        <div
            style={{
                maxWidth: "700px",
                margin: "3rem auto",
                textAlign: "center",
            }}
        >
                <h3>Chose Chart Type </h3>
            <div className="chart-type">
                <button className={chartType === "line" ? "active" : ""} onClick={() => setChartType("line")}>Line</button>
                <button className={chartType === "bar" ? "active" : ""} onClick={() => setChartType("bar")}>Bar</button>
                <button className={chartType === "polar" ? "active" : ""} onClick={() => setChartType("polar")}>Polar Area</button>
                <button className={chartType === "pie" ? "active" : ""} onClick={() => setChartType("pie")}>Pie</button>

            </div>
            <h2>Transaction Graph</h2>
            {chartType === "line" && <Line data={data} /> || chartType === "bar" && <Bar data={data} /> || chartType === "polar" && <PolarArea data={data} /> || chartType === "pie" && <Pie data={data} /> }
        </div>
    );
};

export default TransactionGraph;
