import './Expense.css';
import { useState } from 'react';

export function Expense(props) {
  const [income, setIncome] = useState(props.income);
  // const [expenses, setExpenses] = useState(props.expenses);
  const [expense, setExpense] = useState(props.expense);
  const [expenseName, setExpenseName] = useState(props.expenseName);
  const [expenseDisplayName, setExpenseDisplayName] = useState(props.expenseName);
  const [height, setHeight] = useState(props.height);
  const [maxExpense, setMaxExpense] = useState(props.maxExpense);

  const calculateMaxExpense = () => {
    let max = props.income - parseInt(props.tax);
    console.log('Income ' + income);
    console.log('Tax' + props.tax);
    for (var key in props.savings) {
      max -= props.savings[key];
    }
    for (key in props.expenses) {
      if (key !== expenseName) {
        max -= props.expenses[key];
      }
    }
    setMaxExpense(max);
    if (expense > max) {
      setExpense(max);
    }
    console.log('Max expense ' + max);
  }

   // Calculate the number of digits in an integer
   const numDigits = (num) => {
    return Math.floor(Math.log10(num)) + 1;
  }

  const inputStyle = {
    // Dynamic width that scales with increasing number of digits
    width: (1 + numDigits(expense) + ((numDigits(expense)-4)*0.0)).toString() + 'rem' 
  }

  const divStyle = {
    height: height + '%',
  };

  const handleNameChange = (e) => {
    setExpenseDisplayName(e.target.value);
  }

  const handleExpenseChange = (e) => {
    calculateMaxExpense();
    setExpense(e.target.value);
    setHeight((expense / income) * 100);
    props.expenseChangeCallback(expenseName, e.target.value);
  };

  const handleDelete = () => {
    props.deleteCallback(expenseName, props.expenseIndex);
  };

  return (
    <div className="Expense-wrapper" style={divStyle}>
      <div className="Expense">
        
        <div className="expense-text-block">
          <input className="expenseName" value={expenseDisplayName} onChange={handleNameChange}/>
          <div className='expense-input-wrapper'>
            <p className="dollar-sign">$</p>
            <input 
              className="expense-input" 
              type="number" 
              value={expense} 
              step={100} 
              min={0}
              max={maxExpense} 
              onFocus={() => calculateMaxExpense()}
              onChange={handleExpenseChange} 
              style={inputStyle} />
          </div>
          <p className="expensePerYr">${(expense*12).toLocaleString('en-US')}/yr</p>
        </div>
        <button className="delete-expense" onClick={handleDelete}>✕</button>
      </div>
    </div>
  );
}