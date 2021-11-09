import getStandings from './standings.js';
import {getClub} from './club.js';
import getScores from './scores.js';
import {responseStatus, responseText, error} from './api.js';
import getHome from './home.js';
import {getSaved} from './saved.js';

document.addEventListener('DOMContentLoaded', () => {
	// load navbar
	const loadNav = () => {
		fetch('nav.html', {
			method: 'GET'
		})
		.then(responseStatus)
		.then(responseText)
		.then(navHTML => {
			// muat menu bar
			document.querySelectorAll('.topnav, .sidenav').forEach(elm => {
				elm.innerHTML = navHTML;
			});

			// daftarkan event  listener untuk setiap menu
			document.querySelectorAll('.sidenav a, .topnav a').forEach(elm => {
				elm.addEventListener('click', event => {
					
					// tutup sidenav
					let sidenav = document.querySelector('.sidenav');
					M.Sidenav.getInstance(sidenav).close();

					// Muat konten halaman yang dipanggil
					page = event.target.getAttribute('href').substr(1);
					loadPage(page);
				})
			})

			// tambah class active untuk menu yang di click 
			const elActive = document.querySelectorAll('ul li.navbar');
			elActive.forEach(elm => {
				elm.addEventListener('click', () => {
					for (let i = 0; i < elActive.length; i++) {
						if (elActive[i].classList.contains('active')) {
							elActive[i].classList.remove('active');
						}
					}
					elm.classList.add('active');
				});
			});
		})
		.catch(error);
	}

	// load page
	const loadPage = page => {
		fetch(`pages/${page}.html`, {
			method: 'GET'
		})
		.then(responseStatus)
		.then(responseText)
		.then(pageHTML => {
			const content = document.querySelector('#body-content');
			content.innerHTML = pageHTML;
			if (page === 'home') {
				getHome();
			}
			if(page === 'standings') {
				getStandings();
			}
			if(page === 'club') {
				getClub();
			}
			if(page === 'scores') {
				getScores();
			}
			if(page === 'saved') {
				getSaved();
			}
		})
		.catch(error);
	}

	// load sidebar, navbar
	const sidenav = document.querySelectorAll('.sidenav');
	M.Sidenav.init(sidenav);
	loadNav();
	
	// Load page content
	let page = window.location.hash.substr(1);
	if(page === '') page = 'home';
	loadPage(page);
});
