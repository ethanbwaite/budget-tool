import './App.css';
import { ExpenseContainer } from './components/ExpenseContainer';
import { Income } from './components/Income.js';
import { useState } from 'react';

function App() {
  const [income, setIncome] = useState(8000);

  const parentCallback = (income) => {
    setIncome(income);
  }

  return (
    <div className="App">
      <ExpenseContainer income={income}/>
      <Income parentCallback={parentCallback}/>
    </div>
  );
}

export default App;
