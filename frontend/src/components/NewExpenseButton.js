import './NewExpenseButton.css';
import { useState } from 'react';

export function NewExpenseButton(props) {

  return (
    <div className="NewExpenseButton">
      <button className="new-expense-button" onClick={props.onClick}/>
    </div>
  );
}