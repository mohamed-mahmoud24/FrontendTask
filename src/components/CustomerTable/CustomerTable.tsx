import React, { useState, useEffect } from "react";
import axiosInstance from "../../config/axios.config";

interface Customer {
    id: number;
    name: string;
}

interface Transaction {
    id: number;
    customer_id: number;
    date: string;
    amount: number;
}

interface Props {
    setSelectedCustomer: (customer: Customer) => void;
    selectedCustomer: Customer | null;
}

const CustomerTable: React.FC<Props> = ({
    setSelectedCustomer,
    selectedCustomer,
}) => {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [filter, setFilter] = useState("");
    const [filterByTransction, setFilterByTransction] = useState("0");

    useEffect(() => {
        axiosInstance
            .get("customers")
            .then((response) => setCustomers(response.data));

            axiosInstance
            .get("transactions")
            .then((response) => setTransactions(response.data));
    }, []);

    const filteredTransactions = transactions.filter(
        (transaction) =>
            transaction.amount >= parseInt(filterByTransction || "0")
    );

    const filteredCustomers = customers.filter(
        (customer) =>
            customer.name.toLowerCase().includes(filter.toLowerCase()) &&
            filteredTransactions.some(
                (transaction) => transaction.customer_id === customer.id
            )
    );

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilter(e.target.value);
    };

    const handleFilterByTransctionChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setFilterByTransction(e.target.value);
    };

    const handleCustomerClick = (customer: Customer) => {
        setSelectedCustomer(customer);
    };

    return (
        <div>
            <div className="filter">
                <input
                    type="text"
                    placeholder="filter by name"
                    value={filter}
                    onChange={handleFilterChange}
                />
                <input
                    type="number"
                    placeholder="filter by transaction"
                    value={filterByTransction}
                    onChange={handleFilterByTransctionChange}
                />
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>All Transactions</th>
                        <th>Total Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredCustomers.map((customer) => (
                        <tr
                            key={customer.id}
                            onClick={() => handleCustomerClick(customer)}
                            className={
                                selectedCustomer === customer ? "selected" : ""
                            }
                        >
                            <td>{customer.id}</td>
                            <td>{customer.name}</td>
                            <td>
                                {transactions
                                    .filter(
                                        (transaction) =>
                                            transaction.customer_id ==
                                            customer.id
                                    )
                                    .map((transactions) => transactions.amount)
                                    .join(", ")}
                            </td>
                            <td>
                                {transactions
                                    .filter(
                                        (transaction) =>
                                            transaction.customer_id ==
                                            customer.id
                                    )
                                    .map((transaction) => transaction.amount)
                                    .reduce((a, b) => a + b, 0)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CustomerTable;
