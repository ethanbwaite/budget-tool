// A react component that renders a container of vertical boxes for expenses
import './ExpenseContainer.css';
import { useState } from 'react';
import { Expense } from './Expense';

export function ExpenseContainer() {
  const [expenses, setExpenses] = useState(['Rent', 'Groceries', 'Dining', 'Savings']);

  return (
    <div className="ExpenseContainer">
      {expenses.map(expense => (
        <Expense expense={expense} showSlider={true}/>
      ))}
      <Expense expense={'Uncategorized'} height={100} showSlider={false}/>
    </div>
  );
}