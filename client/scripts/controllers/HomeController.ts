///<reference path="../../bower_components/angular2/bundles/typings/angular2/angular2.d.ts" />

import {Component, View} from 'angular2/angular2';
import {TerminalComponent} from '../components/TerminalComponent';

@Component({
 //   selector: 'home'
})

@View({
    template: `
        <div>
            <terminal />
        </div>
    `,
    directives: [TerminalComponent]
})

export class HomeController {
    constructor() {
    }
}
