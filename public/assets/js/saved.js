import {getAll, getById, deleteById, isExist, saveForLater} from './db.js';
import {setClubById} from './club.js';
import {utcToWib} from './helper.js';

const getSaved = () => {
    setSaved().then(() => {
        getAll('clubs').then(data => {
            setSavedClub(data);
        })
        .then(() => {
            getAll('matches').then(data => {
                setSavedMatch(data);
            })
        })
    })
}

const getSavedClubById = () => {
    let urlParams = new URLSearchParams(window.location.search);
    let idParam = parseInt(urlParams.get('id'));
    getById(idParam, 'clubs').then(data => {
        setClubById(data);
    });
}

const deleteSavedClubById = () => {
    return new Promise((resolve, reject) => {
        let urlParams = new URLSearchParams(window.location.search);
        let idParam = parseInt(urlParams.get('id')); // ubah id menjadi integer
        let deleteItem = deleteById(idParam, 'clubs');
        resolve(deleteItem);
    })
}

const setSaved = () => {
    return new Promise((resolve, reject) => {
        let savedPage = `
            <div class="col s12 m12 l12">
                <ul class="tabs marginB30 club-tabs" id="clubTabs">
                    <li class="tab col l6"><a href="#savedMatch">Saved Matches</a></li>
                    <li class="tab col l6"><a href="#savedClub">Saved Clubs</a></li>
                </ul>
            </div>
            <div id="savedMatch">
            </div>
            <div id="savedClub">
            </div>
        `;
        document.getElementById('savedHTML').innerHTML = savedPage;

        // init tabs
        let savedTabs = document.querySelectorAll('.tabs')
        for (let i = 0; i < savedTabs.length; i++) {
            M.Tabs.init(savedTabs[i]);
        }
        resolve(savedPage);
    });
}

const setSavedClub = data => {
    let clubData = ``;
    if (data.length < 1) {
        clubData +=`
        <div class="col s12 paddingTB20">
            <h6>No Saved Club</h6>
        </div>
        `;
    }
    else {
        data.forEach(club => {
            let logoClub = club.crestUrl;
            // jika logo hasil fetch dari server null
            if(logoClub == null) {
                logoClub = '../assets/images/icon-512x512.png';
            }
            clubData += `
                <div class="col l2 m3 s4 center-align paddingTB20">
                    <a href="./club-detail.html?id=${club.id}&saved=true">
                        <img src="${logoClub}" alt="${club.shortName}" height="50">
                        <p>${club.shortName}</p>
                    </a>
                </div>
            `;
        });
    }
    document.getElementById('savedClub').innerHTML = clubData;
}

const setSavedMatch = data => {
    let matchHTML = '';
    let classBookmark = '';
    if (data.length < 1) {
        matchHTML +=`
        <div class="col s12 paddingTB20">
            <h6>No Saved Matches</h6>
        </div>
        `;
        document.getElementById('savedMatch').innerHTML = matchHTML;
    }
    else {
        data.forEach(team => {
            isExist(team.id, 'matches')
            .then(data => {
                if(data === 1){
                    classBookmark = 'codesport-bookmark';
                }
                else {
                    classBookmark = 'codesport-bookmark-o';
                }
                matchHTML += `
                    <div class="col s12 m6 matchBookmark">
                        <div class="card horizontal home-card">
                            <div class="card-stacked">
                                <div class="card-content">
                                    <p class="center">${utcToWib(new Date(team.utcDate))}</p>
                                    <p  class="center font16 fontBolder">${team.homeTeam.name}</p>
                                    <p class="center">vs</p>
                                    <p  class="center font16 fontBolder">${team.awayTeam.name}</p>
                                    <p class="center font12">${team.group}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                document.getElementById('savedMatch').innerHTML = matchHTML;
            });
        });
    }
}

const bookmark = (dataLength) => {
    let matchBookmark = document.querySelectorAll('.matchBookmark');
    for (let i = 0; i < matchBookmark.length; i++) {
        matchBookmark[i].addEventListener('click', event => {
            let matchID = document.getElementById(`${event.target.id}`);
            let clickID = parseInt(event.target.id);
            if(clickID === dataLength[i].id) {
                isExist(clickID, 'matches')
                .then(data => {
                    if(data === 1) {
                        deleteById(clickID, 'matches')
                        matchID.classList.remove('codesport-bookmark');
                        matchID.classList.add('codesport-bookmark-o');
                    }
                    else {
                        saveForLater(dataLength[i], 'matches');
                        matchID.classList.remove('codesport-bookmark-o');
                        matchID.classList.add('codesport-bookmark');
                    }
                });
            }            
        });
    }
}

export {getSaved, getSavedClubById, deleteSavedClubById, bookmark};