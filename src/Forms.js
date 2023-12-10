import React, { useState } from "react"; 

function Form () {
  const [ firstName, setFirstName ] = useState("");
  const [ lastName, setLastName ] = useState("");
  const [ male, setMale ] = useState(false);
  const [ female, setFemale ] = useState(false);
  const [ single, setSingle ] = useState(false);
  const [ married, setMarried ] = useState(false);
  const [ divorced, setDivorced ] = useState(false);
  const [ passport, setPassport ] = useState({});

  const handleFirstName = (event) => {
    setFirstName(event.target.value)
  }

  const handleLastName = (event) => {
    setLastName(event.target.value);
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-6">
          <form>
            <div className="form-group mt-4">
              <label>First name</label>
              <input type="text" className="form-control" onChange={(event) => handleFirstName(event)} value={firstName} placeholder="Enter your first name" />
            </div>
            <div className="form-group mt-4">
              <label>Last name</label>
              <input type="text" className="form-control" onChange={(event) => handleLastName(event)} value={lastName} placeholder="Enter your last name" />
            </div>
            <div className="form-group mt-4">
              <input type="radio" id="female" onChange={(event) => setFemale(event.target.checked)} name="gender" defaultChecked />
              <label htmlFor="female" className="m-4">Female</label>
              
              <input type="radio" onChange={(event) => setMale(event.target.checked)} name="gender" id="male" />
              <label htmlFor="male" className="m-4">Male</label>
            </div>

            <div className="form-group">
              <input type={"checkbox"} onChange={event => setSingle(event.target.checked)} id="single" name="single" />
              <label htmlFor="single" className="m-4">Single</label>

              <input type={"checkbox"} onChange={event => setMarried(event.target.checked)} id="married" name="married" />
              <label htmlFor="married" className="m-4">Married</label>

              <input type={"checkbox"} onChange={event => setDivorced(event.target.checked)} id="divorced" name="divorced" />
              <label htmlFor="divorced"  className="m-4">Married</label>
            </div>

            <div className="form-groupt">
              <label htmlFor="passport" id="password">Upload your passport</label>
              <input type={"file"} formEncType="*" onChange={e => setPassport(e.target.files[0])} />
            </div>
            <button className="btn btn-primary mt-3">Submit</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Form;