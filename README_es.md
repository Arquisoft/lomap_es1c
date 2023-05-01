#LoMap es1c

[![Actions Status](https://github.com/arquisoft/lomap_es1c/workflows/CI%20for%20LOMAP_ES1c/badge.svg)](https://github.com/arquisoft/lomap_es1c/actions)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=Arquisoft_lomap_es1c&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=Arquisoft_lomap_es1c)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=Arquisoft_lomap_es1c&metric=coverage)](https://sonarcloud.io/summary/new_code?id=Arquisoft_lomap_es1c)

<p float="left">
<img src="https://blog.wildix.com/wp-content/uploads/2020/06/react-logo.jpg" height="100">
<img src="https://miro.medium.com/max/1200/0*RbmfNyhuBb8G3LWh.png" height="100">
<img src="https://miro.medium.com/max/365/1*Jr3NFSKTfQWRUyjblBSKeg.png" height="100">
</p>

Este proyecto es un ejemplo básico de un sitio web utilizando **React** con **Typescript** y un endpoint usando **NodeJS** con **express**

## Guía de inicio rápido

<mark>Si tienes instalado npm, asegúrate de actualizarlo antes de intentar construir las imagenes</mark>

Si quieres ejecutar el proyecto necesitarás [git](https://git-scm.com/downloads), [npm](https://www.npmjs.com/get-npm) y [Docker](https://docs.docker.com/get-docker/). Asegúrate de tenerlos instalados en tu equipo. Descarga el proyecto con `git clone https://github.com/arquisoft/lomap_es1c`. La manera más rápida de ejecutar todo es con Docker.

```bash
docker-compose up --build
```
Este comando una imagen de docker si no existen en tu equipo. Además lanzará contenedores de Prometheus y Grafana para monitorizar el servicio web. Deberías ser capaz de acceder a todo desde aquí:

 - [Webapp - http://localhost:3000](http://localhost:3000)
 - [Servidor Prometheus - http://localhost:9090](http://localhost:9090)
 - [Servidor Grafana http://localhost:9091](http://localhost:9091)
 
Si quieres ejecutar el proyecto sin Docker tienes que descargar las dependencias y luego ejecutar el proyecto.
```shell
cd frontend
npm install
npm start
```

Deberías ser capaz de acceder a la aplicación en [http://localhost:3000](http://localhost:3000).

## Mas información
Encontrarás más información sobre el repositorio en los otros archivos README:
- Documentación: https://github.com/arquisoft/lomap_es1c/tree/master/docs
- Frontal: https://github.com/arquisoft/lomap_es1c/tree/master/frontend
- Backend: https://github.com/arquisoft/lomap_es1c/tree/master/frontend/src/backend

