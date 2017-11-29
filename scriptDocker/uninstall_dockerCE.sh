#UNINSTALL DOCKER CE
#Uninstall the Docker CE package:
apt-get purge docker-ce

#Images, containers, volumes, or customized configuration files on your host are not automatically removed. To delete all images, containers, and volumes:
rm -rf /var/lib/docker

You must delete any edited configuration files manually.