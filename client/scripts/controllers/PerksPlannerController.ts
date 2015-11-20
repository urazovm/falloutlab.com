///<reference path="../../bower_components/angular2/bundles/typings/angular2/angular2.d.ts" />

import {Component, View, Inject} from 'angular2/angular2';
import {PerksPlannerComponent} from '../components/PerksPlannerComponent';
import {PlayerResource, CurrentPlayerModel} from '../models/PlayerModel';

@Component({
  //  selector: 'home'
//      properties['playerModel']
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
    playerModel: CurrentPlayerModel;

    constructor(@Inject(CurrentPlayerModel) currentPlayerModel: CurrentPlayerModel) {
        this.playerModel = currentPlayerModel;
    }
}
