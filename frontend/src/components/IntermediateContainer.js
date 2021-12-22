import './IntermediateContainer.css';
import { useState, useEffect } from 'react';
import { Tax } from './Tax.js';
import { NetIncome } from './NetIncome';

export function IntermediateContainer(props) {
  const [income, setIncome] = useState(props.income);
  const [tax, setTax] = useState(0);
  const [preTaxSavings, setPreTaxSavings] = useState(props.preTaxSavings);
  const [netIncome, setNetIncome] = useState(props.netIncome);

  useEffect (() => {
    console.log('ExpenseContainer useEffect');
    setIncome(props.income);
    props.taxChangeCallback(tax);
  }, [props.income]);

  return (
    <div className="IntermediateContainer">
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
      <NetIncome
        income={income}
        tax={tax}
        preTaxSavings={preTaxSavings}
        netIncome={netIncome}
      />
    </div>
  );
}