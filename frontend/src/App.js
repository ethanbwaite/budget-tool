import './App.css';
import { ExpenseContainer } from './components/ExpenseContainer';
import { Income } from './components/Income.js';

function App() {
  return (
    <div className="App">
      <Income />
      <ExpenseContainer />
    </div>
  );
}

export default App;
