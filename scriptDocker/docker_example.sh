###Un premier exemple

###Commencer par télécharger une image Docker qui servira de base aux prochains conteneurs.

##Pour cet exemple, on va partir d'une image Ubuntu :
docker pull ubuntu:trusty
#trusty: Pulling from ubuntu
#e9e06b06e14c: Pull complete
#a82efea989f9: Pull complete
#37bea4ee0c81: Pull complete
#07f8e8c5e660: Already exists
#ubuntu:trusty: The image you are pulling has been verified. Important: image verification is a tech preview feature and should not be relied on to provide security.
#Digest: sha256:014fa1d5b72b4fe0ec2b4642610fbbfdd52f502da8e14e80de07bd1dd774e4ef
#Status: Downloaded newer image for ubuntu:trusty


##Pour voir les images téléchargées :
docker images
#REPOSITORY    TAG       IMAGE ID        CREATED       VIRTUAL SIZE
#ubuntu        trusty    07f8e8c5e660    4 weeks ago   188.3 MB

##Lancer un conteneur et rentrer à l'intérieur :
docker run -it ubuntu:trusty bash
#root@2cdceb5ff771:/#
#Cette commande crée un conteneur à partir de l'image ubuntu:trusty, y lance le programme bash et y attache votre shell grâce aux options -it

##On peut maintenant exécuter les commandes qu'on veut, elle s'exécuteront à l'intérieur du conteneur, par exemple :
#root@2cdceb5ff771:/#
apt-get moo
#                 (__)
#                 (oo)
#           /------\/
#          / |    ||
#         *  /\---/\
#            ~~   ~~
#..."Have you mooed today?"...

##On peut quitter le conteneur en faisant un Ctrl-d

##Maintenant qu'on est retourné sur notre machine, on peut afficher la liste des conteneurs lancés avec cette commande :
docker ps
#CONTAINER ID    IMAGE   COMMAND   CREATED   STATUS    PORTS   NAMES

##Il est normal que le conteneur ne s'affiche pas car il s'est arrêté. Pour l'afficher quand même :
docker ps -a
#CONTAINER ID    IMAGE           COMMAND   CREATED         STATUS                    PORTS   NAMES
#2cdceb5ff771    ubuntu:trusty   "bash"    12 minutes ago  Exited (0) 2 minutes ago          loving_newton

##Et pour supprimer ce conteneur :
docker rm 2cdc
#2cdc

#'2cdc' est le CONTAINER ID de notre conteneur.