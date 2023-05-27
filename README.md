<h1 align="center">
<img src='https://i.imgur.com/zBOQqYA.png' width="350px"/>
</h1>
<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
        <li><a href="#screenshots">Screenshots</a></li>
        <li><a href="#api-reference">API Reference</a></li>
        <li><a href="#color-reference">Color Reference</a></li>
      </ul>
    </li>
        <li><a href="#installation">Installation</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#about-me">About Me</a></li>
    <li><a href="#feedback">Feedback</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

# Mooview

Mooview is the ultimate movie review app that makes informed decisions easy for neurodiverse people. Powered by The Movie Database API, Mooview delivers up-to-date information and ratings for movies, so you don't have to worry about choosing the wrong film. With personalized recommendations based on user reviews, Mooview makes it easy to find movies that align with your interests and preferences. Say goodbye to aimless scrolling and join the Mooview community to start posting reviews and discovering your next favorite movie.





## Authors
[![Contributors][contributors-shield]][contributors-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

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
- ![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
- ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
- ![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
- ![Semantic UI React](https://img.shields.io/badge/Semantic%20UI%20React-%2335BDB2.svg?style=for-the-badge&logo=SemanticUIReact&logoColor=white)
- ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)


<!-- Screenshots -->

## Screenshots
<img src='https://github.com/AnneiceManz/mooview/blob/main/exampleImages/3-devices-white.png'/>
<img src='https://github.com/AnneiceManz/mooview/blob/main/exampleImages/mooviegif.gif' />

<!-- API Reference -->

## API Reference

- [The Movie DB API](https://developer.themoviedb.org/reference/intro/getting-started)
- [Google Slidedeck Presentation](https://docs.google.com/presentation/d/1WPagj0iimUoQe-yzIkIUy27K3fYAwKvEE_QdFIr7pLY/edit?usp=sharing)

<!-- Color Reference -->

## Color Reference

| Color             | Hex                                                                |
| ----------------- | ------------------------------------------------------------------ |
| Red | ![#C63729](https://via.placeholder.com/10/c63729?text=+) #C63729 |
| Blue | ![#3977C9](https://via.placeholder.com/10/3977c9?text=+) #3977C9|
| Brown | ![#7E3E12 ](https://via.placeholder.com/10/7E3E12?text=+) #7E3E12 |
| Cream| ![#F8F5DE](https://via.placeholder.com/10/F8F5DE?text=+) #F8F5DE|

<!-- Installation -->

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`API_KEY` from The Movie DB

## Installation

**This project requires Auth0! Please visit [Auth0](https://auth0.com/) to make an account and retrieve a domain and clientid. See .env.example for set up!**

Step 1: Go to your terminal: clone the project and switch into the project directory.

```bash
  git clone https://github.com/AnneiceManz/mooview.git
  cd mooview
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
  psql mooview -f db.sql
```

Step 5: Start the program!

```bash
  cd server && npm run dev
```
<br>
<br>

<!-- Roadmap -->
## Roadmap

- [x] Functional Searchbar
- [x] Comment of Reviews
- [ ] Actor/Actress Page
- [ ] Watch List
- [ ] Favorites List
- [ ] Follow other users
- [ ] Update Profile Picture

<br>
<br>

<!-- About Me -->

## About Me

<div align="center">
<img src="https://media.giphy.com/media/iFroMXf8HkQD5LrJOJ/giphy.gif" align="center" style="width: 100%" />
</div>  
  

### <div align="center">I'm Anneice, a full-time full-stack developer 👩🏿‍💻 working remotely since 2013 🚀</div>  
  

- ♀️ Pronouns: She/Her/Hers/Queen 👸🏿
  

- 🌱 I’m currently learning: Python 
  

- ❓ Ask me about anything related to PERN stack, CSS, and related technologies  
  

- ⚡ Fun fact: I love cows 🐄  
  

- 💕 Hobbies: Reading 📚, Video Games 🎮, Photography 📷, Crochet 🧶 
  

- 🏡 My Family: Married 👩🏿‍❤️‍👨🏽, 3 kids 👩🏾‍🦱🧑🏾‍🦱👩🏾‍🦱, and 2 dogs 🐾 
  

- 🍴 Favorite Food: Sushi 🍣, Tacos 🌮, and Ice Cream 🍨  


- 😍 I Cannot Stop Talking About: Hamilton "I am not throwing away my shot!"

<br>
<br>
<!-- FEEDBACK -->

## Feedback

If you have any feedback, please reach out to us at anneice.manzanares@gmail.com




<!-- MARKDOWN LINKS & IMAGES -->

[contributors-shield]: https://img.shields.io/badge/Contributors-1-brightgreen?style=for-the-badge&logo=appveyor
[contributors-url]: https://github.com/AnneiceManz/mooview/graphs/contributors
[linkedin-shield]: https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white
[linkedin-url]: https://www.linkedin.com/in/Anneice-Manzanares/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/


