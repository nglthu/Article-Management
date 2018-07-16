[![licence badge]][licence]
[![stars badge]][stars]
[![forks badge]][forks]
[![issues badge]][issues]

[licence badge]:https://img.shields.io/badge/license-MIT-blue.svg
[stars badge]:https://img.shields.io/github/stars/hey-red/Markdown.svg
[forks badge]:https://img.shields.io/github/forks/hey-red/Markdown.svg
[issues badge]:https://img.shields.io/github/issues/hey-red/Markdown.svg

[licence]:https://github.com/nglthu/Docker_React_Heroku/blob/master/LICENSE
[stars]:https://github.com/nglthu/Docker_React_Heroku/stargazers
[forks]:https://github.com/nglthu/Docker_React_Heroku/network
[issues]:https://github.com/nglthu/Docker_React_Heroku/issues

# Introduction

A web app, built using the React framework, NodeJS, Express, Docker, MongoDB, webpack module bundler, Cucumber, PassportJS and Travis CI that displays and searches article(s) and various points of interest. Users can search all included information related to articles and, when selected, additional information about their management is presented from the own built APIs.

<a href="http://team5v2.herokuapp.com/search"><img src="images/articleOnPhoneRound.png" width="50%" heigh="auto" alt="demo"> </a>

# Deployment : Heroku
[💚Access Link 💚](http://team5v2.herokuapp.com/search)

# REACT Application with Pre-render State v2.0 

## Docker - Development Environment

If you do not want to use docker on your system skip this step, but it is recommended that
you use docker, to avoid conflicting dependencies

To start the docker development environment with webpack watch run:

```
docker-compose up
```


This compiles the assets and runs the application at:

```
http://localhost:3000
````

Webpack watch will also be running to reflect any changes made during development


## Docker - Production Build

To build the production version of the application

```
docker build -t <name of container> -f Dockerfile.prod .
```
To test the production build

```
docker run --name app -p 80:3000 <name of container>
```
