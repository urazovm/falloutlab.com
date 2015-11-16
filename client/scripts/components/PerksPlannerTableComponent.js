///<reference path="../../bower_components/angular2/angular2.d.ts" />
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var angular2_1 = require('angular2/angular2');
var PerksPlannerTableComponent = (function () {
    function PerksPlannerTableComponent() {
    }
    PerksPlannerTableComponent = __decorate([
        angular2_1.Component({
            selector: 'perks-planner-table',
            properties: ['perks', 'name']
        }),
        angular2_1.View({
            template: "\n    <div>\n        <h4>{{name}}</h4>\n        <ul class=\"uk-list\">\n           <li *ng-for=\"#perk of perks\">\n           <div class=\"uk-grid\">\n                <div class=\"uk-width-2-10\">&nbsp;</div>\n                <div class=\"uk-width-8-10\"><i>{{ perk.name }}</i><br/>{{ perk.description }}</div>\n            </div>\n           </li>\n        </ul>\n    </div>\n    ",
            directives: [angular2_1.NgFor, angular2_1.NgIf]
        })
    ], PerksPlannerTableComponent);
    return PerksPlannerTableComponent;
})();
exports.PerksPlannerTableComponent = PerksPlannerTableComponent;
