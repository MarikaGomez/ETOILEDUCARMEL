/*<!-- ########################################################################## -->*/
/*<!-- ###                             DARK THEME                             ### -->*/
/*<!-- ########################################################################## -->*/

var darkTheme=localStorage.getItem('darkTheme');
const themeCheckboxToggle=document.querySelector('.theme-checkbox'); 
/*Test possibilité d'utiliser localStorage*/
if(typeof localStorage!='undefined'){
	/*Fonction anonyme affectée à une variable pour activer ou désactiver le dark theme*/
	const darkThemeActive=function(){
		/*Changer le thème du site*/
		document.body.classList.toggle('dark');
		/*Conserver le choix de l'utilisateur grâce au localStorage*/
		/*setItem() permet d'ajouter un index et une valeur à l'emplacement de stockage*/
		localStorage.setItem('darkTheme','active');
	}
	const darkThemeDisabled=function(){
		document.body.classList.remove('dark');
		localStorage.setItem('darkTheme','disabled');
	}
	/*Vérification de l'état initial du localStorage et appel de la fonction si nécessaire*/
	if(darkTheme==='active'){
		darkThemeActive();
	};
	themeCheckboxToggle.addEventListener('click', function(evt){
		/*Mise à jour de la valeur stockée dans la variable'darkTheme'*/
		darkTheme=localStorage.getItem('darkTheme');
		if(darkTheme!='active'){
			darkThemeActive();
		}else{
			darkThemeDisabled();
		}
	});
}else{
	/*Pas de possibilité de stockage local*/
	alert("LOCAL STORAGE NON SUPPORTÉ.");
};

/*<!-- ########################################################################## -->*/
/*<!-- ###                         MODAL INSCRIPTION                          ### -->*/
/*<!-- ########################################################################## -->*/

/*<!-- ################################################################ -->*/
/*<!-- ###                           AJAX                           ### -->*/
/*<!-- ################################################################ -->*/

const country=document.getElementById('country');
const cpostal=document.getElementById('cpostal');
const city=document.getElementById('city');

/*Création d'un évènement qui se déclenche en quittant l'input
'cpostal' pour lister les villes dans l'input 'city' via une requête AJAX*/
if(cpostal){
	document.getElementById('cpostal').addEventListener('blur',function(){
	        var xhr=new XMLHttpRequest();
	        var url='http://api.zippopotam.us/'+country.value+'/'+cpostal.value;
	        xhr.open('get',url,true);
	        xhr.send(null);
	        xhr.addEventListener('readystatechange',function(){
	            if(xhr.readyState==4&&(xhr.status==200||xhr.status==0)){
	                var opt;
	                var data=JSON.parse(xhr.responseText);
	                city.innerHTML='';
	                for(var i=0;i<data.places.length;i++){
	                    opt=document.createElement('option');
	                    console.log(data.places[i]['place name']);
	                    opt.textContent=data.places[i]['place name'];
	                    opt.value=opt.textContent;
	                    city.appendChild(opt);
	                }
	            }
	        });
	    },
	    false
	);
}

/*<!-- ################################################################ -->*/

const dob=document.getElementById('dob');
const phone=document.getElementById('phone');

const submitBtn=document.getElementById("submit");

if(dob){
	dob.addEventListener('keydown',function validDOB(evt){
		if(['0','1','2','3','4','5','6','7','8','9','Backspace','Tab'].indexOf(evt.key)!==-1){}
		else{
			evt.preventDefault();
		}
	});
	dob.addEventListener('keyup',function(evt){
		if(evt.target.matches("#dob")){
			var lengthValue=evt.target.value.length;
		};
		if(lengthValue==2 && evt.key!=='Backspace'||lengthValue==5 && evt.key!=='Backspace'){
			dob.value+="/";
			document.getElementById('dob').value=dob.value;
		};
		var splitDOB=dob.value.split('/');
		var day=splitDOB[0];
		var month=splitDOB[1];
		var year=splitDOB[2];

		var today=new Date()
		const options={year:'numeric',month:'numeric',day:'numeric'};
		var today=(today.toLocaleDateString(undefined,options));

		var splitToday=today.split('/');
		var currentDay=splitToday[0];
		var currentMonth=splitToday[1];
		var currentYear=splitToday[2];

		var spaceYear=18;
		var error=0;

		if(dob.value.length>1){
			if(day>0 && day<=31){
				error=0;
			}else{
				error=1;
				document.getElementById('error').innerHTML='<div class="alert alert-danger" role="alert">Erreur de saisie.</div>';
				document.getElementById('dob').value='';
				dob.addEventListener('keydown',function(){
					document.getElementById('error').innerHTML='';
					error=0;
				});
			}
		}
		if(dob.value.length>4){
			if(month>0 && month<=12){
				error=0;
			}else{
				error=1;
				document.getElementById('error').innerHTML='<div class="alert alert-danger" role="alert">Erreur de saisie.</div>';
				document.getElementById('dob').value=day+'/';
				dob.addEventListener('keydown',function(){
					document.getElementById('error').innerHTML='';
					error=0;
				});			
			}
		}
		if(dob.value.length==10){
			if((currentYear-year)>=spaceYear && (currentYear-year)>0){
				error=0;
			}else{
				error=1;
				document.getElementById('error').innerHTML='<div class="alert alert-danger" role="alert">Vous n\'êtes pas majeur.</div>';
				dob.addEventListener('keydown',function(){
					document.getElementById('error').innerHTML='';
					error=0;
				});
			}
			if((year>currentYear || year.length!=4) || year<=1930){
				error=1;
				document.getElementById('error').innerHTML='<div class="alert alert-danger" role="alert">Erreur de saisie.</div>';
				dob.addEventListener('keydown',function(){
					document.getElementById('error').innerHTML='';
					error=0;
				});
			}
		}
		if(dob.value.length!==10){error=1;}
		if(error===1){submitBtn.disabled=true;}
		else{submitBtn.disabled=false;}
	});
}
if(phone){
	phone.addEventListener('keydown',function validPhone(evt){
		if(['0','1','2','3','4','5','6','7','8','9','Backspace','Tab'].indexOf(evt.key)!==-1){}
		else{
			evt.preventDefault();
		}
	});
	
}
if(cpostal){
	cpostal.addEventListener('keydown',function validcpostal(evt){
		if(['0','1','2','3','4','5','6','7','8','9','Backspace','Tab'].indexOf(evt.key)!==-1){}
		else{
			evt.preventDefault();
		}
	});
}


/*<!-- ########################################################################## -->*/
/*<!-- ###                            CONTACT FORM                            ### -->*/
/*<!-- ########################################################################## -->*/

//Déclaration des variables
const name=document.getElementById('name');
const fname=document.getElementById('fname');
const email=document.getElementById('email');
const subject=document.getElementById('subject');
const msg=document.getElementById('msg');
const form=document.getElementById('contactForm');

//Création d'un évènement à la soumission du formulaire
if(form){
	form.addEventListener('submit', function(evt){
		evt.preventDefault();
		checkInputs();
	})
	//Création d'une fonction pour vérifier la saisie de l'utilisateur
	function checkInputs(){
		//Les valeurs saisies par l'utilisateur dans les inputs sont récupérées puis affectées à des variables
		//La fonction trim() permet de retirer les espaces en début et fin de string que l'utilisateur aurait pû saisir
		const nameValue=name.value.trim();
		const fnameValue=fname.value.trim();
		const emailValue=email.value.trim();
		const subjectValue=subject.value.trim();
	
		if(nameValue==''){
			setErrorFor(name, "Veuillez saisir votre nom.");
			return false;
			//Appel à une fonction qui crée un msg pour signaler à l'utilisateur qu'il y a une erreur de saisie.
			//Ajout de la classe 'error' à l'input (visuel déjà préparé au niveau du CSS)
		}else if(nameValue!=''){
			function validName(){
				var nameRexExp=new RegExp("^[a-zA-Z'-]+$");
				var testName=nameRexExp.test(nameValue);
				if(testName===false){
					setErrorFor(name, "Nom saisi non valide.");
					return false;
				}else{
					setSuccessFor(name);
				}
			}validName();
		}else{
			//Sinon simple ajout de la classe 'success' en faisant appel à une nouvelle fonction
			setSuccessFor(name);
		}
		if(fnameValue==''){
			setErrorFor(fname, "Veuillez saisir votre prénom.");
		}else if(fnameValue!=''){
			function validFirstname(){
				var fnameRexExp=new RegExp("^[a-zA-Zçëèéï'-]+$");
				var testFirstname=fnameRexExp.test(fnameValue);
				if(testFirstname===false){
					setErrorFor(fname, "Prénom saisi non valide.");
					return false;
				}else{
					setSuccessFor(fname);
				}
			}validFirstname();
		}else{
			setSuccessFor(fname);
		}
		if(emailValue==''){
			setErrorFor(email, "Veuillez saisir votre mail.");
			return false;
		}else if(emailValue!=""){
			//Création d'une expression régulière pour validation de l'email
			function validEmail(){
				//Définition des caractères autorisés avec l'exp régulière RegExp() qui sont affectés dans une valeur
				var emailRegExp=new RegExp("^[a-zA-Z0-9-._]+@{1}[a-zA-Z0-9-._]+[.]{1}[a-z]{2,3}$",'g');
				//Test sur la valeur saisie dans l'input par l'utilisateur
				var testEmail=emailRegExp.test(emailValue);
				/*2 conditions: 
				- 1)false: la valeur saisie n'est pas autorisée : classe error appliquée à l'input + message d'erreur de saisie
				- 2) true: valeur autorisée, mail valide*/
				if(testEmail===false){
					setErrorFor(email, "Mail saisi non valide.");
					return false;
				}else{
					setSuccessFor(email);
				}
			}validEmail();		
		}else{
			setSuccessFor(email);
		}
		if(subjectValue==''){
			setErrorFor(subject, "Veuillez saisir un objet.");
			return false;
		}else{
			setSuccessFor(subject);
		}
		var msg=document.getElementById('msg').value;
		if(msg.length==0){
			setErrorForText(document.getElementById('msg'),'Veuillez saisir un message.');
			return false;
		}else{
			var msgValue=msg.trim();
			if(msgValue==0){
				setErrorForText(document.getElementById('msg'),'Veuillez saisir un message.');
				return false;
			}
		}
	}
	function setErrorFor(input,message){
		var formInput=input.parentElement; //Les inputs sont tous les enfants d'une div ayant la classe 'formInput'
		var small=formInput.querySelector('small');
		//Création d'un message d'erreur intégré à la page HTML sur la balise <small>
		small.innerText=message;
		//Ajout à l'élément parent de l'input (div class="formInput) la classe 'error'
		formInput.className='formInput error';
	}
	function setErrorForText(input,message){
		var formInput=input.parentElement; //Les inputs sont tous les enfants d'une div ayant la classe 'formInput'
		var small=formInput.querySelector('small');
		//Création d'un message d'erreur intégré à la page HTML sur la balise <small>
		small.innerText=message;
		//Ajout à l'élément parent de l'input (div class="formInput) la classe 'error'
		formInput.className='formTextarea error';
	}
	function setSuccessFor(input){
		var formInput=input.parentElement;
		formInput.className='formInput success';
	}
	
	//Fonction anonyme qui s'appelle toute seule au déclanchement de l'évènement 'keyup'
	(function(){
		document.addEventListener('keyup', function(evt){
			//evt.target = l'objet qui a déclenché l'évènement
			//Si l'élément sélectionné par le sélecteur (id=msg) alors exécuter les instructions
			if(evt.target.matches("#msg")){
				//Déclaration des variables
				var msgValue=evt.target.value;
				var lengthValue=evt.target.value.length;
				//La valeur de l'attribut maxlength (480) actuellement considérée comme une string est convertie en nombre avec la méthode parseInt() et affectée dans une variable
				var maxChar=parseInt(evt.target.getAttribute('maxlength'));
				//Déclaration d'une nouvelle variable à laquelle on affecte la différence entre le nb max de caractères et la longueur de la valeur saisie par l'utilisateur
				var charLeft=maxChar-lengthValue;
				var formTextarea=evt.target.parentElement;
				var small=formTextarea.querySelector('#char');
				if(charLeft<=1){
					small.innerText=charLeft+" caractère restant.";
				}else{
					small.innerText=charLeft+" caractères restants.";
				}			
				formTextarea.className='formTextarea write';
			}
		})
	})();
}


/*<!-- ########################################################################## -->*/
/*<!-- ###                             LOG IN PAGE                            ### -->*/
/*<!-- ########################################################################## -->*/

const forgotPassword=document.getElementById("forgot");
if(forgotPassword){
	forgotPassword.addEventListener('click', function(evt){
		evt.preventDefault();
		document.getElementById('hidden').style.display="inline";
		document.getElementById('main').style.marginTop="5%";
	});
}