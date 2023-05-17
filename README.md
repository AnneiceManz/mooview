
![Logo](https://i.imgur.com/zBOQqYA.png)

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
        <li><a href="api-reference">API Reference</a></li>
      </ul>
    </li>
        <li><a href="#installation">Installation</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

# Mooview

Mooview is the ultimate movie review app that makes informed decisions easy for neurotypical people. Powered by The Movie Database API, Mooview delivers up-to-date information and ratings for movies, so you don't have to worry about choosing the wrong film. With personalized recommendations based on user reviews, Mooview makes it easy to find movies that align with your interests and preferences. Say goodbye to aimless scrolling and join the Mooview community to start posting reviews and discovering your next favorite movie.





## Authors

- [@AnneiceManz](https://www.github.com/AnneiceManz)


## Features

- Highly scalable
- Updated Movie API
- Reusable Components
- Responsive
- Auth0 Authentication service
- React Routing

### Built With

- ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
- ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
- [![React][React.js]][React-url]
- ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
- ![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
- ![Semantic UI React](https://img.shields.io/badge/Semantic%20UI%20React-%2335BDB2.svg?style=for-the-badge&logo=SemanticUIReact&logoColor=white)
- ![MUI](https://img.shields.io/badge/MUI-%230081CB.svg?style=for-the-badge&logo=mui&logoColor=white)

<!-- API Reference -->

## API Reference

- [The Movie DB API](https://developer.themoviedb.org/reference/intro/getting-started)

<!-- Installation -->

## Installation

**This project requires Auth0! Please visit [Auth0](https://auth0.com/) to make an account and retrieve a domain and clientid. See .env.example for set up!**

Step 1: Go to your terminal: clone the project and switch into the project directory.

```bash
  git clone https://github.com/rubycmarroquin/MoneyOnMyMind.git
  cd moneyonmymind
```

Step 2: Install all packages.

```bash
  cd client && npm install && cd ../server && npm install
```

Step 3: Setup Environment Variables

- Copy the instructions from both .env.example files in the client and server.

Step 4: Connect the database and the data.

```bash
  cd server
  psql moneyonmymind -f db.sql
```

Step 5: Start the program!

```bash
  cd server && npm run dev
```

<!-- MARKDOWN LINKS & IMAGES -->

[contributors-shield]: https://img.shields.io/badge/Contributors-1-brightgreen?style=for-the-badge&logo=appveyor
[contributors-url]: https://github.com/rubycmarroquin/MoneyOnMyMind/graphs/contributors
[linkedin-shield]: https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white
[linkedin-url]: https://www.linkedin.com/in/rubymarroquin/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/


