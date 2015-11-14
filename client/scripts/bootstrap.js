///<reference path='../bower_components/angular2/bundles/typings/angular2/angular2.d.ts' />
var angular2_1 = require('angular2/angular2');
var router_1 = require('angular2/router');
var http_1 = require('angular2/http');
var Config_1 = require('./Config');
var app_1 = require('./app');
angular2_1.bootstrap(app_1.App, [Config_1.Config, http_1.HTTP_PROVIDERS, router_1.ROUTER_PROVIDERS, angular2_1.provide(router_1.APP_BASE_HREF, { useValue: '/' })]);
