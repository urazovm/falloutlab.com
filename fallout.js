var perksList = require('./fallout.converted.json');
var userData = require('./fallout.userSettings.json');
fs = require('fs');
// fs.writeFileSync('fallout.converted.json', JSON.stringify(convertedName, null, '\t');
// var currentPerks   = [];
// var availablePerks = [];
// var desiredPerks   = [];
// var blockdPerks    = [];
// var dislikePerks   = [];
var PerkModel = (function () {
    function PerkModel(model) {
        if (model) {
            this.id = model.id;
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
var perkModels = perksList.map(function (item) { return new PerkModel(item); });
var User = (function () {
    function User() {
    }
    return User;
})();
var UserPerk = (function () {
    function UserPerk(perk, user) {
        this.perk = perk;
        this.user = user;
    }
    UserPerk.prototype.isAvailble = function () {
        if (this.isCurrent()) {
            return false;
        }
        // Fit SPECIAL
        // Fit Rank
        // not desired or Required for desired
        return true;
    };
    UserPerk.prototype.isBlocked = function () {
        if (this.isCurrent()) {
            return false;
        }
        // Not SPECIAL Or Not Fit Rank
        // not desired or Required for desired
        return true;
    };
    UserPerk.prototype.isCurrent = function () {
        // Is current
        return false;
        //   return user.hasPerk(this.perk);
    };
    UserPerk.prototype.isDislike = function () {
        if (this.isCurrent()) {
            return false;
        }
        // dislike and not required for desired
        return false;
        //return user.hasPerk(this.perk);
    };
    return UserPerk;
})();
var SortedPerks = (function () {
    function SortedPerks() {
        this.currentPerks = [];
        this.availablePerks = [];
        this.blockedPerks = [];
        this.dislikePerks = [];
    }
    return SortedPerks;
})();
var sortedPerks = new SortedPerks();
perkModels.forEach(function (perk) {
    var userPerk = new UserPerk(perk, userData);
    if (userPerk.isCurrent()) {
        sortedPerks.currentPerks.push(userPerk);
    }
    if (userPerk.isAvailble()) {
        sortedPerks.availablePerks.push(userPerk);
    }
    if (userPerk.isBlocked()) {
        sortedPerks.blockedPerks.push(userPerk);
    }
    if (userPerk.isDislike()) {
        sortedPerks.dislikePerks.push(userPerk);
    }
});
console.log('------------------------------------------------------------------');
console.log('--------------------AVAILABLE------------------------');
console.log('------------------------------------------------------------------');
sortedPerks.availablePerks.forEach(function (item) {
    console.log(item.perk.name);
});
console.log('------------------------------------------------------------------');
console.log('--------------------BLOCKED------------------------');
console.log('------------------------------------------------------------------');
sortedPerks.blockedPerks.forEach(function (item) {
    console.log(item.perk.name);
});
module.exports = function () { };
