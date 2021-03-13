import "./App.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

function App() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  console.log(state);
  return (
    <div className="App">
      Total: {state}
      <button onClick={() => dispatch({ type: "INCREMENTAR" })}>
        Increamentar
      </button>
    </div>
  );
}

export default App;
