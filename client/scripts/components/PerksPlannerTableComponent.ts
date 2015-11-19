///<reference path="../../bower_components/angular2/angular2.d.ts" />

import {Component, View, NgFor, NgIf, EventEmitter} from 'angular2/angular2';
import {PlayerPerk} from '../models/PerkModel';

@Component({
    selector: 'perks-planner-table',
    properties: ['perks', 'name'],
    events: ['like: like', 'dislike: dislike', 'current: current']
})

@View({
    template: `
    <div>
        <h4>{{name}}</h4>
        <ul class="uk-list">
           <li *ng-for="#playerPerk of perks">
           <div class="uk-grid">
                <div class="uk-width-2-10">
                    <div *ng-if="playerPerk.isPreferable()">desirable</div>
                    <div *ng-if="playerPerk.isDislike()">dislike</div>
                    <div *ng-if="playerPerk.isBlocked()">blocked</div>
                    <div *ng-if="playerPerk.isDependency()">dependency</div>
                    <div>  <a *ng-if="! playerPerk.isPreferable()" (click)="onLikeClick(playerPerk)">Like</a>
                    <a *ng-if="! playerPerk.isDislike()" (click)="onDislikeClick(playerPerk)">Dislike</a>
                    <a *ng-if="! playerPerk.isCurrent()" (click)="onCurrentClick(playerPerk)">I have it</a>
                    <a *ng-if="! playerPerk.isDislike()" (click)="onUnCurrentClick(playerPerk)">I don't have it</a></div>

                </div>
                <div class="uk-width-8-10"><i>{{ playerPerk.perk.name }}</i><br/>{{ playerPerk.perk.description }}</div>
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
}
