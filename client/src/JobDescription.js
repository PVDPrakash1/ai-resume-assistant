import './JobDescription.css';

function JobDescription(){
    return(<div className='container'>
        <h4>Job Description:-</h4>
        <textarea className="job-description-textarea"></textarea>
        <small>Paste Your Job Description here</small>
    </div>)
}

export default JobDescription;