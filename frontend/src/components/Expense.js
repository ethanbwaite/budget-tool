import './Expense.css';
import { useState } from 'react';

export function Expense(props) {
  const [height, setHeight] = useState(props.height);
  const [showSlider, setShowSlider] = useState(props.showSlider);

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

  return (
    <div className="Expense" style={divStyle}>
      <p>{props.expense}</p>
      {slider()}
    </div>
  );
}