import reactLogo from "./assets/react.svg";
import "./App.css";

function App() {
  function scanPage() {
    console.log("init scan");

    //scan DOM that the extension is operating on
  }

  return (
    <>
      <div>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>AI Recipe Scrubber</h1>
      <div className="card">
        <button onClick={scanPage}>Scan page</button>
        <div>Confidence of recipe page - high</div>
      </div>
    </>
  );
}

export default App;
