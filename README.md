# backTanjonaOlivia2021

##DOCUMENTATION DU PROJET FRONTEND DU PROJET ASSIGNMENTS
	1-Pour tourner le projet sur votre machine, il faut cloner les sources sur github.
	
	2-Faire un nmp install sur le projet et après: 
		*npm start pour le lancer
		
	3-FONCTIONNALITE
		Ce projet est un API qui accède vers la base de donnée.
		Les liens api présent dans l'application :
			Méthode GET
				api/assignments  : retourne les assignments paginés 
				api/assignmentsRendu : retourne les assignments rendus paginés
				api/assignmentsNonRendu : retourne les assignments rendus paginés
			    api/assignments/{id} : retourne un assignment associé par cet id
				api/user/:{id}: retourne un utilisateur par son username
				api/roles : retourne liste role
				api/matieres : retourne list matieres
			
			Méthode DELETE
				api/assignments/{id}
			
			Méthode POST
				api/assignments
				user/signIn
				user/signUp
				
			
			Méthode PUT
				api/assignments

	4-BIBLIOGRAPHIE
		Debbug jwt :25/03/2021
			decode token : https://stackoverflow.com/questions/48075688/how-to-decode-the-jwt-encoded-token-payload-on-client-side-in-angular/48288112#48288112
			jwt node  : https://www.freecodecamp.org/news/securing-node-js-restful-apis-with-json-web-tokens-9f811a92bb52/

			jwt front : https://www.techiediaries.com/angular/jwt-authentication-angular-9-example/#:~:text=A%20JWT%20token%20is%20simply,apps%20like%20sessions%20and%20cookies.
			config jwt module : https://stackoverflow.com/questions/62995360/type-is-not-assignable-to-type-jwtconfig

			date : 26/03/2021
			https://www.npmjs.com/package/bcryptjs : install cryptage mdp
			validation form inspiration: https://www.concretepage.com/angular-2/angular-2-4-minlength-and-maxlength-validation-example
			https://jasonwatmore.com/post/2018/11/07/angular-7-reactive-forms-validation-example
