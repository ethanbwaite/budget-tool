import './Tax.css';
import { useEffect, useState } from 'react';
import { FILING_STATUS, STATE_ABBREVIATIONS } from '../Constants.js';

export function Tax(props) {
  const [income, setIncome] = useState(props.income);
  const [tax, setTax] = useState(0);
  const [taxDisplayName, setTaxDisplayName] = useState(props.taxDisplayName);
  const [height, setHeight] = useState(props.height);
  const [filingStatus, setFilingStatus] = useState(props.filingStatus);
  const [state, setState] = useState(props.state);



  // Calculate the number of digits in an integer
  const numDigits = (num) => {
    return Math.floor(Math.log10(num)) + 1;
  }

  const divStyle = {
    height: height + '%',
  };

  const handleStateChange = (e) => {
    setState(e.target.value);
  }

  const handleFilingChange = (e) => {
    setFilingStatus(e.target.value);
  }

  const calculateTax = () => {
    // POST request to taxee.io API
    const requestOptions = {
      method: 'POST',
      mode: 'cors',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJBUElfS0VZX01BTkFHRVIiLCJodHRwOi8vdGF4ZWUuaW8vdXNlcl9pZCI6IjYxYzJhOGI0YjAxOTFiMzk5MTc5NWI3NiIsImh0dHA6Ly90YXhlZS5pby9zY29wZXMiOlsiYXBpIl0sImlhdCI6MTY0MDE0NzEyNH0.KnLE2wF__5-dds_fDaZEBgrhZTDGxteKM5YUvp8c1jg',
     },
      body: JSON.stringify({ 
        pay_rate: props.income * 12,
        filing_status: filingStatus.toLowerCase(),
        state: state
      })
    };
    console.log(requestOptions);
    fetch('https://taxee.io/api/v2/calculate/2020', requestOptions)
      .then(response => response.json())
      .then(data => setTax(
        data['annual']['federal']['amount'] + data['annual']['state']['amount'] + data['annual']['fica']['amount']
      ))
      .catch(error => console.log('error', error));

      setHeight(((tax / 12) / income) * 100);
      return tax;
  }

  useEffect(() => {
    calculateTax();
    props.taxChangeCallback(Math.round(tax / 12));
  });

  return (
    <div className="Tax-wrapper" style={divStyle}>
      <div className="Tax">
        {/* <button onClick={calculateTax}>call api</button> */}
        <div className="tax-text-block">
          <p className="tax-header">Income Tax</p>
          <p className="tax-amount" >${Math.round(tax / 12)}</p>
          <p className="taxPerYr">${tax.toLocaleString('en-US')}/yr</p>
        </div>
        <div className="tax-vertical-block">
          <div className="tax-text-block">
            <p className="tax-header">State</p>
            <select className="tax-select" onChange={handleStateChange}>
              {STATE_ABBREVIATIONS.map((abbreviation, index) => (
                <option key={index} value={abbreviation}>{abbreviation}</option>
              ))}
            </select>
          </div>
          <div className="tax-text-block">
            <p className="tax-header">Filing Status</p>
            <select className="tax-select" onChange={handleFilingChange}>
              {Object.keys(FILING_STATUS).map((filing, index) => (
                <option key={index} value={filing}>{filing}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}