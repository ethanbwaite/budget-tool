import './Income.css'
import { useState } from 'react';

export function Income(props) {
  const [income, setIncome] = useState(8000);

  const handleChange = (e) => {
    setIncome(e.target.value);
    props.parentCallback(e.target.value);
  }

  const inputStyle = {
    width: 7rem; //change this to be dynamic
  }

  return (
    <div className='Income-wrapper'>
      <div className="Income">
        <h3 className="gross-income">Gross Income</h3>
        <div className="income-input-wrapper">
          <p className="income-dollar-sign">$</p>
          <input 
            className="income-input" 
            type="number" 
            value={income} 
            onChange={handleChange} 
            style={inputStyle}/>
        </div>
        <h3 className="gross-income">${income*12}/yr</h3>
      </div>
    </div>
  );
}