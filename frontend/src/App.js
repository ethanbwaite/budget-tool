import './App.css';
import { ExpenseContainer } from './components/ExpenseContainer';
import { Income } from './components/Income.js';
import { useState } from 'react';
import { IntermediateContainer } from './components/IntermediateContainer';

function App() {
  const [income, setIncome] = useState(8000);
  const [tax, setTax] = useState(0);

  const parentCallback = (income) => {
    setIncome(income);
    console.log(income);
  }

  const taxChangeCallback = (newTax) => {
    setTax(newTax);
  }

  return (
    <div className="App">
      <ExpenseContainer tax={tax} income={income}/>
      <IntermediateContainer taxChangeCallback={taxChangeCallback} income={income}/>
      <Income parentCallback={parentCallback}/>
    </div>
  );
}

export default App;
