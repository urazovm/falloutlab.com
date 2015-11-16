///<reference path="../../bower_components/angular2/bundles/typings/angular2/angular2.d.ts" />

import {Component, View} from 'angular2/angular2';
import {PerksPlannerComponent} from '../components/PerksPlannerComponent';

@Component({
  //  selector: 'home'
})

@View({
    template: `
        <div>
            <perks-planner />
        </div>
    `,
    directives: [PerksPlannerComponent]
})

export class PerksPlannerController {
    constructor() {
    }
}
