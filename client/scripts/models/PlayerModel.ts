///<reference path='../../bower_components/angular2/bundles/typings/angular2/angular2.d.ts' />
import {Injectable, Inject} from 'angular2/angular2';
import {BaseResource} from './BaseResource';
import {Http} from 'angular2/http';
import {PerkModel} from './PerkModel';

export class PlayerModel {
    level: number = 0;
    currentPerks: Array<PerkModel> = [];
    desiredPerks: Array<PerkModel> = [];
    dislikePerks: Array<PerkModel> = [];
    strength: number = 0;
    perception: number = 0;
    endurance: number = 0;
    charisma: number = 0;
    intelligence: number = 0;
    agility: number = 0;
    luck: number = 0;

    constructor(modelData?: any) {
        if (modelData) {
            this.level        = modelData.level;
            this.currentPerks = modelData.currentPerks;
            this.desiredPerks = modelData.desiredPerks;
            this.dislikePerks = modelData.dislikePerks;
            this.strength     = modelData.strength;
            this.perception   = modelData.perception;
            this.endurance    = modelData.endurance;
            this.charisma     = modelData.charisma;
            this.intelligence = modelData.intelligence;
            this.agility      = modelData.agility;
            this.luck         = modelData.luck;
        }
    }
}

@Injectable()

export class CurrentPlayerModel extends PlayerModel {
    callBackList = [];

    constructor() {
        super();

        console.log('initialized');
    }

    onChanges(callback) {
        console.log('push', this.callBackList);

        this.callBackList.push(callback);
    }

    updated() {
        this.callBackList.forEach(callback => callback(true));
    }

    dislike(perk: PerkModel) {
        this.dislikePerks.push(perk);
        this.updated();
    }

    like(perk: PerkModel) {
        this.desiredPerks.push(perk);
        this.updated();
    }

    current(perk: PerkModel) {
        this.currentPerks.push(perk);
        this.updated();
    }
}

@Injectable()

export class PlayerResource extends BaseResource {
    http: Http;
    model;
    modelName = 'player';

    constructor( @Inject(Http) http: Http) {
        super(http);

        this.model = (construct) => {
            return new PlayerModel(construct);
        };

        this.http = http;
    }
}
