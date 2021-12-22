import './Income.css'
import { useState } from 'react';

export function Income(props) {
  const [income, setIncome] = useState(8000);

  const handleChange = (e) => {
    setIncome(e.target.value);
    props.parentCallback(e.target.value);
  }

  // Calculate the number of digits in an integer
  const numDigits = (num) => {
    return Math.floor(Math.log10(num)) + 1;
  }

  const inputStyle = {
    // Dynamic width that scales with increasing number of digits
    width: (3 + numDigits(income) + ((numDigits(income)-4)*0.5)).toString() + 'rem' 
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
            step={100}
            onChange={handleChange} 
            style={inputStyle}/>
        </div>
        <h3 className="gross-income">${(income*12).toLocaleString('en-US')}/yr</h3>
      </div>
    </div>
  );
}