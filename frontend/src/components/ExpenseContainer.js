// A react component that renders a container of vertical boxes for expenses
import './ExpenseContainer.css';
import { useState, useEffect } from 'react';
import { Expense } from './Expense.js';
import { Saving } from './Saving.js'
import { NewExpenseButton } from './NewExpenseButton';

export function ExpenseContainer(props) {
  const [income, setIncome] = useState(props.income);
  const [expenses, setExpenses] = useState({'Rent': 2000,
                                            'Groceries': 500, 
                                            'Dining': 500,
                                            'Uncategorized': 3500});
  const [savings, setSavings] = useState({'Savings': 500});

  const expenseChangeCallback = (expenseName, expense) => {
    let newExpenses = {...expenses};
    newExpenses[expenseName] = parseInt(expense);
    setExpenses(newExpenses);
    console.log(expenses);
  }

  const savingChangeCallback = (savingName, saving) => {
    let newSavings = {...savings};
    newSavings[savingName] = parseInt(saving);
    setSavings(newSavings);
    console.log(savings);
  }

  const deleteCallback = (expenseName) => {
    let newExpenses = {...expenses};
    delete newExpenses[expenseName];
    setExpenses(newExpenses);
  }

  const onNewExpenseClick = () => {
    console.log('New expense button clicked');
    let newExpenses = {...expenses};
    let newExpenseName = 'New Expense ' + Object.keys(newExpenses).length;
    newExpenses[newExpenseName] = 0;
    setExpenses(newExpenses);
  }

  return (
    <div className="ExpenseContainer">
      {Object.keys(expenses).map(expense => (
        <Expense 
          key={expense}
          income={income} 
          expenses={expenses}
          savings={savings}
          expense={expenses[expense]}
          expenseName={expense} 
          height={expenses[expense] / income * 100}
          showSlider={true}
          expenseChangeCallback={expenseChangeCallback}
          deleteCallback={deleteCallback}/>
      ))}
      <NewExpenseButton onClick={onNewExpenseClick}/>
      {Object.keys(savings).map(saving => (
        <Saving 
          key={saving}
          income={income} 
          expenses={expenses}
          savings={savings}
          saving={savings[saving]}
          savingName={saving} 
          height={savings[saving] / income * 100}
          showSlider={true}
          savingChangeCallback={savingChangeCallback}/>
      ))}

    </div>
  );
}