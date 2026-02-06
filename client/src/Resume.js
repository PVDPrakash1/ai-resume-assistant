import './Resume.css';

function Resume(){
    return(
        <div className="container">
            <h4>Upload Your CV:-</h4>
            <input 
                className="resume-input" 
                type="file" 
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
                        alert("Only PDF or Word files are allowed!");
                        e.target.value = "";
                    }
                }} 
            />
            <small>Only pdf/doc files allowed</small>
        </div>
    )
}

export default Resume;