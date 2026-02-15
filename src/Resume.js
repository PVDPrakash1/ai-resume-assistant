import { useEffect, useState, useRef } from 'react';
import './Resume.css';

function Resume({ setResume, showError }) {
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const fileInputRef = useRef(null);

    useEffect(() => {
        setError(showError);
        if (showError) {
            setErrorMsg('Please upload your CV');
        }
    }, [showError])
    return (
        <div className="container">
            <div
                onClick={() => fileInputRef.current.click()}
                style={{
                    border: "2px dashed #aaa",
                    padding: "40px",
                    textAlign: "center",
                    borderRadius: "10px",
                    cursor: "pointer",
                    width: "300px",
                    margin: "20px auto"
                }}
            >
                Upload your Resume/CV
                <input
                    className="resume-input"
                    type="file"
                    name="file"
                    ref={fileInputRef}
                    style={{display: 'none'}}
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => {
                        const file = e.target.files[0];
                        if (!file) return;

                        const allowedTypes = [
                            "application/pdf",
                            "application/msword",
                            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                        ];

                        if (!allowedTypes.includes(file.type)) {
                            setError(true);
                            setErrorMsg("Only PDF or Word files are allowed!");
                            e.target.value = "";
                            setResume('');
                        } else {
                            setError(false);
                            setResume(file);
                        }
                    }}
                />
            </div>
            <small>Only pdf/doc files allowed</small>
            {error && <div style={{ 'color': 'red' }}>{errorMsg}</div>}
        </div>
    )
}

export default Resume;