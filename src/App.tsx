import React, { useState } from 'react';
import CustomerTable from './components/CustomerTable/CustomerTable';
import TransactionGraph from './components/TransactionGraph/TransactionGraph';
import axiosInstance from './config/axios.config';

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

const App: React.FC = () => {
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  React.useEffect(() => {
    if (selectedCustomer) {
      axiosInstance.get(`transactions?customer_id=${selectedCustomer.id}`)
        .then(response => setTransactions(response.data));
    }
  }, [selectedCustomer]);

  return (
    <div className="App">
      <CustomerTable setSelectedCustomer={setSelectedCustomer} selectedCustomer={selectedCustomer} />
      {selectedCustomer && <TransactionGraph transactions={transactions} />}
    </div>
  );
};

export default App;
