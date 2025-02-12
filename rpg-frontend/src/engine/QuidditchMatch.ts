import { QuidditchTeam } from './QuidditchTeam';

export class QuidditchMatch {
    private team1: QuidditchTeam;
    private team2: QuidditchTeam;

    constructor(team1: QuidditchTeam, team2: QuidditchTeam) {
        team1.initializeTeamMatchData(team2);
        team2.initializeTeamMatchData(team1);
        this.team1 = team1;
        this.team2 = team2;
    }
    // Getters and Setters

    public getTeam1() {
        return this.team1;
    }
    public getTeam2() {
        return this.team2;
    }
}
