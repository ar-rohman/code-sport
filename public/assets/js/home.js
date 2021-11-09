import {getAPIData, competitionID} from './api.js';
import {utcToWib} from './helper.js';
import {bookmark} from './saved.js';
import {isExist} from './db.js';

const getHome = () => {
    let endpoint1 = `competitions/${competitionID}/`;
    let endpoint2 = `competitions/${competitionID}/matches?status=SCHEDULED`;
    let endpoint3 = `competitions/${competitionID}/matches?status=FINISHED`;
    getAPIData(endpoint1, setEmblem, 'emblem');
    getAPIData(endpoint2, setScheduled, 'emblem');
    getAPIData(endpoint3, setFinished, 'emblem');
}

const setEmblem = data => {
    let emblemHTML = `
        <div class="row">
            <div class="col s12 m6 l6 center">
                <img src="${data.emblemUrl}" alt="${data.name}" class="home-img padding-top-50">
            </div>
            <div class="col s12 m6 l6">
                <div class="bigTitle">${data.name}</div>
            </div>
        </div>
    `;
    document.getElementById('emblem').innerHTML = emblemHTML;
}

const setScheduled = data => {
    let matchHTML = '<div class="title">6 Upcoming Matches</div>';
    let limitData = data.matches.slice(0,6); 
    let classBookmark;
    limitData.forEach(team => {
        isExist(team.id, 'matches')
        .then(data => {
            if(data === 1) {
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
                                <div class="col s11">
                                    <p class="center">${utcToWib(new Date(team.utcDate))}</p>
                                    <p  class="center font16 fontBolder">${team.homeTeam.name}</p>
                                    <p class="center">vs</p>
                                    <p  class="center font16 fontBolder">${team.awayTeam.name}</p>
                                    <p class="center font12">${team.group}</p>
                                </div>
                                <div class="col s1">
                                    <div title="Bookmark">
                                        <span class="white-text pointer">
                                            <div class="${classBookmark}" id="${team.id}"></div>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            document.getElementById('scheduledMatch').innerHTML = matchHTML;
            bookmark(limitData);
        });
    });
}

const setFinished = data => {
    let matchHTML = '<div class="title">Last 6 Matches</div>';
    let limitData = data.matches.slice(Math.max(data.matches.length - 6, 0)); //get last 6 matches data
    
    limitData.forEach(team => {
        let homeScore = team.score.fullTime.homeTeam == null ? 0 : team.score.fullTime.homeTeam;
        let awayScore = team.score.fullTime.awayTeam == null ? 0 : team.score.fullTime.awayTeam;
        matchHTML += `
            <div class="col s12 m6">
                <div class="card horizontal home-card">
                    <div class="card-stacked">
                        <div class="card-content">
                            <p  class="center font16 fontBolder">${team.homeTeam.name}</p>
                            <p class="center score">${homeScore}:${awayScore}</p>
                            <p  class="center font16 fontBolder">${team.awayTeam.name}</p>
                            <p class="center font12">${team.group}</p>
                    </div>
                    </div>
                </div>
            </div>
        `;
    });
    document.getElementById('finishedMatch').innerHTML = matchHTML;
}

export default getHome;