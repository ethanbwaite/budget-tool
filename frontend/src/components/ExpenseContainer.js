// A react component that renders a container of vertical boxes for expenses
import './ExpenseContainer.css';
import { useState } from 'react';
import { Expense } from './Expense';

export function ExpenseContainer(props) {
  const [income, setIncome] = useState(props.income);
  const [expenses, setExpenses] = useState({'Rent': 2000,
                                            'Groceries': 500, 
                                            'Dining': 500, 
                                            'Savings': 500,
                                            'Uncategorized': 3500});

  const expenseChangeCallback = (expenseName, expense) => {
    let newExpenses = {...expenses};
    newExpenses[expenseName] = parseInt(expense);
    setExpenses(newExpenses);
    console.log(expenses);
  }

  return (
    <div className="ExpenseContainer">
      {Object.keys(expenses).map(expense => (
        <Expense 
          key={expense}
          income={income} 
          expenses={expenses}
          expense={expenses[expense]}
          expenseName={expense} 
          height={expenses[expense] / income * 100}
          showSlider={true}
          expenseChangeCallback={expenseChangeCallback}/>
      ))}
    </div>
  );
}