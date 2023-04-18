import React, {useState, useEffect} from 'react';

function LocationForm () {
  //State Selection Data
    const [states, setStates] = useState([]);

    //Form Data
    const [name, setName] = useState("");
    const [roomCount, setRoomCount] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");

    const fetchData = async () => {
        const url = 'http://localhost:8000/api/states/';
        const response = await fetch(url);

        if (response.ok) {
        const data = await response.json();
        setStates(data.states);
        }
    }

    useEffect(()=> {
        fetchData();
    }, [])

    const handleSubmit = async (event) => {
        event.preventDefault();

        //Collects Data from State into an object
        //that will be passed into our request's body
        const data = {};

        data.name = name;
        data.room_count = roomCount;
        data.city = city;
        data.state = state;

        const locationUrl = 'http://localhost:8000/api/locations/';

        const fetchConfig = {
        method: "post",
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        },
        };

        const response = await fetch(locationUrl, fetchConfig);

        if (response.ok) {
        setName('');
        setRoomCount('');
        setCity('');
        setState('');
        }
    }

    const handleNameChange = async (event) => {
        const value = event.target.value;
        setName(value);
    }

    const handleRoomCountChange = async (event) => {
        const value = event.target.value;
        setRoomCount(value);
    }

    const handleCityChange = async (event) => {
        const value = event.target.value;
        setCity(value);
    }

    const handleStateChange = async (event) => {
        const value = event.target.value;
        setState(value);
    }

    return (
        <div className="row">
        <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
            <h1>Create a new location</h1>
            <form onSubmit={handleSubmit} id="create-location-form">
                <div className="form-floating mb-3">
                <input value={name} onChange={handleNameChange} placeholder="Name" required type="text" name="name" id="name" className="form-control" />
                <label htmlFor="name">Name</label>
                </div>

                <div className="form-floating mb-3">
                <input value={roomCount} onChange={handleRoomCountChange} placeholder="Room count" required type="number" name="roomCount" id="roomCount" className="form-control" />
                <label htmlFor="roomCount">Room count</label>
                </div>

                <div className="form-floating mb-3">
                <input value={city} onChange={handleCityChange} placeholder="City" required type="text" name="city" id="city" className="form-control" />
                <label htmlFor="city">City</label>
                </div>

                <div className="mb-3">
                <select value={state} onChange={handleStateChange} required name="state" id="state" className="form-select">
                    <option value="">Choose a state</option>
                    {states.map(state => {
                    return (
                        <option key={state.abbreviation} value={state.abbreviation}>
                        {state.name}
                        </option>
                    );
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

export default LocationForm;
