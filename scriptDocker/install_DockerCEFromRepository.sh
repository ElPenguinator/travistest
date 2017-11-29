#!/bin/sh

#SET UP THE REPOSIORY
#Update the apt package index
apt-get update

#Install packages to allow apt to use a repository over HTTPS
apt-get install apt-transport-https  ca-certificates curl software-properties-common

#Add Docker’s official GPG key
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | apt-key add -

#Verify that you now have the key with the fingerprint 9DC8 5822 9FC7 DD38 854A E2D8 8D81 803C 0EBF CD88, by searching for the last 8 characters of the fingerprint.
apt-key fingerprint 0EBFCD88

#Result:
#pub   4096R/0EBFCD88 2017-02-22
#      Key fingerprint = 9DC8 5822 9FC7 DD38 854A  E2D8 8D81 803C 0EBF CD88
#uid                  Docker Release (CE deb) <docker@docker.com>
#sub   4096R/F273FCD8 2017-02-22

#set up the stable repository. Always need the stable repository. To install builds from the edge or test repositories as well, and add them, add the word edge or test (or both) after the word stable in the commands below
add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable test"

#INSTALL DOCKER CE
#Update the apt package index.
apt-get update

#Install the latest version of Docker CE, or go to the next step to install a specific version. Any existing installation of Docker is replaced.
apt-get install docker-ce

#To install a specific version of Docker CE instead of always using the latest.
#List the available version
#apt-cache madison docker-ce
#Install the chosen version
#apt-get install docker-ce=<VERSION>
#The Docker daemon starts automatically

#Verify that Docker CE is installed correctly by running the hello-world image.
docker run hello-world

