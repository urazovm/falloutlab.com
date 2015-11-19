///<reference path="../../bower_components/angular2/angular2.d.ts" />

import {Component, View, NgFor, NgIf, Inject} from 'angular2/angular2';
import {PerkResource, PerkModel, PlayerPerk} from '../models/PerkModel';
import {CurrentPlayerModel} from '../models/PlayerModel';
import {PerksPlannerTableComponent} from './PerksPlannerTableComponent';

@Component({
    selector: 'perks-planner',
//    properties: ['playerModel'],
    providers: [PerkResource]
})

@View({
    template: `
        <article class="uk-article">
            <h1 class="uk-article-title">
                <h1>Perks Planner</h1>
            </h1>

            <perks-planner-table [perks]="currentPerks" name="Current Perks" (like)="onPerkLike($event)" (dislike)="onPerkDislike($event)" (current)="onPerkCurrent($event)"></perks-planner-table>
            <perks-planner-table [perks]="availablePerks" name="Available Perks" (like)="onPerkLike($event)" (dislike)="onPerkDislike($event)" (current)="onPerkCurrent($event)"></perks-planner-table>
            <perks-planner-table [perks]="blockedPerks" name="Blocked Perks" (like)="onPerkLike($event)" (dislike)="onPerkDislike($event)" (current)="onPerkCurrent($event)"></perks-planner-table>
            <perks-planner-table [perks]="dislikePerks" name="Dislike Perks" (like)="onPerkLike($event)" (dislike)="onPerkDislike($event)" (current)="onPerkCurrent($event)"></perks-planner-table>
        </article>
    `,
    directives: [NgFor, NgIf, PerksPlannerTableComponent]
})

export class PerksPlannerComponent {
    allPerks: Array<PerkModel> = [];
    perkResource: PerkResource;
    playerModel: CurrentPlayerModel;
    currentPerks: Array<PlayerPerk> = [];
    availablePerks: Array<PlayerPerk> = [];
    blockedPerks: Array<PlayerPerk> = [];
    dislikePerks: Array<PlayerPerk> = [];
    dependeciesList: Array<PerkModel> = [];

    constructor( @Inject(PerkResource) perkResource: PerkResource, @Inject(CurrentPlayerModel) currentPlayerModel: CurrentPlayerModel) {
        this.perkResource = perkResource;
        this.playerModel = currentPlayerModel;

        this.loadPerks();

        this.playerModel.onChanges(() => {
            console.log('test');
            this.sortPerks();
        });
    }

    loadPerks() {
        console.log('loading');
        console.log(this);

        this.perkResource.find()
            .then(perkList => {
                this.allPerks = perkList;

                this.sortPerks();
            });
    }

    onPerkLike(playerPerk: PlayerPerk) {
        this.playerModel.like(playerPerk.perk);
    }

    onPerkDislike(playerPerk: PlayerPerk) {
        console.log('dislike');
        this.playerModel.dislike(playerPerk.perk);
    }

    onPerkCurrent(playerPerk: PlayerPerk) {
        console.log('current');
        this.playerModel.current(playerPerk.perk);
    }


    // onInit() {
    //     //this.loadPerks();
    //     setTimeout(() => this.loadPerks(), 3000);
    // }

    onChanges(change) {
        console.log('change', change);
    }

    getDependeciesList() {
        var dependencyList = [];

        this.playerModel.desiredPerks.forEach(desiredPerk => {
            this.allPerks.forEach(perk => {
                if (desiredPerk.name === perk.name && !this.playerHasPerk(perk)) {
                    if (perk.rank < desiredPerk.rank) {
                        dependencyList.push(perk);
                    }
                }
            });
        });

        return dependencyList;
    }

    playerHasPerk(perk: PerkModel) {
        for (var i = this.playerModel.currentPerks.length - 1; i >= 0; i--) {
            if (this.playerModel.currentPerks[i].idInternal === perk.idInternal) {
                return true;
            }
        }

        return false;
    }

    sortPerks() {
        this.currentPerks   = [];
        this.availablePerks = [];
        this.blockedPerks   = [];
        this.dislikePerks   = [];
        this.dependeciesList = this.getDependeciesList();

        this.allPerks.forEach(perk => {
            var userPerk = new PlayerPerk(perk, this.playerModel, this.allPerks, this.dependeciesList);

            if (userPerk.isCurrent()) {
                this.currentPerks.push(userPerk);
            } else if (userPerk.isAvailable()) {
                this.availablePerks.push(userPerk);
            } else if (userPerk.isBlocked()) {
                this.blockedPerks.push(userPerk);
            } else if (userPerk.isDislike()) {
                this.dislikePerks.push(userPerk);
            } else {
                throw new Exception('Unknown list for perk: ' + userPerk.perk.name);
            }
        });

        console.log(this);

        this.orderPerks(this.currentPerks);
        this.orderPerks(this.availablePerks);
        this.orderPerks(this.blockedPerks);
        this.orderPerks(this.dislikePerks);
    }

    orderPerks(perksList) {
        perksList.forEach((item, index) =>  {
            const isPreferable = item.isPreferable() ? 9000 : 1000;
            const isDependency = item.isDependency() ? 900 : 100;
            const level        = 90 - item.level;

            item.order = isPreferable + isDependency + level;
        });

        perksList.sort(function (a, b) {
            if (a.order > b.order) {
                return -1;
            } else if (a.order < b.order) {
                return 1;
            }

            return 0;
        });
    }
}
