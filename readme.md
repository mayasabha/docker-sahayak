# Docker Sahayak

## Introduction
This repository contains the source code for a containerized low-code application that helps users create Dockerfiles and Docker Compose files for various services using a simplified Graphical User Interface (GUI). This is based on the [NodeRED](https://nodered.org) platform and incorporates several custom nodes that are useful for creating the corresponding Dockerfiles and Docker Compose files.

## Installation and Deployment
The repository contains containerized configuration for easy deployment using any system that has the Docker platform installed. To deploy this application, run the following command in the project directory after cloning the repository:
```bash
docker compose up --build -d
```
The application will now serve the Web-based GUI at port 8007 of the host machine. To modify this, you can modify the `services.sahayak.ports` attribute to `- <new_port>:1880`, where `<new_port>` is to be replaced with the port on which the service is to be run on the host system.

## Authors
This repository is build by maintained by:
[@apoorvpal01](https://github.com/apoorvpal01)
[@mayasabha](https://github.com/mayasabha)