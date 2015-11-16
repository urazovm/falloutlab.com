///<reference path="../../bower_components/angular2/angular2.d.ts" />

import {Component, View, NgFor, NgIf, Inject, Observable} from 'angular2/angular2';
import {PerkResource, PerkModel} from '../models/PerkModel';
import {PlayerModel, CurrentPlayerModel} from '../models/PlayerModel';
import {PerksPlannerTableComponent} from './PerksPlannerTableComponent';

class PlayerPerk {
    perk: PerkModel;
    player: PlayerModel;

    constructor(perk, player) {
        this.perk = perk;
        this.player = player;
    }

    isAvailable() {
        if (this.isCurrent()) {
            return false;
        }

        if (this.isDislike()) {
            return false;
        }

        if (! this.fitSpecial()) {
            return false;
        }

        if (!this.fitRank()) {
            return false;
        }
        // Fit SPECIAL
        // Fit Rank
        // not desired or Required for desired
        return true;
    }

    fitSpecial() {
        if (this.perk.attributeLevel > this.player[this.perk.attribute.toLowerCase()]) {
            return false;
        }

        return true;
    }

    fitRank() {
        if (this.player.level > this.perk.characterLevel) {
            return false;
        }

        return true;
    }

    isBlocked() {
        if (this.isAvailable()) {
            return false;
        }

        // Not SPECIAL Or Not Fit Rank
        // not desired or Required for desired
        return true;
    }

    isCurrent() {
        // Is current
        return this.playerHasPerk(this.perk);
    }

    playerHasPerk(perk: PerkModel) {
        for (var i = this.player.currentPerks.length - 1; i >= 0; i--) {
            if (this.player.currentPerks[i].idInternal === perk.idInternal) {
                return true;
            }
        }

        return false;
    }

    isDislike() {
        if (this.isCurrent()) {
            return false;
        }

        // dislike and not required for desired
        return this.playerIsDislikePerk(this.perk);
    }

    playerIsDislikePerk(perk: PerkModel) {
        for (var i = this.player.dislikePerks.length - 1; i >= 0; i--) {
            if (this.player.dislikePerks[i].idInternal === perk.idInternal) {
                return true;
            }
        }

        return false;
    }

    isPreferable() {
        if (this.isCurrent()) {
            return false;
        }

        // dislike and not required for desired
        return this.playerIsDesiredPerk(this.perk);
    }

    playerIsDesiredPerk(perk: PerkModel) {
        for (var i = this.player.desiredPerks.length - 1; i >= 0; i--) {
            if (this.player.desiredPerks[i].idInternal === perk.idInternal) {
                return true;
            }
        }

        return false;
    }
}

@Component({
    selector: 'perks-planner',
//    properties: ['playerModel'],
    providers: [PerkResource, CurrentPlayerModel],
//    bindings: [CurrentPlayerModel]
//    changeDetection: ChangeDetectionStrategy.OnPush
})

@View({
    template: `
        <article class="uk-article">
            <h1 class="uk-article-title">
                <h1>Perks Planner</h1>
            </h1>

            <perks-planner-table [perks]="currentPerks" name="Current Perks"></perks-planner-table>
            <perks-planner-table [perks]="availablePerks" name="Available Perks"></perks-planner-table>
            <perks-planner-table [perks]="blockedPerks" name="Blocked Perks"></perks-planner-table>
            <perks-planner-table [perks]="dislikePerks" name="Dislike Perks"></perks-planner-table>
        </article>
    `,
    directives: [NgFor, NgIf, PerksPlannerTableComponent]
})

export class PerksPlannerComponent {
    allPerks: Array<PerkModel> = [];
    perkResource: PerkResource;
    playerModel: CurrentPlayerModel;
    currentPerks: Array<PerkModel> = [];
    availablePerks: Array<PerkModel> = [];
    blockedPerks: Array<PerkModel> = [];
    dislikePerks: Array<PerkModel> = [];

    constructor(@Inject(PerkResource) perkResource: PerkResource, @Inject(CurrentPlayerModel) currentPlayerModel: CurrentPlayerModel) {
        this.perkResource = perkResource;
        this.playerModel  = currentPlayerModel;

        this.perkResource.find()
            .then(perkList => {
                this.allPerks = perkList;

                this.sortPerks();
            });

//        setInterval(() => this.sortPerks(), 2000);
    }

    onChanges(change) {
        console.log('cjange', change);
    }

    sortPerks() {
        this.currentPerks = [];
        this.availablePerks = [];
        this.blockedPerks = [];
        this.dislikePerks = [];

        this.allPerks.forEach(perk => {
            var userPerk = new PlayerPerk(perk, this.playerModel);

            if (userPerk.isCurrent()) {
                this.currentPerks.push(userPerk.perk);
            }

            if (userPerk.isAvailable()) {
                this.availablePerks.push(userPerk.perk);
            }

            if (userPerk.isBlocked()) {
                this.blockedPerks.push(userPerk.perk);
            }

            if (userPerk.isDislike()) {
                this.dislikePerks.push(userPerk.perk);
            }
        });
    }
}
