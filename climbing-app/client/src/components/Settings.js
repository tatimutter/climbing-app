import React, { useState} from "react";

function Settings( {settings, setSettings, handleChangeView, days, setDays }) {

const [daysOfWeek, setDaysOfWeek] = useState(
  [
    {checked: false, name: "Monday"} ,
    {checked: false, name: "Tuesday"} ,
    {checked: false, name: "Wednesday"} ,
    {checked: false, name: "Thursday"} ,
    {checked: false, name: "Friday"} ,
    {checked: false, name: "Saturday"} ,
    {checked: false, name: "Sunday"}
  ])

//handles form input for fields != checkbox
const handleInputChange = (event) => {
  const value = event.target.value
  const name = event.target.name;
  setSettings((state) => ({
    ...state,
    [name]: value,}
  ))
  }

//handles true/false status for top and rope fields
const handleCheck = (e) => {
  console.log(e.target.value)
  console.log(e.target.name)
}

//handles checked status for days
const handleDaysChange = (d) => {
  console.log(daysOfWeek)
  console.log(d.name)
  console.log(d.checked)

  let index = daysOfWeek.findIndex((day) => day.name === d.name)
  console.log(index)
  setDaysOfWeek(daysOfWeek[index].checked = !daysOfWeek[index].checked) 
  console.log(d.checked)

  console.log(days)
}

//handles form submit and updates settings state var on parent. 
//selected days only passed to settings state var once submitted

const handleSubmit = (e) => {
  e.preventDefault();
  console.log(settings);
  let selectedDays = daysOfWeek.filter((day) => day.checked === true)
  setDays(selectedDays)
  handleChangeView("Profile")
}

  return (

    <div className="justify-content">
      <h2> Settings </h2>

      <form onSubmit={handleSubmit}>
      <div className="grid p-3 text-center">
      <div className="row">

          <div className="row p-3">
          <label> First name </label>
          <input
            type="text"
            name="firstName"
            value={settings.firstName}
            placeholder="Type first name"
            className="form-control"
            onChange={(e) => handleInputChange(e)}
          />
          </div>

          <div className="row p-3">
          <label> Last name </label>
          <input
            type="text"
            name="lastName"
            value={settings.lastName}
            placeholder="Type last name"
            className="form-control"
            onChange={(e) => handleInputChange(e)}
          />
          </div>

          <div className="row p-3">
          <label> User name </label>
          <input
            type="text"
            name="userName"
            value={settings.userName}
            placeholder="Type user name"
            className="form-control"
            onChange={(e) => handleInputChange(e)}
          />
          </div>

          <div className="row p-3">
          <label> Email </label>
          <input
            type="email"
            name="email"
            value={settings.email}
            placeholder="Type email"
            className="form-control"
            onChange={(e) => handleInputChange(e)}
          />
          </div>

          <div className="row p-3">
          <label> Bio </label>
          <input
            type="text"
            name="bio"
            value={settings.bio}
            placeholder="Type bio"
            className="form-control"
            onChange={(e) => handleInputChange(e)}
          />
          </div>

          <div className="row p-3">
          <label> Image </label>
          <input
            type="text"
            name="img"
            value={settings.img}
            placeholder="https://example.com/users/"
            className="form-control"
            onChange={(e) => handleInputChange(e)}
          />
        </div>

         <div className="row p-3">
          <label> Location </label>
          <input
            type="text"
            name="location"
            value={settings.location}
            placeholder="Set location"
            className="form-control"
            onChange={(e) => handleInputChange(e)}
          />
          </div>

           <div className="row p-3">
           <label> Level </label>
           <select 
            className="form-control"
            id="level"
            type="text"
            name="level"
            value={settings.level}
            placeholder="Set level"
            onChange={(e) => handleInputChange(e)}
            >
            <option> Beginner </option>
            <option> Intermediate </option>
            <option> Advanced </option>
          </select>
          </div>

        <div className="row p-3">
           
           <div className="custom-control custom-checkbox">
           <label className="custom-control-label"> Top-rope </label>
           <input 
           type="checkbox" 
           className="custom-control-input" 
           name="top"
           value={settings.top}
           //checked={settings.top === true }
           onChange={(e) => handleCheck(e)}
           />
          </div>


          <div className="custom-control custom-checkbox">
           <label className="custom-control-label"> Lead </label>
           <input 
           type="checkbox" 
           className="custom-control-input" 
           name="lead"
           value={settings.lead}
           //checked={settings.lead === true}
           onChange={(e) => handleCheck(e)}
           />
          </div>

        </div>
        
         <ul> Days 
         {daysOfWeek.map(d => (
          <li 
          className="row p-3"
          key={d.name}>
          <label> {d.name} </label>
          <input
          type="checkbox"
          name="days"
          value={d.name}
          //checked={d.checked}
          className="control-input"
          onChange={() => handleDaysChange(d)}
          />
          </li>))}
          </ul>
       
          <div className="row-md p-3">
          <button className="col-2 btn btn-m btn-warning">Submit</button>
          </div>

        
      </div>
      </div>
      </form>

    </div>
  );
}

export default Settings;
