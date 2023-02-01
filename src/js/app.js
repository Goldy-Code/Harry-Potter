

const fetchData = async () => {
	try {
		const response = await axios("https://hp-api.onrender.com/api/characters");




		//! SEARCHER
		const searcher = document.getElementById('searcher');
		const searcherBar = document.querySelector('.searcherBar');
		const searcherX = document.getElementById('searcherX');
		const searchInput = document.getElementById('searchInput');


		searcher.addEventListener('click', () => {
			searcherBar.style = "transform: translateY(0%);";
		});
		searcherX.addEventListener('click', () => {
			searcherBar.style = "transform: translateY(-101%);";
			searchInput.value = "";
		});
		//* SEARCHER END

		//! CONTENT
		const content = document.querySelector('.content');

		const gryffindor = "src/img/gryffindor.png";
		const hufflepuff = "src/img/hufflepuff.png";
		const ravenclaw = "src/img/ravenclaw.png";
		const slytherin = "src/img/slytherin.png";
		const anonPng = "src/img/anon.png";

		function clan(thing) {
			let result =
				thing.house == "Gryffindor" ? gryffindor :
					thing.house == "Slytherin" ? slytherin :
						thing.house == "Hufflepuff" ? hufflepuff :
							thing.house == "Ravenclaw" ? ravenclaw : anonPng
			return result;
		}





		const anonMale = "src/img/male.png";
		const anonFemale = "src/img/female.png";


		function originalImg(img) {
			let sex = img.gender == "male" ? anonMale : anonFemale;
			let result =
				img.image == "" ? sex : img.image;
			return result;
		}


		function createCards(data) {
			const newArr = data.map((item) => {
				return (`
		<article id="${item.id}" class="card">
			<div class="frame">
			  <img
				class="content__img"
				src="${originalImg(item)}"
				alt="img"
			  />
			  <img class="clan clan-top" src="${clan(item)}" alt="clan">
			  <img class="clan clan-bot" src="${clan(item)}" alt="clan">
			</div>
		  </article>
				`)
			}).join('');

			content.innerHTML = newArr;
		}

		createCards(response.data);




		//* CONTENT END

		//! MODAL
		const modal__layer = document.querySelector('.modal__layer');




		function yesOrNo(thing) {
			let result =
				thing == true ? "yes" : "no";
			return result;
		}







		function foo(el) {
			const cell = response.data.filter((item) => item.id === el.id);
			const newCell = cell.map((item) => {
				return (`
				<div class="modal">
				<div class="ramka"></div>
				<article class="modal__card">
				  <img class="card__img" src="${originalImg(item)}" alt="" />
				  <ul class="modal__info">
					<li class="name">name: ${item.name}</li>
					<li class="species">species: ${item.species}</li>
					<li class="gender">gender: ${item.gender}</li>
					<li class="house">house: ${item.house === "" ? "no info" : item.house}</li>
					<li class="dateOfBirth">dateOfBirth: ${item.dateOfBirth === "" ? "no info" : item.dateOfBirth}</li>
					<li class="yearOfBirth">yearOfBirth: ${item.yearOfBirth}</li>
					<li class="wizard">wizard: ${yesOrNo(item.wizard)}</li>
					<li class="ancestry">ancestry: ${item.ancestry === "" ? "no info" : item.ancestry}</li>
					<li class="eyeColour">eyeColour: ${item.eyeColour === "" ? "no info" : item.eyeColour}</li>
				  </ul>
		
				  <ul class="modal__info">
					<li class="hairColour">hairColour: ${item.hairColour === "" ? "no info" : item.hairColour}</li>
					<li class="wood">wood: ${item.wand.wood === "" ? "no info" : item.wand.wood}</li>
					<li class="core">core: ${item.wand.core === "" ? "no info" : item.wand.core}</li>
					<li class="length">length: ${item.wand.length} inch</li>
					<li class="patronus">patronus: ${item.patronus === "" ? "no info" : item.patronus}</li>
					<li class="hogwartsStudent">hogwartsStudent: ${yesOrNo(item.hogwartsStudent)}</li>
					<li class="hogwartsStaff">hogwartsStaff: ${yesOrNo(item.hogwartsStaff)}</li>
					<li class="actor">actor: ${item.actor === "" ? "no info" : item.actor}</li>
					<li class="alive">alive: ${yesOrNo(item.alive)}</li>
				  </ul>
				  </article>
				  <i id="cardX" class="fa-solid fa-xmark"></i>
			  </div>
		`)
			}).join('');

			modal__layer.innerHTML = newCell;
			modal__layer.classList.add('modalActive');
		}



		//! NAV
		const nav__btn_All = document.querySelector('.nav__btn-All');
		nav__btn_All.addEventListener('click', () => {
			const cards = document.querySelectorAll('.card');
			cards.forEach((el) => {
				el.classList.add('animation');
			});

			setTimeout(() => {
				createCards(response.data);
				modalShit();
			}, 1500);
		});

		const nav__btn = document.querySelectorAll('.nav__btn');
		nav__btn.forEach((el) => {
			el.addEventListener('click', () => {

				let text = el.innerHTML;
				let clanFilter = response.data.filter((item) => item.house === text); //! pokazivayet
				const cards = document.querySelectorAll('.card');

				setTimeout(() => {
					createCards(clanFilter);
					modalShit();
				}, 1500);

				cards.forEach((el) => {
					el.classList.add('animation');
				});
			});
		});
		//! NAV END

		function modalShit() {
			const cards = document.querySelectorAll('.card');
			cards.forEach((el) => {
				el.addEventListener('click', () => {
					foo(el);
				});
			});
		}

		modalShit();

		modal__layer.addEventListener('click', () => {
			modal__layer.classList.remove('modalActive');
		});



		searchInput.addEventListener('input', () => {
			let value = searchInput.value.toLowerCase().trim();
			let clanInput = response.data.filter((item) => item.name.toLowerCase().trim().includes(value) || item.house.toLowerCase().trim().includes(value));
			const cards = document.querySelectorAll('.card');

			cards.forEach((el) => {
				el.classList.add('animation');
			});

			setTimeout(() => {
				createCards(clanInput);
				modalShit();
			}, 1500);
		})

		//* MODAL END


		const goUp = document.getElementById("goUp");
		window.addEventListener('scroll', () => {
			if (window.scrollY <= 300) {
				goUp.style = 'pointer-events: none; opacity: 0;';
			}
			if (window.scrollY >= 300) {
				goUp.style = 'pointer-events: all; opacity: 1;';
			}
		});


		const nav = document.querySelector(".nav");
		window.addEventListener('scroll', () => {
			if (window.scrollY <= 45) {
				nav.style = 'background-color: transparent;';
			}
			if (window.scrollY >= 45) {
				nav.style = 'background-color: #7a5003;';
			}
		});



		return response.data;
	} catch (error) {

		console.log(error);
	}
};

fetchData();





