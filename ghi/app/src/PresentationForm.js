import React, {useState, useEffect} from 'react';

function PresentationForm () {
  const [conferences, setConferences] = useState([])

  const [presenterName, setPresenterName] = useState("")
  const [presenterEmail, setPresenterEmail] = useState("")
  const [companyName, setCompanyName] = useState("")
  const [title, setTitle] = useState("")
  const [synopsis, setSynopsis] = useState("")
  const [conference, setConference] = useState("")

  const getData = async () => {
    const url = 'http://localhost:8000/api/conferences/';
    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      setConferences(data.conferences);
    }
  }

  useEffect(()=> {
    getData();
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {};
    data.presenter_name = presenterName;
    data.presenter_email = presenterEmail;
    data.company_name = companyName;
    data.title = title;
    data.synopsis = synopsis;
    data.conference = conference;

    const url = `http://localhost:8000/api/conferences/${conference}/presentations/`;

    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await fetch(url, fetchConfig);

    if (response.ok) {
      setPresenterName("");
      setPresenterEmail("");
      setCompanyName("");
      setTitle("");
      setSynopsis("");
      setConference("");
    }
  }

  const handlePresenterNameChange = (e) => {
    setPresenterName(e.target.value);
  }

  const handlePresenterEmailChange = (e) => {
    setPresenterEmail(e.target.value);
  }

  const handleCompanyNameChange = (e) => {
    setCompanyName(e.target.value);
  }

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  }

  const handleSynopsisChange = (e) => {
    setSynopsis(e.target.value)
  }

  const handleConferenceChange = (e) => {
    setConference(e.target.value)
  }

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Create a new presentation</h1>
          <form onSubmit={handleSubmit} id="create-presentation-form">
            <div className="form-floating mb-3">
              <input onChange={handlePresenterNameChange} value={presenterName} placeholder="Presenter name" required name="presenter_name" className="form-control" />
              <label htmlFor="presenter_name">Presenter name</label>
            </div>
            <div className="form-floating mb-3">
              <input onChange={handlePresenterEmailChange} value={presenterEmail} placeholder="Presenter email" required name="presenter_email" type="email" id="presenter_email" className="form-control" />
              <label htmlFor="presenter_email">Presenter email</label>
            </div>
            <div className="form-floating mb-3">
              <input onChange={handleCompanyNameChange} value={companyName} placeholder="Company name" type="text" name="company_name" id="company_name" className="form-control" />
              <label htmlFor="company_name">Company name</label>
            </div>
            <div className="form-floating mb-3">
              <input onChange={handleTitleChange} value={title} placeholder="Title" required name="title" type="text" id="title" className="form-control" />
              <label htmlFor="title">Title</label>
            </div>
            <div className="mb-3">
              <label htmlFor="synopsis">Synopsis</label>
              <textarea onChange={handleSynopsisChange} value={synopsis} id="synopsis" name="synopsis" className="form-control" rows="3" ></textarea>
            </div>
            <div className="mb-3">
              <select onChange={handleConferenceChange} value={conference} required name="conference" className="form-select" id="conference">
                <option value="">Choose a conference</option>
                {conferences.map(conference => {
                  return (
                    <option key={conference.id} value={conference.id}>{conference.name}</option>
                  )
                })}
              </select>
            </div>
            <button className="btn btn-primary">Create</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PresentationForm;
