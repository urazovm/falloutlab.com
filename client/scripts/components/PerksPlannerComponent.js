///<reference path="../../bower_components/angular2/angular2.d.ts" />
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var angular2_1 = require('angular2/angular2');
var PerkModel_1 = require('../models/PerkModel');
var PerksPlannerComponent = (function () {
    function PerksPlannerComponent(perkResource) {
        var _this = this;
        this.perkResource = perkResource;
        this.perkResource.find()
            .then(function (perkList) {
            _this.allPerks = perkList;
        });
    }
    PerksPlannerComponent = __decorate([
        angular2_1.Component({
            selector: 'perks-planner',
            providers: [PerkModel_1.PerkResource]
        }),
        angular2_1.View({
            template: "\n        <article class=\"uk-article\">\n            <!--div><router-outlet></router-outlet></div-->\n\n            <h1 class=\"uk-article-title\">\n                <h1>Perks Planner</h1>\n            </h1>\n            <div>\n                <ul class=\"uk-list\">\n                   <li *ng-for=\"#perk of allPerks\">\n                   <div class=\"uk-grid\">\n                        <div class=\"uk-width-2-10\">&nbsp;</div>\n                        <div class=\"uk-width-8-10\"><i>{{ perk.name }}</i><br/>{{ perk.description }}</div>\n                    </div>\n                   </li>\n                </ul>\n            </div>\n        </article>\n    ",
            directives: [angular2_1.NgFor, angular2_1.NgIf]
        }),
        __param(0, angular2_1.Inject(PerkModel_1.PerkResource))
    ], PerksPlannerComponent);
    return PerksPlannerComponent;
})();
exports.PerksPlannerComponent = PerksPlannerComponent;
