import {getAPIData, competitionID} from './api.js';
import {utcToWib} from './helper.js';

const getScores = () => {
    let endpoint = `competitions/${competitionID}/matches`;
    getAPIData(endpoint, setScore, 'scoreHTML');
}

const setScore = data => {
    let matchHTML = `
        <h5 class="title paddingL0">${data.competition.name} Scores</h5>
        <p>Last Updated: ${utcToWib(new Date(data.competition.lastUpdated))}</p>
    `;
    let matchData = '';
     data.matches.forEach(team => {
        let homeScore = team.score.fullTime.homeTeam == null ? 0 : team.score.fullTime.homeTeam;
        let awayScore = team.score.fullTime.awayTeam == null ? 0 : team.score.fullTime.awayTeam;
        matchData += `
            <tr>
                <td>${utcToWib(new Date(team.utcDate))}</td>
                <td>${team.status}</td>
                <td>${team.homeTeam.name}</td>
                <td class="center-align">${homeScore}:${awayScore}</td>
                <td>${team.awayTeam.name}</td>
                <td>${team.group}</td>
            </tr>
        `;
     });
    matchHTML += `
        <div class="card">
            <div class="card-content">
                <table class="responsive-table highlight">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Home</th>
                            <th>Score</th>
                            <th>Away</th>
                            <th>Group</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${matchData}
                    </tbody>
                </table>
            </div>
        </div>
    `;
    document.getElementById('scoreHTML').innerHTML = matchHTML;
}
export default getScores;