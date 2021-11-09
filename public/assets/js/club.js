import {getAPIData, competitionID} from './api.js';
import {monthFormat} from './helper.js';

const getClub = () => {
    let endpoint = `competitions/${competitionID}/teams`;
    getAPIData(endpoint, setClub, 'clubHTML');
}

const getClubById = () => {
    return new Promise((resolve, reject) => {
        let urlParams = new URLSearchParams(window.location.search);
        let idParam = urlParams.get('id');
        let endpoint = `teams/${idParam}`;
        let resultData = getAPIData(endpoint, setClubById, 'clubDetailHTML');
        resolve(resultData);
    });
}

const setClub = data => {
    let clubData = `
        <h5 class="title paddingL0">${data.competition.name} Season  ${data.season.startDate.substr(0,4)} - ${data.season.endDate.substr(0,4)} Clubs</h5>
    `;
    data.teams.forEach(team => {
        let logoClub = team.crestUrl;
        // jika logo hasil fetch dari server null
        if(logoClub == null) {
            logoClub = '../assets/images/icon-512x512.png';
        }
        clubData += `
            <div class="col l2 m3 s4 center-align paddingTB20">
                <a href="./club-detail.html?id=${team.id}">
                    <img src="${logoClub}" alt="${team.shortName}" height="50">
                    <p>${team.shortName}</p>
                </a>
            </div>
        `;
    })
    document.getElementById('clubHTML').innerHTML = clubData;
}

const setClubById = data => {
    let squadHTML = '';
    data.squad.forEach(dataSquad => {
        squadHTML += `
            <tr>
                <td>${dataSquad.name}</td>
                <td>${dataSquad.position == null ? '-':dataSquad.position}</td>
                <td>${monthFormat(new Date(dataSquad.dateOfBirth))}</td>
                <td>${dataSquad.countryOfBirth}</td>
                <td>${dataSquad.nationality}</td>
                <td>${dataSquad.role.replace('_', ' ')}</td>
            </tr>
        `;
    });
    let logoClub = data.crestUrl;
        // jika logo hasil fetch dari server null
        if(logoClub == null) {
            logoClub = '../assets/images/icon-512x512.png';
        }
    let clubDataById = `
        <div class="col s12 m12 l12">
            <ul class="tabs marginB30 club-tabs" id="clubTabs">
                <li class="tab col l6"><a href="#overview">Overview</a></li>
                <li class="tab col l6"><a href="#squad">Squad</a></li>
            </ul>
        </div>
        <div id="overview">
            <div class="col s12 m6 l4 center-align">
                <img class="imgClubDetail" src="${logoClub}" alt="${data.shortName}">
            </div>
            <div class="col s12 m6 l8">
                <ul class="collection">
                    <li class="collection-item clubDetail">Club Name</li>
                    <li class="collection-item">${data.name}</li>
                </ul>
                <ul class="collection">
                    <li class="collection-item clubDetail">Short Name</li>
                    <li class="collection-item">${data.shortName}</li>
                </ul>
                <ul class="collection">
                    <li class="collection-item clubDetail">Three-Letter Acronym (TLA)</li>
                    <li class="collection-item">${data.tla}</li>
                </ul>
                <ul class="collection">
                    <li class="collection-item clubDetail">Address</li>
                    <li class="collection-item">${data.address}</li>
                </ul>
                <span id="showMore">
                <ul class="collection">
                    <li class="collection-item clubDetail">Phone</li>
                    <li class="collection-item">${data.phone}</li>
                </ul>
                <ul class="collection">
                    <li class="collection-item clubDetail">Website</li>
                    <li class="collection-item">${data.website}</li>
                </ul>
                <ul class="collection">
                    <li class="collection-item clubDetail">Email</li>
                    <li class="collection-item">${data.email}</li>
                </ul>
                <ul class="collection">
                    <li class="collection-item clubDetail">Founded</li>
                    <li class="collection-item">${data.founded}</li>
                </ul>
                <ul class="collection">
                    <li class="collection-item clubDetail">Club Colors</li>
                    <li class="collection-item">${data.clubColors}</li>
                </ul>
                    <ul class="collection">
                    <li class="collection-item clubDetail">Venue</li>
                    <li class="collection-item">${data.venue}</li>
                </ul>
                </span>
                <div class="center">
                <a href="#" id="showMoreBtn">Show More</a>
                </div>
            </div>
        </div>
        <div id="squad">
                <div class="white padding010">
                <table class="responsive-table highlight white scroll">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Position</th>
                            <th>Date Of Birth</th>
                            <th>Country Of Birth</th>
                            <th>Nationality</th>
                            <th>Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${squadHTML}
                    </tbody>
                </table>
            </div>
        </div>
    `;
    document.getElementById('clubDetailHTML').innerHTML = clubDataById;

    // init tabs
    let clubTabs = document.querySelectorAll('.tabs')
    for (let i = 0; i < clubTabs.length; i++){
        M.Tabs.init(clubTabs[i]);
    }

    // show more button
    const showMoreBtn = document.getElementById('showMoreBtn');
    const showMore = document.getElementById('showMore');
    showMoreBtn.addEventListener('click', () => {
        if (showMore.style.display === 'inline') {
            showMore.style.display = 'none';
            showMoreBtn.innerHTML = "Show More";
        }
        else {
            showMore.style.display = 'inline';
            showMoreBtn.innerHTML = 'Show Less';
        }
    });
}

export {getClub, getClubById, setClubById};