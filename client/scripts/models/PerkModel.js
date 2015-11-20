var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
///<reference path='../../bower_components/angular2/bundles/typings/angular2/angular2.d.ts' />
var angular2_1 = require('angular2/angular2');
var BaseResource_1 = require('./BaseResource');
var http_1 = require('angular2/http');
var PerkModel = (function () {
    function PerkModel(model) {
        if (model) {
            this.id = model.id;
            this.idInternal = model.idIntern;
            this.name = model.name;
            this.rank = model.rank;
            this.attribute = model.attribute;
            this.attributeLevel = model.attributeLevel;
            this.characterLevel = model.characterLevel;
            this.description = model.description;
        }
    }
    return PerkModel;
})();
exports.PerkModel = PerkModel;
var PerkResource = (function (_super) {
    __extends(PerkResource, _super);
    function PerkResource(http) {
        _super.call(this, http);
        this.modelName = 'perk';
        this.model = function (construct) {
            return new PerkModel(construct);
        };
        this.http = http;
    }
    PerkResource = __decorate([
        angular2_1.Injectable(),
        __param(0, angular2_1.Inject(http_1.Http))
    ], PerkResource);
    return PerkResource;
})(BaseResource_1.BaseResource);
exports.PerkResource = PerkResource;
var PlayerPerk = (function () {
    function PlayerPerk(perk, player, allPerks, dependeciesList) {
        this.perk = perk;
        this.player = player;
        this.allPerks = allPerks;
        this.dependeciesList = dependeciesList;
    }
    PlayerPerk.prototype.isAvailable = function () {
        if (this.isCurrent()) {
            return false;
        }
        if (!this.fitSpecial()) {
            return false;
        }
        if (!this.fitRank()) {
            return false;
        }
        if (this.isDislike() && !this.isDependency()) {
            return false;
        }
        if (this.hasDependecies()) {
            return false;
        }
        return true;
    };
    PlayerPerk.prototype.fitSpecial = function () {
        if (this.perk.attributeLevel > this.player[this.perk.attribute.toLowerCase()]) {
            return false;
        }
        return true;
    };
    PlayerPerk.prototype.fitRank = function () {
        if (this.player.level < this.perk.characterLevel) {
            return false;
        }
        return true;
    };
    PlayerPerk.prototype.isBlocked = function () {
        if (this.isCurrent()) {
            return false;
        }
        if (this.isDislike()) {
            return false;
        }
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
        if (this.isDependency()) {
            return false;
        }
        // dislike and not required for desired
        return this.playerIsDislikePerk(this.perk);
    };
    PlayerPerk.prototype.isDependency = function () {
        var _this = this;
        var isDependency = false;
        this.dependeciesList.forEach(function (item) {
            if (item.name === _this.perk.name && item.rank === _this.perk.rank) {
                isDependency = true;
            }
        });
        return isDependency;
    };
    PlayerPerk.prototype.hasDependecies = function () {
        var _this = this;
        var hasDependecies = false;
        this.dependeciesList.forEach(function (item) {
            if (item.name === _this.perk.name && item.rank < _this.perk.rank) {
                hasDependecies = true;
            }
        });
        if (this.perk.rank > 1) {
            this.allPerks.forEach(function (item) {
                if (item.name === _this.perk.name) {
                    if (_this.perk.rank > item.rank && !_this.playerHasPerk(item)) {
                        hasDependecies = true;
                    }
                }
            });
        }
        return hasDependecies;
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
exports.PlayerPerk = PlayerPerk;
