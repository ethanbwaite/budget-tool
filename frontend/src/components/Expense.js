import './Expense.css';
import { useState } from 'react';

export function Expense(props) {
  const [income, setIncome] = useState(props.income);
  // const [expenses, setExpenses] = useState(props.expenses);
  const [expense, setExpense] = useState(props.expense);
  const [expenseName, setExpenseName] = useState(props.expenseName);
  const [height, setHeight] = useState(props.height);
  const [showSlider, setShowSlider] = useState(props.showSlider);
  const [maxExpense, setMaxExpense] = useState(props.maxExpense);

  const calculateMaxExpense = () => {
    let max = income;
    for (var key in props.expenses) {
      if (key !== expenseName) {
        max -= props.expenses[key];
      }
    }
    setMaxExpense(max);
    if (expense > max) {
      setExpense(max);
    }
  }


  const divStyle = {
    height: height + '%',
  };

  const slider = () => {
    if (showSlider) {
      return (
        <input type="range" min="0" max="100" value={height} onChange={(e) => setHeight(e.target.value)} />
      );
    }
  };

  const handleExpenseChange = (e) => {
    setExpense(e.target.value);
    calculateMaxExpense();
    setHeight((expense / income) * 100);
    props.expenseChangeCallback(expenseName, e.target.value);
  };

  return (
    <div className="Expense-wrapper" style={divStyle}>
      <div className="Expense">
        <p className="expenseName">{props.expenseName}</p>
        <div className='expense-input-wrapper'>
          <p className="dollar-sign">$</p>
          <input className="expense-input" type="number" value={expense} step={100} max={maxExpense} onChange={handleExpenseChange} />
        </div>
        <p className="expensePerYr">${expense*12}/yr</p>
        {/* {slider()} */}
        {/* <p>{maxExpense}</p> */}
      </div>
    </div>
  );
}