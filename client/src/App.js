import { useState } from 'react';
import axios from 'axios';

import logo from './logo.svg';
import './App.css';
import Resume from './Resume';
import JobDescription from './JobDescription';
import CircleProgress from './CircleProgress';
import aiLoader from './ai-loader.gif';

function App() {
  const [resume, setResume] = useState(null);
  const [jobDescription, setJobDescription] = useState('');

  const [resumeError, setResumeError] = useState(false);
  const [jobDescriptionError, setJobDescriptionError] = useState(false);

  const [analysedData, setAnalysedData] = useState(null);
  const [showLoader, setShowLoader] = useState(false);


  const analysResume = async () => {
     setAnalysedData(null);
    setShowLoader(true);
    if (resume === null) {
      setResumeError(true);
    } else {
      setResumeError(false);
    }

    if (jobDescription === '') {
      setJobDescriptionError(true);
    } else {
      setJobDescriptionError(false);
    }

    if (resume !== null && jobDescription !== '') {
      const data = new FormData()
      data.append('file', resume)
      data.append('job_description', jobDescription)

      axios.post(`${process.env.REACT_APP_API_BASE_URL}/analyze-resume`, data).then(response => {
         setAnalysedData(response.data); // Handle successful upload response
         setShowLoader(false);
        })
        .catch(error => {
          console.error(error); // Handle upload errors
        });
    }
  }

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
          <div><Resume setResume={setResume} showError={resumeError} /></div>
          <div><JobDescription setJobDescription={setJobDescription} showError={jobDescriptionError} /></div>
          <div style={{ textAlign: "center" }}><button onClick={() => analysResume()} class='gradient-btn'>Analyze</button></div>
        </div>
        <div className='ai-assitant-output'>
          {showLoader && <img src={aiLoader} alt='AI Loader' />}
          {analysedData && analysedData.score && 
           <>
           <div><CircleProgress percent={analysedData.score} /></div>
            <div className='aiResponse'><strong>Ai Suggestions:-</strong><p dangerouslySetInnerHTML={{__html:analysedData.aiSuggestions.replace(/\n/g, "<br/>")}} /></div>
            
            <h3>Matched Skills</h3> 
            <div className='tags'>{analysedData.matchedSkills.map((skill) => <span className='tag'>{skill}</span>)}</div>
            <h3>Missing Skills</h3>
             <div className='tags'>{analysedData.missedSkills.map((skill) => <span className='tag'>{skill}</span>)}</div>
           </>
          }
        </div>
      </div>
    </div>
  );
}

export default App;
