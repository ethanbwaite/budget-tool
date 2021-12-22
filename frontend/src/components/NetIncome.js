import './NetIncome.css';
import { useEffect, useState } from 'react';

export function NetIncome(props) {
  const [income, setIncome] = useState(props.income);
  const [netIncome, setNetIncome] = useState(props.netIncome);
  const [tax, setTax] = useState(props.tax);
  const [height, setHeight] = useState(0);

  const divStyle = {
    height: height + '%',
  };

  useEffect (() => {
    console.log('NetIncome useEffect');
    setIncome(props.income);
    setNetIncome(props.income - props.tax);
    setTax(props.tax);
    setHeight((netIncome / income) * 100);
  }, [props.tax, props.income, props.netIncome]);

  return (
    <div className="NetIncome-wrapper" style={divStyle}>
      <div className="NetIncome">
        <div className="tax-text-block">
          <p className="tax-header" >Net Income</p>
          <div className='expense-input-wrapper'>
            <p className="dollar-sign">$</p>
            <p className="net-income-amount">{income - tax}</p>
          </div>
          <p className="expensePerYr">${((income - tax) * 12).toLocaleString('en-US')}/yr</p>
        </div>
      </div>
    </div>
  );
}