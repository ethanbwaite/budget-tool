// A react component that renders a container of vertical boxes for expenses
import './ExpenseContainer.css';
import React, { useState, useEffect } from 'react';
import { Expense } from './Expense.js';
import { Saving } from './Saving.js';
import { Tax } from './Tax.js';
import { NewExpenseButton } from './NewExpenseButton';

export function ExpenseContainer(props) {
  const [income, setIncome] = useState(props.income);
  const [tax, setTax] = useState(props.tax);
  const [expenses, setExpenses] = useState({'Rent': 2000,
                                            'Groceries': 500, 
                                            'Dining': 500,
                                            'Uncategorized': 3500});
  const [expenseNames, setExpenseNames] = useState(['Rent', 'Groceries', 'Dining', 'Uncategorized']);                   
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

  const deleteCallback = (expenseName, expenseIndex) => {
    let newExpenses = {...expenses};
    let newExpenseNames = [...expenseNames];
    newExpenseNames.splice(expenseIndex, 1);
    console.log(newExpenseNames);
    delete newExpenses[expenseName];
    setExpenses(newExpenses);
    setExpenseNames(newExpenseNames);
  }

  const onNewExpenseClick = (expenseIndex) => {
    console.log('New expense button clicked');
    let newExpenses = {...expenses};
    let newExpenseName = 'New Expense ' + Object.keys(newExpenses).length;
    let newExpenseNames = [...expenseNames];
    newExpenseNames.splice(expenseIndex + 1, 0, newExpenseName);
    newExpenses[newExpenseName] = 0;
    setExpenses(newExpenses);
    setExpenseNames(newExpenseNames);
  }

  useEffect (() => {
    console.log('ExpenseContainer useEffect');
    setIncome(props.income);
  }, [props.income]);

  return (
    <div className="ExpenseContainer">
      <Tax 
        income={income} 
        taxDisplayName='Income Tax'
        state='WA'
        filingStatus='Single'
        taxChangeCallback={(newTax) => {
          console.log('Tax change callback');
          setTax(newTax);
        }}
      />
      {expenseNames.map((expense, expenseIndex) => (
        <React.Fragment key={'fragment-' + expenseIndex}>
          <Expense 
            key={expense}
            income={income} 
            tax={tax}
            expenses={expenses}
            savings={savings}
            expense={expenses[expense]}
            expenseName={expense} 
            expenseIndex={expenseIndex}
            height={expenses[expense] / income * 100}
            showSlider={true}
            expenseChangeCallback={expenseChangeCallback}
            deleteCallback={deleteCallback}/>
            <NewExpenseButton 
              key={'new-expense-button-' + expenseIndex}
              expenseIndex={expenseIndex} 
              onClick={onNewExpenseClick}/>
        </React.Fragment>
      ))}
      {Object.keys(savings).map(saving => (
        <Saving 
          key={saving}
          income={income} 
          tax={tax}
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