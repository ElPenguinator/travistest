###Un exemple nodeJS

###Commencer par télécharger l'image docker officiel de Node.js en faisant :
docker pull node:0.12.4
#0.12.4: Pulling from library/node
#7711db4bb553: Pull complete
#d1744e6e9471: Pull complete
#9332645b03a3: Pull complete
#a52a290821b3: Pull complete
#3575f1347ce7: Pull complete
#39bb80489af7: Pull complete
#df2a0347c9d0: Already exists
#7a3871ba15f8: Already exists
#a2703ed272d7: Already exists
#c9e3effdd23a: Already exists
#node:0.12.4: The image you are pulling has been verified. Important: image verification is a tech preview feature and should not be relied on to provide security.
#Digest: sha256:81fb0812dd5e81f768773a121c8a6daced36893210c5ed50b504c4abcb04e10c
#Status: Downloaded newer image for node:0.12.4

##Il faut ensuite créer un fichier server.js avec le contenu suivant :
#var http = require("http");
#var server = http.createServer(function(req, res) {
#  res.end("Coucou depuis Docker");
#});
#server.listen(3000);

##Et maintenant, pour lancer notre application à l'intérieur d'un conteneur :
docker run -d --name node-app -p 3000:3000 -v $(pwd):/app node:0.12.4 node /app/server.js
#e9ca3cd8f90b8554ca99ec8ba15a039f827005bd8fecbf80d72ce7267006a6df

#Si vous vous rendez sur localhost:3000 (ou l'IP de la VM si êtes sur Windows ou Mac), vous verrez : 'Coucou depuis Docker'

#C'est beau, mais comment ça marche ? Examinons les options une par une :

#    -d : cette option permet de lancer le conteneur en mode démon et donc de tourner en tâche de fond à la différence de -it qui lançait le conteneur au premier plan et nous donnait un accès direct au conteneur.
#    --name node-app : cette option permet simplement de nommer notre conteneur, ce qui peut servir pour l'arrêter et le relancer plus simplement (et à d'autres choses plus complexes dont je parlerai dans un prochain article).
#    -p 3000:3000 : cette option permet de partager le port de votre machine avec le port du conteneur. Le premier nombre est le port de votre machine et le deuxième le port dans le conteneur.
#    -v $(pwd):/app : cette option permet de partager un dossier avec votre conteneur, ici, nous partageons le dossier courant (où se trouve notre fichier server.js) avec le dossier /app dans le conteneur (attention si vous êtes sur Mac ou Windows uniquement votre 'home' est partagé).
#    node:0.12.4 : l'image Docker que vous voulez utiliser.
#    node /app/server.js : la commande à exécuter dans le conteneur.

##Et maintenant ? Vous pouvez afficher le conteneur en faisant : docker ps, l'arrêter avec : docker stop node-app et le supprimer avec docker rm node-app.