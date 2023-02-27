import React, {useState, useEffect} from "react";
import Home from "./components/Home"
import Settings from "./components/Settings"
import List from "./components/List"
import Profile from "./components/Profile";
import Preferences from "./components/Preferences";
import './App.css';
import { Routes, Route, Link, NavLink, useNavigate} from "react-router-dom";
import logo from "./images/logo.png"

function App() {

  const [isView, setView] = useState("home") // SetsView 
  const [isChecked, setChecked] = useState(false) // Sets top/lead within Preferences of "active user"
  const [recommendations, setRecommendations] = useState([]) // SetsRecommendations array (= recommended climbers) based on Preferences/filters
  const [days, setDays] = useState(["Saturday", "Monday", "Tuesday", "Friday"]) // Setsdays within Preferences/filter of "active user"
  const navigate = useNavigate()

  //"active user" default settings. Move to settings comp?
  const [settings, setSettings] = useState({ 
    firstName: "Mele",
    lastName: "Couvreur",
    userName: "m_couvreur",
    email: "dummy@gmail.com",
    gender: "Female",
    pronouns: "she/her",
    bio: "Sometimes I make myself proud, sometimes I put my keys in the fridge. Coffee, climbing and coding-fanatic",
    img: "https://www.climbing.com/wp-content/uploads/2017/11/womenclimbingtimeline.jpg?crop=16:9&width=1500",
    location: "London",
    level: "Intermediate",
    lead: false, 
   }
 )

//remove later with route
const handleChangeView = (isView) => {
  setView(isView)
}

useEffect(() => {
  handleChangeView("Home")
  setSettings((state) => ({
    ...state}
    ));
  getRecommendations() // makes sure myMatches is not empty when first loading app. Matched based on default values in settings object 
  navigate("/")
}, [])

/*
  //Fetches all users. No filters applied. For testing.
  const showUsers = () => {
    fetch("/users")
    .then(response => response.json())
    .then(users => {
    setRecommendations(users)
    //handleChangeView("List")
    })
    .catch(error => {
      console.log(error)
    })
  };
*/

//Fetches climbers based on Preferences/filter from db
//To do - insert top/lead
  const getRecommendations = async () => {
    try {
      let results = await fetch("/recommend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ location: settings.location, days, level: settings.level, gender: settings.gender}) 
      });
      let users = await results.json();
      console.log(users)
      //if db query successful > SetsRecommendations array with fetched climbers
      setRecommendations(users)
      console.log(recommendations)
    }
    catch (error) {
      console.log(error)
    }
  };

  let activeClassName = "btn-outline-danger"
  
  return (
    <div className="main container-fluid text-center">
      
    <div className="flex-row">

    <div>
    <NavLink to="/">
    <img
    className="logo m-2" 
    src={logo}
    alt="logo"
    onClick={() => navigate("/")}/> 
    </NavLink>
    </div>

    <nav className="nav nav-masthead justify-content-center p-2">
    
       <NavLink 
        to="/settings"
        className={({isActive}) => 
        isActive ? activeClassName : undefined }>
        <button
        //onClick={() => handleChangeView("Settings")} //remove
        className="text-white btn m-1">
        Settings </button>
       </NavLink>

        <NavLink 
        to="/preferences"
        className={({isActive}) => 
        isActive ? activeClassName : undefined }
        ><button
        //onClick={() => handleChangeView("Preferences")} //remove
        className="text-white btn m-1">
        myPreferences</button></NavLink>

        <NavLink to="/profile"
         className={({isActive}) => 
         isActive ? activeClassName : undefined }
         ><button
        //onClick={() => handleChangeView("Profile")} // remove
        className="text-white btn m-1" >
        myProfile </button></NavLink>

        <NavLink to="/matches"
        className={({isActive}) => 
        isActive ? activeClassName : undefined }
        ><button
        onClick={() => getRecommendations} 
        className="text-white btn m-1">
        myMatches </button></NavLink>
        </nav>

    </div>
   

    <Routes>
      <Route path="/"
        element={<Home
        navigate={navigate}/>}>
    </Route>

      <Route path="/settings" 
        element={
        <Settings
        settings={settings}
        setSettings={setSettings}
        handleChangeView={handleChangeView}
        days={days}
        setDays={setDays}
        setChecked={setChecked}
        navigate={navigate}
        getRecommendations={getRecommendations}
        />
        }>
        </Route>

        <Route path="/preferences" 
        element={
        <Preferences
        settings={settings}
        setSettings={setSettings}
        handleChangeView={handleChangeView}
        days={days}
        setDays={setDays}
        setChecked={setChecked}
        navigate={navigate}
        getRecommendations={getRecommendations}
        />
        }>
        </Route>
  

        <Route path="/profile"
         element={
         <Profile
        settings={settings}
        getRecommendations={getRecommendations}
        recommendations={recommendations}
        days={days}
        navigate={navigate}/>
       }>
       </Route>

      <Route path="/matches" 
        element={<List
        handleChangeView={handleChangeView}
        isView={isView}
        recommendations={recommendations}
        getRecommendations={getRecommendations}/>}>
          </Route>

     </Routes>
         
     </div>
  )
}

export default App;
