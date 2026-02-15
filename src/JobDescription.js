import { useEffect, useState } from 'react';
import './JobDescription.css';

function JobDescription({ setJobDescription, showError }) {
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
        setError(showError);
        if (showError) {
            setErrorMsg('Please enter Job Description');
        }
    }, [showError])

    return (<div className='container'>
        <div className="textarea-wrapper">
            <label className="textarea-label">Job Descrption</label>
            <textarea onChange={(event) => {
                if (event.target.value === '') {
                    setError(true);
                    setErrorMsg('Job Description Required');
                } else {
                    setError(false);
                    setJobDescription(event.target.value);
                    setErrorMsg('');
                }
            }} className="textarea-field"></textarea>

            <div className="textarea-footer">
                <span><small>Paste Your Job Description here</small>
                    {error && <div style={{ 'color': 'red' }}>{errorMsg}</div>}</span>
            </div>
        </div>
    </div>)
}

export default JobDescription;