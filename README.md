# Code-Op MVP

![This is an image](./climbing-app/client/src/images/logo.png)

## Project Description

### **The problem**

Climbers struggle finding consistent belay partners.

### **How this app will solve it**

BelayMe connects climbers based on their level, location, gender and schedule.

## **Userflow**

![This is an image](/userflow.png)

### **Features Phase 1**

- User can set-up/edit personal profile
- User gets matched with others climbers based on:
  - Location
  - Level
  - Lead certified or not
  - Days
  - Gender

### React Structure Phase 1**

- Parent: App.js (settings & preferences data, React Routes & NavLinks)
- Children:
  - Home
  - Preferences (preferences form)
  - Settings (settings form)
  - Profile ('active user' profile)
  - List (displays recommended users/climbers)

### **Future features**

- Account authentication & verification
- Geolocation API to location field
- User can set multiple levels and genders in preferences
- User can specify time of day  (i.e. morning, lunch, afternoon, evening) in preferences
- User can add pre-defined interest categories/tags to profile
- User can send/accept contact request
- User can message once contact request accepted
- User can see list of connected climbers (i.e. matched & accepted connection request)
- User can see list of climbers pending connected climbers (i.e. sent connection request, but not yet accepted)
- User can link IG profile to climber profile
- User can bookmark other climbers until user decides to send connection request
- User gets notification when other user interacts i.e. send connection request, new message
- User can choose to allow/disable notifications

## **Technical Specs**

### **Technologies**

- React
- React Router
- React Toastify
- Express
- Node.js
- Bootstrap
- mySQL

### API Routes

#### Route 1

- URL: "/users"
- METHOD: GET
- Description: Gets all users
- Req Body: N/A
- Res Obj: {ID: integer, firstname: string, lastname: string, email: string,
username: string, pronouns: string, avatar: url, bio: string, location: string, top: Boolean, lead: Boolean, level: string}

#### Route 2

- URL: "/users/:id"
- METHOD: GET
- Description: Gets user info by id
- Req Body: N/A
- Res Obj: {ID: integer, firstname: string, lastname: string, email: string, username: string, pronouns: string, avatar: url, bio: string,  location: string, top: Boolean, lead: Boolean, level: string, gender: string}

#### Route 3

- URL: "/users"
- METHOD: POST
- Description: Adds new user to db
- Req Body {username: string, pronouns: string, avatar: url, bio: string,  location: string, tope: Boolean, lead: boolean, level: string, gender: string}
- Res Obj: {ID: integer, firstname: string, lastname: string, email: string, username: string, pronouns: string, avatar: url, bio: string,  location: string, top: Boolean, lead: Boolean, level: string, gender: string}

#### Route 4

- URL: "/users/:id"
- METHOD: PUT
- Description: Edit user info in db
- Req Body {username: string, pronouns: string, avatar: url, bio: string, location: string, top: Boolean, lead: boolean, level: string, gender: string}
- Res Obj: {ID: integer, firstname: string, lastname: string, email: string, username: string, pronouns: string, avatar: url, bio: string,  location: string, top: Boolean, lead: Boolean, level: string, gender: string}

#### Route 5

- URL: "/users/recommend"
- METHOD: POST
- Description: Gets recommended users based on matching criteria in Req Body
- Req Body: {location, top, lead, level, days, gender }
- Res Obj: {ID: integer, firstname: string, lastname: string, email: string, username: string, pronouns: string, avatar: url, bio: string,  location: string, top: Boolean, lead: Boolean, level: string, gender: string}

### Database info

Main DATABASE = 'users' - containing two TABLES, 'user_info' and 'days'

TABLE 1: user_info

- uID INT NOT NULL PRIMARY KEY AUTO_INCREMENT; Number
- firstname VARCHAR() NOT NULL; String
- lastname VARCHAR() NOT NULL; String
- email VARCHAR() String
- username VARCHAR() String
- pronouns VARCHAR() String
- avatar VARCHAR(); String
- bio VARCHAR(); String
- location VARCHAR() String
- top BINARY(); Boolean
- level VARCHAR(); String
- gender VARCHAR(); String

TABLE 2: days

- dID INT NOT NULL PRIMARY KEY AUTO_INCREMENT; Number
- uID INT NOT NULL FOREIGN KEY; Number ----- REFERENCES user_info.UID
- day VARCHAR(20); String

## **Setup Instructions**

### Dependencies

- `cd climbing-app` and run `npm install` in project directory. This will install server dependencies such as `express`.
- `cd client` and run `npm install`. This will install client dependencies.

### Database Prep

- Access the MySQL interface in terminal by running `mysql -u root -p`
- Create a new database called users: `create database users`
- Add a `.env` file to the project folder of this repo containing MySQL authentication information:
  - DB_HOST=localhost
  - DB_USER=root
  - DB_NAME=users
  - DB_PASS=YOURPASSWORD

- Run `npm run migrate` in the `climbing-app` folder in a new terminal window. This will create the 'user_info' and 'days' tables in your database.**

- In MySQL interface, run `use users` followed by the commands contained in `days.sql` and `user_info.sql` files in the `model` folder. This will populate user_info and days tables with 'fake' user information.

**If npm run migrate doesn't work, seperate instructions are in days.sql and user_info.sql to set-up tables directly via MySQL interface.

### Development

- `cd climbing-app` and run `npm start` in to start the Express server on port 5002
- In another terminal, do `cd client` and run `npm start` to start the client in development mode with hot reloading in port 3000
