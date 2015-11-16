///<reference path='../../bower_components/angular2/bundles/typings/angular2/angular2.d.ts' />
import {Injectable, Inject} from 'angular2/angular2';
import {BaseResource} from './BaseResource';
import {Http} from 'angular2/http';

export class PerkModel {
    id: number;
    name: string;
    description: string;

    constructor(modelData?: any) {
        if (modelData) {
            this.id = modelData.id;
            this.name = modelData.name;
            this.description = modelData.description;
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
