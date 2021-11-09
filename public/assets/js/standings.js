import {utcToWib} from './helper.js';
import {getAPIData, competitionID} from './api.js';

// melakukan request data json
const getStandings = () => {
    let endpoint = `competitions/${competitionID}/standings?standingType=TOTAL`;
    getAPIData(endpoint, setStandings, 'standings');
}

const setStandings = data => {
    let standingsData = `
        <h5 class="title paddingL0">${data.competition.name} Season ${data.season.startDate.substr(0,4)} - ${data.season.endDate.substr(0,4)} Standings</h5>
        <p>Last Updated: ${utcToWib(new Date(data.competition.lastUpdated))}</p>
    `;
    data.standings.forEach(std => {
        let standingTableData = '';
        std.table.forEach(stdTable => {
            standingTableData += `
                <tr>
                    <td>${stdTable.position}</td>
                    <td>
                        <a href="./club-detail.html?id=${stdTable.team.id}">
                            <div class="hide-on-small-only valign-wrapper">
                                <img class="show-on-medium-and-up show-on-medium-and-down imgStandings left" src=${stdTable.team.crestUrl}  alt="Logo  ${stdTable.team.name}">
                                ${stdTable.team.name}
                            </div>
                            <div class="hide-on-med-and-up">
                                <img class="imgStandings" src=${stdTable.team.crestUrl}  alt="Logo  ${stdTable.team.name}">
                            </div>
                        </a>
                    </td>
                    <td class="center-align">${stdTable.playedGames}</td>
                    <td class="center-align">${stdTable.won}</td>
                    <td class="center-align">${stdTable.draw}</td>
                    <td class="center-align">${stdTable.lost}</td>
                    <td class="center-align">${stdTable.goalsFor}</td>
                    <td class="center-align">${stdTable.goalsAgainst}</td>
                    <td class="center-align">${stdTable.goalDifference}</td>
                    <td class="center-align">${stdTable.points}</td>
                </tr>
            `;
        });
        standingsData += `
            <div class="card">
                <div class="card-content">
                <h5>${std.group.replace('_', ' ')}</h5>
                    <table class="responsive-table highlight">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Club</th>
                                <th>Played</th>
                                <th>Won</th>
                                <th>Drawn</th>
                                <th>Lost</th>
                                <th>Goals For</th>
                                <th>Goals Against</th>
                                <th>Goal Difference</th>
                                <th>Points</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${standingTableData}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    });
    document.getElementById('standings').innerHTML = standingsData;
}

export default getStandings;