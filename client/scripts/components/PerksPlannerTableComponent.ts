///<reference path="../../bower_components/angular2/angular2.d.ts" />

import {Component, View, NgFor, NgIf, EventEmitter} from 'angular2/angular2';
import {PlayerPerk} from '../models/PerkModel';

@Component({
    selector: 'perks-planner-table',
    properties: ['perks', 'name'],
    events: ['like: like', 'dislike: dislike', 'current: current', 'uncurrent: uncurrent']
})

@View({
    template: `
    <div>
        <h3>{{name}}</h3>
        <ul class="uk-list uk-list-line">
           <li *ng-for="#playerPerk of perks">
           <div class="uk-grid">
                <div class="uk-width-2-10">
                    <div class="uk-button-group">
                        <a class="uk-button uk-button-small uk-button-success" *ng-if="!playerPerk.isPreferable() && ! playerPerk.isCurrent()" (click)="onLikeClick(playerPerk)">Like</a>
                        <a class="uk-button uk-button-small uk-button-danger" *ng-if="! playerPerk.isCurrent() && ! playerPerk.isDislike() && ! playerPerk.isDependency()" (click)="onDislikeClick(playerPerk)">Dislike</a>
                        <a class="uk-button uk-button-small uk-button-primary" *ng-if="! playerPerk.isCurrent() &&  ! playerPerk.isBlocked()" (click)="onCurrentClick(playerPerk)">I have it</a>
                        <a class="uk-button uk-button-small" *ng-if="playerPerk.isCurrent()" (click)="onUnCurrentClick(playerPerk)">I don't have it</a>
                    </div>
                </div>
                <div class="uk-width-8-10"><b>{{ playerPerk.perk.name }}</b>
                    <span class="uk-badge uk-badge-success" *ng-if="playerPerk.isPreferable()">desirable</span>
                    <span class="uk-badge uk-badge-danger" *ng-if="playerPerk.isDislike()">dislike</span>
                    <!--span class="uk-badge uk-badge-warning" *ng-if="playerPerk.isBlocked()">blocked</span-->
                    <span class="uk-badge uk-badge-warning" *ng-if="! playerPerk.fitRank()">level: {{playerPerk.perk.characterLevel}}</span>
                    <span class="uk-badge uk-badge-warning" *ng-if="! playerPerk.fitSpecial()"> {{playerPerk.perk.attribute}}: {{playerPerk.perk.attributeLevel}}</span>
                    <span class="uk-badge uk-badge-warning" *ng-if="playerPerk.isDependency()">dependency</span>: {{ playerPerk.perk.description }}</div>
            </div>
           </li>
        </ul>
    </div>
    `,
    directives: [NgFor, NgIf]
})

export class PerksPlannerTableComponent {
    name: string;
    perks: Array<PlayerPerk>;
    like = new EventEmitter();
    dislike = new EventEmitter();
    current = new EventEmitter();
    uncurrent = new EventEmitter();

    constructor() {}

    onLikeClick(playerPerk: PlayerPerk) {
        this.like.next(playerPerk);
    }

    onDislikeClick(playerPerk: PlayerPerk) {
        this.dislike.next(playerPerk);
    }

    onCurrentClick(playerPerk: PlayerPerk) {
        this.current.next(playerPerk);
    }


    onUnCurrentClick(playerPerk: PlayerPerk) {
        this.uncurrent.next(playerPerk);
    }
}
