# Projet Angular / Node MDBS Madagascar 2021

#Développeurs:
	- RALAIARISOA Tolotriniavo Hubert N°29
	- LALA THONG SANG Irchad N°09

#Données:
	- 500 assignments
	- 2 matières

#Lien Github:
	- Backend: https://github.com/Tolotriniavo/MBDS_backend_node
	- Frontend: https://github.com/Tolotriniavo/MBDS_frontend_angular
	
#Lien Heroku:
	- Backend: https://backendmbds.herokuapp.com/
	- Frontend: https://frontendmbds.herokuapp.com/

#Contribution:
	- Gestion de login/password avec JWT et protection de la modification de l'assignments(Verification du token)
	- Ajout de nouvelles propriétés de l'assignment: 
		=> Creation d'une nouvelle collection Matieres(nom,image,nomProf,imageProf)
		=> Ajout Propriétés: matiereId, note, remarque sur l'assignment
	-ajout template
	- Assignment detail designé avec bootstrap(ajout des proprietes)
	- Liste renouveau du design de la mat-card, ajout d'onglet non rendu et rendu
	- Formulaire de type Stepper pour : Ajout - Modification
	- Pour l'ajout: apres l'ajout de l'assignment, l'app va directement vers la fin de la pagination,
		change automatiquement l'onglet vers non rendu, et scroll automatiquement tout en bas de la page pour tout de suite voire 
		l'assignment ajouter dans la liste.(ergonomie)
	-gestion de l'onglet pour l'ergonomie
	- Messages de notification quand l'user est connectée ou deconnéctée
	- Drag and drop pour rendre l'assignment(lui assigner une note et une remarque)
	- Hébergement sur Heroku.com

#Utilisation en locale:
	- Backend:
		=> Télécharger le zip du projet git
		=> Extraire le fichier zip dans un dossier
		=> Executer la commande dans le dossier du projet : npm install
		=> Pour lancer, executer la commande : node server
	- Frontend:
		=> Télécharger le zip du projet git
		=> extraire le fichier zip dans un dossier
		=> executer la commande dans le dossier du projet : npm install
		=> pour lancer, executer la commande : ng serve

#Vidéo démo:
	.
		
#Accès:
	login:
		email:test@gmail.com
		password:root





		
#Sources:
	Nous avons discuter de la conception de l'app avec le groupe 13 et on s'est partager quelque liens de tuto comme la video d'ajout template.
	- JWT : 
        => https://www.freecodecamp.org/news/securing-node-js-restful-apis-with-json-web-tokens-9f811a92bb52/
	- template : 
		=> https://www.youtube.com/watch?v=dlBb1Z_8FiI&t=614s
    - Card, Stepper, onglet, notification , Drag & Drop
        => https://material.angular.io/ copie et test de nombreux stackblitz 
    - Données de test: 
        => https://www.mockaroo.com/
    - Design :
        => https://material.angular.io/
        => https://getbootstrap.com/

		
