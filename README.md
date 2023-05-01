# LoMap es1c

<p style="text-align: center;">
<img alt="Logo de LoMap" src="./frontend/public/logoLoMapA.png" height="200">
</p>

## What is LoMap
LoMap is an application developed for a school project that let's you create your own personalized maps with the place that you are interested in.

### Main Features:
   - You can add your own markers to the map with some customization such as the name or the category.
   - The markers are shown in the map and can be filtered with some options.
   - You can add photos, comments and rating to all of your locations.
   - You can add friends, and see their locations. You can also comment and rate those locations, and upload photos referring them.
   - You can create routes and add locations to those routes.

## Automatic Code Analysis
To ensure that the code is running as we expect and also that the quality of it is above our standards we use some pages that analyses our code
automatically.

[![custom CI for LOMAP ES1c](https://github.com/Arquisoft/lomap_es1c/actions/workflows/lomap_es1c_CI.yml/badge.svg)](https://github.com/Arquisoft/lomap_es1c/actions/workflows/lomap_es1c_CI.yml)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=Arquisoft_lomap_es1c&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=Arquisoft_lomap_es1c)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=Arquisoft_lomap_es1c&metric=coverage)](https://sonarcloud.io/summary/new_code?id=Arquisoft_lomap_es1c)


## The Team

The group is composed of four members that are the following

### Group members:
| Developers               | Emails             |
| ------------------------ | ------------------ |
| David González Fernández | uo276818@uniovi.es |
| Miguel Suárez Artime     | uo271497@uniovi.es |
| Damián Fernández Álvarez | uo283970@uniovi.es |
| Rubén Caño Domínguez     | uo284647@uniovi.es |

## Technologies 

We use different technologies for the develop of the application. For the front part of the application we use **React** with **JavaScript**, the backend part is a combination of controllers and services that communicate with PODs, all written in **Javascript**.

<p float="left">
<img alt="Logo de React" src="https://blog.wildix.com/wp-content/uploads/2020/06/react-logo.jpg" height="100">
<img alt="Logo de Solid" src="./frontend/public/solidLogo.png" height="100">
</p>

## Local Installation
We download the file (https://raw.githubusercontent.com/Arquisoft/lomap_es1c/master/frontend/docker-compose.yml)[docker-compose.yml]. Next, we open a command-line interface, we place ourselves in the directory where the file we have downloaded is and then we execute two commands: docker-compose pull and docker-compose up. The first command downloads the image of the docker and the second executes all the necessary commands to start the container.

## Documentation 
If you want to know more of the application you can view the full documentation here: https://arquisoft.github.io/lomap_es1c/.