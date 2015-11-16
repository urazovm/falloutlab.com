///<reference path="../../bower_components/angular2/angular2.d.ts" />

import {Component, View, NgFor, NgIf, Inject} from 'angular2/angular2';
import {PerkResource, PerkModel} from '../models/PerkModel';

@Component({
    selector: 'perks-planner',
    providers: [PerkResource]
})

@View({
    template: `
        <article class="uk-article">
            <!--div><router-outlet></router-outlet></div-->

            <h1 class="uk-article-title">
                <h1>Perks Planner</h1>
            </h1>
            <div>
                <ul class="uk-list">
                   <li *ng-for="#perk of allPerks">
                   <div class="uk-grid">
                        <div class="uk-width-2-10">&nbsp;</div>
                        <div class="uk-width-8-10"><i>{{ perk.name }}</i><br/>{{ perk.description }}</div>
                    </div>
                   </li>
                </ul>
            </div>
        </article>
    `,
    directives: [NgFor, NgIf]
})


export class PerksPlannerComponent {
    allPerks: Array<PerkModel>;
    perkResource: PerkResource;

    constructor(@Inject(PerkResource) perkResource: PerkResource) {
        this.perkResource = perkResource;

        this.perkResource.find()
            .then(perkList => {
                this.allPerks = perkList;
            });
    }
}
