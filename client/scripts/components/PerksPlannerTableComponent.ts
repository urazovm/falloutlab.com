///<reference path="../../bower_components/angular2/angular2.d.ts" />

import {Component, View, NgFor, NgIf} from 'angular2/angular2';
import {PerkModel} from '../models/PerkModel';

@Component({
    selector: 'perks-planner-table',
    properties: ['perks', 'name']
})

@View({
    template: `
    <div>
        <h4>{{name}}</h4>
        <ul class="uk-list">
           <li *ng-for="#perk of perks">
           <div class="uk-grid">
                <div class="uk-width-2-10">&nbsp;</div>
                <div class="uk-width-8-10"><i>{{ perk.name }}</i><br/>{{ perk.description }}</div>
            </div>
           </li>
        </ul>
    </div>
    `,
    directives: [NgFor, NgIf]
})

export class PerksPlannerTableComponent {
    name: string;
    perks: Array<PerkModel>;

    constructor() {}
}
