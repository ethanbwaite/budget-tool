import './Saving.css';
import { useState, useEffect, useCallback } from 'react';

export function Saving(props) {
  const [income, setIncome] = useState(props.income);
  const [saving, setSaving] = useState(props.saving);
  const [savingName, setSavingName] = useState(props.savingName);
  const [height, setHeight] = useState(props.height);
  const [showSlider, setShowSlider] = useState(props.showSlider);
  const [maxSaving, setMaxSaving] = useState(props.maxSaving);
  const [interestRate, setInterestRate] = useState(7);
  const [timePeriod, setTimePeriod] = useState(15);
  const [futureValue, setFutureValue] = useState(0);

  const calculateFutureValue = () => {
    // Calculate series compound amount
    let monthlyRate = interestRate / 12;
    let newFutureValue = 0;
    for (let i = 0; i < timePeriod * 12; i++) {
      newFutureValue *= (1 + monthlyRate / 100);
      newFutureValue += saving;
    }
    setFutureValue(Math.round(newFutureValue));
    // console.log(timePeriod);
  };

  useEffect(() => {
    calculateFutureValue();
  });

  const calculateMaxSaving = () => {
    let max = props.income - parseInt(props.tax);
    for (var key in props.expenses) {
      max -= props.expenses[key];
    }
    for (key in props.savings) {
      if (key !== savingName) {
        max -= props.savings[key];
      }
    }
    setMaxSaving(max);
    if (saving > max) {
      setSaving(max);
    }
  }

    // Calculate the number of digits in an integer
    const numDigits = (num) => {
    return Math.floor(Math.log10(num)) + 1;
  }

  const inputStyle = (baseDigits) => {
    // Dynamic width that scales with increasing number of digits
    return {
      width: (baseDigits + numDigits(saving) + ((numDigits(saving)-4)*0.0)).toString() + 'rem' 
    }
  }

  const divStyle = {
    height: height + '%',
  };

  const slider = () => {
    if (showSlider) {
      return (
        <input type="range" min="0" max="100" value={height} onChange={(e) => setHeight(e.target.value)} />
      );
    }
  };

  const handleSavingChange = (e) => {
    let newSaving = parseInt(e.target.value);
    calculateMaxSaving();
    setSaving(newSaving);
    setHeight((saving / income) * 100);
    props.savingChangeCallback(savingName, newSaving);
    // calculateFutureValue();
  };

  const handleInterestRateChange = (e) => {
    setInterestRate(e.target.value);
    // calculateFutureValue();
  }

  const handleTimePeriodChange = (e) => {
    setTimePeriod(e.target.value);
    // calculateFutureValue();
  }

  return (
    <div className="Saving-wrapper" style={divStyle}>
      <div className="Saving">
        <div className='saving-text-block'>
          <p className="savingName">{props.savingName}</p>
          <div className='saving-input-wrapper'>
            <p className="dollar-sign">$</p>
            <input 
              className="saving-input" 
              type="number" 
              value={saving} 
              step={100} 
              min={0}
              max={maxSaving} 
              onFocus={() => calculateMaxSaving()}
              onChange={handleSavingChange} 
              style={inputStyle(1)} />
          </div>
          <p className="savingPerYr">${(saving*12).toLocaleString('en-US')}/yr</p>
        </div>
        <div className="saving-text-block">
          <p className="saving-rate-name">Interest Rate</p>
          <div className='saving-input-wrapper'>
            <input 
              className="saving-rate-input" 
              type="number" 
              value={interestRate} 
              step={0.1} 
              min={0}
              max={100} 
              onChange={handleInterestRateChange}
              style={inputStyle(1)} />
              <p className="percent-sign">%</p>
          </div>
        </div>
        <div className="saving-text-block">
          <p className="saving-rate-name">Time Period</p>
          <div className='saving-input-wrapper'>
            <input 
              className="saving-rate-input" 
              type="number" 
              value={timePeriod} 
              step={1} 
              min={0}
              max={100} 
              onChange={handleTimePeriodChange}
              style={inputStyle(0)} />
              <p className="percent-sign">yrs</p>
          </div>
        </div>
        <div className="saving-text-block">
          <p className="saving-rate-name">Value</p>
          <div className='saving-input-wrapper'>
            <p className="future-value">${futureValue.toLocaleString('en-US')}</p>
          </div>
        </div>
      </div>
    </div>
  );
}