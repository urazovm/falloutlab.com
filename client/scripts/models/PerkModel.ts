///<reference path='../../bower_components/angular2/bundles/typings/angular2/angular2.d.ts' />
import {Injectable, Inject} from 'angular2/angular2';
import {BaseResource} from './BaseResource';
import {Http} from 'angular2/http';

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
            this.idInternal = model.idInternal;
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
