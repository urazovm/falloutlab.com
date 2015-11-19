///<reference path='../../bower_components/angular2/bundles/typings/angular2/angular2.d.ts' />
import {Injectable, Inject} from 'angular2/angular2';
import {BaseResource} from './BaseResource';
import {Http} from 'angular2/http';
import {PlayerModel} from './PlayerModel';

export class PerkModel {
    name: string;
    rank: number;
    attribute: string;
    attributeLevel: number;
    characterLevel: number;
    description: string;
    id: string;
    idInternal: string;

    constructor(model: any) {
        if (model) {
            this.id = model.id;
            this.idInternal = model.idIntern;
            this.name = model.name;
            this.rank = model.rank;
            this.attribute = model.attribute;
            this.attributeLevel = model.attributeLevel;
            this.characterLevel = model.characterLevel;
            this.description = model.description;
        }
    }
}

@Injectable()

export class PerkResource extends BaseResource {
    http: Http;
    model;
    modelName = 'perk';

    constructor( @Inject(Http) http: Http) {
        super(http);

        this.model = (construct) => {
            return new PerkModel(construct);
        };

        this.http = http;
    }
}

export class PlayerPerk {
    perk: PerkModel;
    player: PlayerModel;
    allPerks: Array<PerkModel>;
    dependeciesList: Array<PerkModel>;

    constructor(perk, player, allPerks, dependeciesList) {
        this.perk = perk;
        this.player = player;
        this.allPerks = allPerks;
        this.dependeciesList = dependeciesList;
    }

    isAvailable() {
        if (this.isCurrent()) {
            return false;
        }

        if (this.isDislike() && !this.isDependency()) {
            return false;
        }

        if (this.hasDependecies()) {
            console.log('has dependencies');

            return false;
        }

        if (!this.fitSpecial()) {
            return false;
        }

        if (!this.fitRank()) {
            return false;
        }

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
        if (this.isCurrent()) {
            return false;
        }

        if (this.isDislike()) {
            return false;
        }

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

        if (this.isDependency()) {
            return false;
        }

        // dislike and not required for desired
        return this.playerIsDislikePerk(this.perk);
    }

    isDependency() {
        let isDependency = false;

        this.dependeciesList.forEach(item => {
            if (item.name === this.perk.name && item.rank === this.perk.rank) {
                isDependency = true;
            }
        });

        return isDependency;
    }

    hasDependecies() {
        let hasDependecies = false;

        this.dependeciesList.forEach(item => {
            if (item.name === this.perk.name && item.rank < this.perk.rank) {
                hasDependecies = true;
            }
        });

        return hasDependecies;
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
