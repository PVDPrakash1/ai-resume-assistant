import { useState } from 'react';
import axios from 'axios';

import logo from './ai-logo.png';
import footerLogo from './ai-logo.png';
import './App.css';
import Resume from './Resume';
import JobDescription from './JobDescription';
import CircleProgress from './CircleProgress';
import aiLoader from './ai-loader.gif';

const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const popupStyle = {
  background: "#fff",
  padding: "30px",
  borderRadius: "10px",
  width: "300px",
  position: "relative",
  textAlign: "center",
};


function App() {
  const [resume, setResume] = useState(null);
  const [jobDescription, setJobDescription] = useState('');

  const [resumeError, setResumeError] = useState(false);
  const [jobDescriptionError, setJobDescriptionError] = useState(false);

  const [analysedData, setAnalysedData] = useState(null);
  const [generateResumeData, setGenerateResumeData] = useState('');
  const [showLoader, setShowLoader] = useState(false);
  const [showPopup, setShowPopup] = useState(false);



  const analyseResume = async () => {
     setAnalysedData(null);
     setGenerateResumeData('');
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
       setShowLoader(true);
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
    }else{
       setShowLoader(false);
    }
  }

  const generateResume = async () => {
     setAnalysedData(null);
     setGenerateResumeData('');
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
       setShowLoader(true);
      const data = new FormData()
      data.append('file', resume)
      data.append('job_description', jobDescription)

      axios.post(`${process.env.REACT_APP_API_BASE_URL}/generate-resume`, data).then(response => {
         setGenerateResumeData(response.data); // Handle successful upload response
         setShowLoader(false);
        })
        .catch(error => {
          console.error(error); // Handle upload errors
        });
    }else{
       setShowLoader(false);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <a
          className="App-link"
          href="/"
          rel="noopener noreferrer"
        >
          <img src={logo} className="App-logo" alt="logo" />
        </a>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault(); // prevent page reload
            setShowPopup(true);
          }}
        >
          Privacy Notes
       </a>
      </header>
      <div className='ai-assitant'>
        <div className='ai-assitant-input'>
          <div style={{ width: '100%' }}><Resume setResume={setResume} showError={resumeError} /></div>
          <div style={{ width: '100%' }}><JobDescription setJobDescription={setJobDescription} showError={jobDescriptionError} /></div>
          <div className='buttons'>
            <div style={{ width: '100%' }}><button onClick={() => analyseResume()} className='gradient-btn'>Analyze Resume</button></div>
            <div style={{ width: '100%' }}><button onClick={() => generateResume()} className='gradient-btn'>Generate ATS-Optimised Resume</button></div>
          </div>
        </div>
        <div className='ai-assitant-output'>
          {showLoader && <img src={aiLoader} alt='AI Loader' />}
          {analysedData && analysedData.score && 
           <>
              <div><CircleProgress percent={analysedData.score} /></div>
            
              <h3>Matched Skills</h3> 
              <div className='tags'>{analysedData.matchedSkills.map((skill) => <span className='tag'>{skill}</span>)}</div>
              <h3>Missing Skills</h3>
              <div className='tags'>{analysedData.missedSkills.map((skill) => <span className='tag'>{skill}</span>)}</div>

              <div className='aiResponse'><strong>Ai Suggestions:-</strong><p dangerouslySetInnerHTML={{__html:analysedData.aiSuggestions.replace('```html', '')}} /></div>
            </>
          }
          {generateResumeData && 
           <>
              <div dangerouslySetInnerHTML={{__html: generateResumeData.replace('```html', '')}}></div>
            </>
          }
        </div>
      </div>
       {showPopup && (
        <div style={overlayStyle}>
          <div style={popupStyle}>
            <h2>🔒 Your Privacy Matters</h2>
            <ul style={{ textAlign: 'left', margin: '20px 0' }}>
              <li>Your resume is processed securely.</li>
              <li>We do NOT store your CV permanently.</li>
              <li>Files are automatically deleted after analysis.</li>
              <li>No personal data is shared with third parties.</li>
              <li>AI is used only to improve your resume and generate suggestions.</li>
            </ul>
            <p>For questions: <a href="mailto:pvdprakash.developer@gmail.com">pvdprakash.developer@gmail.com</a></p>
            <button onClick={() => setShowPopup(false)} style={{ position: 'absolute', top: '10px', right: '10px', background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer' }}>
              ✕
            </button>
          </div>
        </div>
      )}
      <footer className="App-footer">
        <img src={footerLogo} className="footer-logo" alt="logo" />
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault(); // prevent page reload
            setShowPopup(true);
          }}
        >
          Privacy Notes
       </a>
      </footer>
    </div>
  );
}

export default App;
