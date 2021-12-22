import './NewExpenseButton.css';
import { useState } from 'react';

export function NewExpenseButton(props) {

  const handleClick = () => {
    props.onClick(props.expenseIndex);
  }

  return (
    <div className="NewExpenseButton">
      <button className="new-expense-button" onClick={handleClick}/>
    </div>
  );
}