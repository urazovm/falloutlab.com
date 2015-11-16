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
var PlayerModel_1 = require('../models/PlayerModel');
var PerksPlannerTableComponent_1 = require('./PerksPlannerTableComponent');
var PlayerPerk = (function () {
    function PlayerPerk(perk, player) {
        this.perk = perk;
        this.player = player;
    }
    PlayerPerk.prototype.isAvailable = function () {
        if (this.isCurrent()) {
            return false;
        }
        if (this.isDislike()) {
            return false;
        }
        if (!this.fitSpecial()) {
            return false;
        }
        if (!this.fitRank()) {
            return false;
        }
        // Fit SPECIAL
        // Fit Rank
        // not desired or Required for desired
        return true;
    };
    PlayerPerk.prototype.fitSpecial = function () {
        if (this.perk.attributeLevel > this.player[this.perk.attribute.toLowerCase()]) {
            return false;
        }
        return true;
    };
    PlayerPerk.prototype.fitRank = function () {
        if (this.player.level > this.perk.characterLevel) {
            return false;
        }
        return true;
    };
    PlayerPerk.prototype.isBlocked = function () {
        if (this.isAvailable()) {
            return false;
        }
        // Not SPECIAL Or Not Fit Rank
        // not desired or Required for desired
        return true;
    };
    PlayerPerk.prototype.isCurrent = function () {
        // Is current
        return this.playerHasPerk(this.perk);
    };
    PlayerPerk.prototype.playerHasPerk = function (perk) {
        for (var i = this.player.currentPerks.length - 1; i >= 0; i--) {
            if (this.player.currentPerks[i].idInternal === perk.idInternal) {
                return true;
            }
        }
        return false;
    };
    PlayerPerk.prototype.isDislike = function () {
        if (this.isCurrent()) {
            return false;
        }
        // dislike and not required for desired
        return this.playerIsDislikePerk(this.perk);
    };
    PlayerPerk.prototype.playerIsDislikePerk = function (perk) {
        for (var i = this.player.dislikePerks.length - 1; i >= 0; i--) {
            if (this.player.dislikePerks[i].idInternal === perk.idInternal) {
                return true;
            }
        }
        return false;
    };
    PlayerPerk.prototype.isPreferable = function () {
        if (this.isCurrent()) {
            return false;
        }
        // dislike and not required for desired
        return this.playerIsDesiredPerk(this.perk);
    };
    PlayerPerk.prototype.playerIsDesiredPerk = function (perk) {
        for (var i = this.player.desiredPerks.length - 1; i >= 0; i--) {
            if (this.player.desiredPerks[i].idInternal === perk.idInternal) {
                return true;
            }
        }
        return false;
    };
    return PlayerPerk;
})();
var PerksPlannerComponent = (function () {
    function PerksPlannerComponent(perkResource, currentPlayerModel) {
        var _this = this;
        this.allPerks = [];
        this.currentPerks = [];
        this.availablePerks = [];
        this.blockedPerks = [];
        this.dislikePerks = [];
        this.perkResource = perkResource;
        this.playerModel = currentPlayerModel;
        this.perkResource.find()
            .then(function (perkList) {
            _this.allPerks = perkList;
            _this.sortPerks();
        });
        //        setInterval(() => this.sortPerks(), 2000);
    }
    PerksPlannerComponent.prototype.onChanges = function (change) {
        console.log('cjange', change);
    };
    PerksPlannerComponent.prototype.sortPerks = function () {
        var _this = this;
        this.currentPerks = [];
        this.availablePerks = [];
        this.blockedPerks = [];
        this.dislikePerks = [];
        this.allPerks.forEach(function (perk) {
            var userPerk = new PlayerPerk(perk, _this.playerModel);
            if (userPerk.isCurrent()) {
                _this.currentPerks.push(userPerk.perk);
            }
            if (userPerk.isAvailable()) {
                _this.availablePerks.push(userPerk.perk);
            }
            if (userPerk.isBlocked()) {
                _this.blockedPerks.push(userPerk.perk);
            }
            if (userPerk.isDislike()) {
                _this.dislikePerks.push(userPerk.perk);
            }
        });
    };
    PerksPlannerComponent = __decorate([
        angular2_1.Component({
            selector: 'perks-planner',
            //    properties: ['playerModel'],
            providers: [PerkModel_1.PerkResource, PlayerModel_1.CurrentPlayerModel],
        }),
        angular2_1.View({
            template: "\n        <article class=\"uk-article\">\n            <h1 class=\"uk-article-title\">\n                <h1>Perks Planner</h1>\n            </h1>\n\n            <perks-planner-table [perks]=\"currentPerks\" name=\"Current Perks\"></perks-planner-table>\n            <perks-planner-table [perks]=\"availablePerks\" name=\"Available Perks\"></perks-planner-table>\n            <perks-planner-table [perks]=\"blockedPerks\" name=\"Blocked Perks\"></perks-planner-table>\n            <perks-planner-table [perks]=\"dislikePerks\" name=\"Dislike Perks\"></perks-planner-table>\n        </article>\n    ",
            directives: [angular2_1.NgFor, angular2_1.NgIf, PerksPlannerTableComponent_1.PerksPlannerTableComponent]
        }),
        __param(0, angular2_1.Inject(PerkModel_1.PerkResource)),
        __param(1, angular2_1.Inject(PlayerModel_1.CurrentPlayerModel))
    ], PerksPlannerComponent);
    return PerksPlannerComponent;
})();
exports.PerksPlannerComponent = PerksPlannerComponent;
