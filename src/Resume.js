import { useEffect, useState, useRef } from 'react';
import './Resume.css';

function Resume({ setResume, showError }) {
    const [selectedFile, setSelectedFile] = useState('');
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
                    padding: "max(20px, 5vw)",
                    textAlign: "center",
                    borderRadius: "10px",
                    cursor: "pointer",
                    width: "100%",
                    maxWidth: "300px",
                    margin: "0 auto",
                    fontSize: "clamp(14px, 3.5vw, 16px)",
                    transition: "all 0.3s ease",
                    backgroundColor: "#f9f9f9"
                }}
                onTouchStart={(e) => e.currentTarget.style.backgroundColor = "#f0f0f0"}
                onTouchEnd={(e) => e.currentTarget.style.backgroundColor = "#f9f9f9"}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#f0f0f0"}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#f9f9f9"}
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
                         setSelectedFile('')
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
                            setSelectedFile('')
                        } else {
                            setError(false);
                            setResume(file);
                            console.log(file.name)
                            setSelectedFile(file.name);
                        }
                    }}
                />
            </div>
            <small style={{ color: '#666', textAlign: 'center' }}>Only pdf/doc files allowed</small>
            {selectedFile && <div>{selectedFile}</div>}
            {error && <div style={{ color: 'red', fontSize: 'clamp(12px, 2.5vw, 13px)', textAlign: 'center', width: '100%' }}>{errorMsg}</div>}
        </div>
    )
}

export default Resume;