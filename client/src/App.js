import logo from './logo.svg';
import './App.css';
import Resume from './Resume';
import JobDescription from './JobDescription';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          AI Resume Assistant
        </a>
      </header>
      <div className='ai-assitant'>
        <div className='ai-assitant-input'>
          <div><Resume /></div>
          <div><JobDescription /></div>
          <button class='ai-analyize-button'>Analyze</button>
        </div>
        <div className='ai-assitant-output'>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
}

export default App;
