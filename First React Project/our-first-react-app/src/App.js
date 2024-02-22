import {useState} from "react";
import './App.css';
import DisplayCount from "./Components/DisplayCount";

// const tasks = [
//   {
//     name: ""
//   }
// ]

function App() {

  const [count,setCount] = useState(0);

  const increamentHandler = () => {
    setCount(count + 1);
  };

  const decreamentHandler = () => {
    setCount(count - 1);
  }
  return (
    <div className="App">
      <DisplayCount count={count}  />
      <button onClick={increamentHandler}>Increament</button> &nbsp;
      <button onClick={decreamentHandler}>Decreament</button>
    </div>
  );
}

export default App;
