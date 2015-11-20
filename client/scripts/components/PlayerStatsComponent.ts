///<reference path="../../bower_components/angular2/angular2.d.ts" />

import {Component, View, NgFor, NgIf, Inject} from 'angular2/angular2';
import {PlayerModel, CurrentPlayerModel} from '../models/PlayerModel';

@Component({
    selector: 'player-stats'
//    properties: ['playerModel']
})

@View({
    template: `
        <div class="uk-panel uk-panel-box uk-text-center">
            <img class="uk-border-circle" width="120" height="120" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxNi4wLjQsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkViZW5lXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB3aWR0aD0iMTIwcHgiIGhlaWdodD0iMTIwcHgiIHZpZXdCb3g9IjAgMCAxMjAgMTIwIiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCAxMjAgMTIwIiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxyZWN0IGZpbGw9IiNGRkZGRkYiIHdpZHRoPSIxMjAiIGhlaWdodD0iMTIwIi8+DQo8Zz4NCgk8cGF0aCBmaWxsPSIjRTBFMEUwIiBkPSJNMTA5LjM1NCw5OS40NzhjLTAuNTAyLTIuODA2LTEuMTM4LTUuNDA0LTEuOTAzLTcuODAxYy0wLjc2Ny0yLjM5Ny0xLjc5Ny00LjczMi0zLjA5My03LjAxMQ0KCQljLTEuMjk0LTIuMjc2LTIuNzc4LTQuMjE3LTQuNDU1LTUuODIzYy0xLjY4MS0xLjYwNC0zLjcyOS0yLjg4Ny02LjE0OC0zLjg0NmMtMi40MjEtMC45NTgtNS4wOTQtMS40MzgtOC4wMTctMS40MzgNCgkJYy0wLjQzMSwwLTEuNDM3LDAuNTE2LTMuMDIsMS41NDVjLTEuNTgxLDEuMDMyLTMuMzY3LDIuMTgyLTUuMzU1LDMuNDVjLTEuOTksMS4yNzEtNC41NzgsMi40MjEtNy43NjUsMy40NTENCgkJQzY2LjQxLDgzLjAzNyw2My4yMSw4My41NTIsNjAsODMuNTUyYy0zLjIxMSwwLTYuNDEtMC41MTUtOS41OTgtMS41NDZjLTMuMTg4LTEuMDMtNS43NzctMi4xODEtNy43NjUtMy40NTENCgkJYy0xLjk5MS0xLjI2OS0zLjc3NC0yLjQxOC01LjM1NS0zLjQ1Yy0xLjU4Mi0xLjAyOS0yLjU4OC0xLjU0NS0zLjAyLTEuNTQ1Yy0yLjkyNiwwLTUuNTk4LDAuNDc5LTguMDE3LDEuNDM4DQoJCWMtMi40MiwwLjk1OS00LjQ3MSwyLjI0MS02LjE0NiwzLjg0NmMtMS42ODEsMS42MDYtMy4xNjQsMy41NDctNC40NTgsNS44MjNjLTEuMjk0LDIuMjc4LTIuMzI2LDQuNjEzLTMuMDkyLDcuMDExDQoJCWMtMC43NjcsMi4zOTYtMS40MDIsNC45OTUtMS45MDYsNy44MDFjLTAuNTAyLDIuODAzLTAuODM5LDUuNDE1LTEuMDA2LDcuODM1Yy0wLjE2OCwyLjQyMS0wLjI1Miw0LjkwMi0wLjI1Miw3LjQ0DQoJCWMwLDEuODg0LDAuMjA3LDMuNjI0LDAuNTgyLDUuMjQ3aDEwMC4wNjNjMC4zNzUtMS42MjMsMC41ODItMy4zNjMsMC41ODItNS4yNDdjMC0yLjUzOC0wLjA4NC01LjAyLTAuMjUzLTcuNDQNCgkJQzExMC4xOTIsMTA0Ljg5MywxMDkuODU3LDEwMi4yOCwxMDkuMzU0LDk5LjQ3OHoiLz4NCgk8cGF0aCBmaWxsPSIjRTBFMEUwIiBkPSJNNjAsNzguMTZjNy42MiwwLDE0LjEyNi0yLjY5NiwxOS41Mi04LjA4OGM1LjM5Mi01LjM5Myw4LjA4OC0xMS44OTgsOC4wODgtMTkuNTE5DQoJCXMtMi42OTYtMTQuMTI2LTguMDg4LTE5LjUxOUM3NC4xMjYsMjUuNjQzLDY3LjYyLDIyLjk0Niw2MCwyMi45NDZzLTE0LjEyOCwyLjY5Ny0xOS41MTksOC4wODkNCgkJYy01LjM5NCw1LjM5Mi04LjA4OSwxMS44OTctOC4wODksMTkuNTE5czIuNjk1LDE0LjEyNiw4LjA4OSwxOS41MTlDNDUuODcyLDc1LjQ2NCw1Mi4zOCw3OC4xNiw2MCw3OC4xNnoiLz4NCjwvZz4NCjwvc3ZnPg0K" alt="">
            <h3>Name</h3>
            <!--p>Lorem ipsum dolor sit amet, consectetur adipisici elit, sed eiusmod tempor incidunt ut.</p-->
        </div>

        <div class="uk-panel">
            <h3 class="uk-panel-title">S.P.E.C.I.A.L</h3>
            <ul class="uk-list uk-list-line">
                <li><b>Level</b>: {{playerModel?.level}}
                    <a class="uk-button" *ng-if="playerModel?.level > 0" (click)="onRankDecrease()">-</a>
                    <a class="uk-button" (click)="onRankIncrease()">+</a>
                </li>
                <li><b>Strength</b>: {{playerModel?.strength}}
                    <a class="uk-button" *ng-if="playerModel?.level > 0" (click)="onDecrease('strength')">-</a>
                    <a class="uk-button" *ng-if="playerModel?.level < 10" (click)="onIncrease('strength')">+</a>
                </li>
                <li><b>Perception</b>: {{playerModel?.perception}}
                    <a class="uk-button" *ng-if="playerModel?.level > 0" (click)="onDecrease('perception')">-</a>
                    <a class="uk-button" *ng-if="playerModel?.level < 10" (click)="onIncrease('perception')">+</a>
                </li>
                <li><b>Endurance</b>: {{playerModel?.endurance}}
                    <a class="uk-button" *ng-if="playerModel?.level > 0" (click)="onDecrease('endurance')">-</a>
                    <a class="uk-button" *ng-if="playerModel?.level < 10" (click)="onIncrease('endurance')">+</a>
                </li>
                <li><b>Charisma</b>: {{playerModel?.charisma}}
                    <a class="uk-button" *ng-if="playerModel?.level > 0" (click)="onDecrease('charisma')">-</a>
                    <a class="uk-button" *ng-if="playerModel?.level < 10" (click)="onIncrease('charisma')">+</a>
                </li>
                <li><b>Intelligence</b>: {{playerModel?.intelligence}}
                    <a class="uk-button" *ng-if="playerModel?.level > 0" (click)="onDecrease('intelligence')">-</a>
                    <a class="uk-button" *ng-if="playerModel?.level < 10" (click)="onIncrease('intelligence')">+</a>
                </li>
                <li><b>Agility</b>: {{playerModel?.agility}}
                    <a class="uk-button" *ng-if="playerModel?.level > 0" (click)="onDecrease('agility')">-</a>
                    <a class="uk-button" *ng-if="playerModel?.level < 10" (click)="onIncrease('agility')">+</a>
                </li>
                <li><b>Luck</b>: {{playerModel?.luck}}
                    <a class="uk-button" *ng-if="playerModel?.level > 0" (click)="onDecrease('luck')">-</a>
                    <a class="uk-button" *ng-if="playerModel?.level < 10" (click)="onIncrease('luck')">+</a>
                </li>
            </ul>
            <div class="uk-form" *ng-if="! playerModel?.userId">
                <div>Enter your email to keep your data, otherwise you will lost alll information after page refresh:</div>
                <div><input class="uk-input" #inputword (keyup)="doneTyping($event)" /> <a class="uk-button"  (click)="setUserId(inputword)">set / load</a></div>
            </div>

            <iframe src="https://ghbtns.com/github-btn.html?user=cajoy&repo=falloutlab.com&type=watch&count=true&size=large&v=2" frameborder="0" scrolling="0" width="160px" height="30px"></iframe>
        </div>
    `,
    directives: [NgFor, NgIf]
})


export class PlayerStatsComponent {
    playerModel: PlayerModel;

    constructor( @Inject(CurrentPlayerModel) currentPlayerModel: CurrentPlayerModel) {
        this.playerModel = currentPlayerModel;
        // this.playerModel = new PlayerModel();
    }

    onChanges(test) {
        console.log('changes', test);
    }

    onIncrease(type: string) {
        if (this.playerModel[type] === 10) {
            return;
        }

        ++this.playerModel[type];

        this.playerModel.updated();
    }

    onDecrease(type: string) {
        if (this.playerModel[type] === 0) {
            return;
        }

        --this.playerModel[type];

        this.playerModel.updated();
    }

    onRankIncrease(type: string) {
        ++this.playerModel.level;

        this.playerModel.updated();
    }

    onRankDecrease(type: string) {
        if (this.playerModel.level < 1)  {
            return;
        }

        --this.playerModel.level;

        console.log(this.playerModel.level);

        this.playerModel.updated();
    }

    doneTyping($event) {
        if ($event.which === 13) {
            this.playerModel.userId = $event.target.value;

            this.playerModel.updated();
        }
    }

    setUserId(input) {
        this.playerModel.userId = input.value;

        this.playerModel.setId();
    }
}
