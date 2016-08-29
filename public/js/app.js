/**
 * Created by Cengkuru on 8/29/2016.
 */

angular.module('StarterApp', ['ui.router', 'ngMaterial', 'app.routes', 'app.controllers', 'app.services', 'app.directives', 'angular-loading-bar','ngMdIcons'])
    // loading defaults
    .run(function($rootScope, $http) {

        $rootScope.previousState;
        $rootScope.currentState;

        $rootScope.$on('$stateChangeSuccess', function(ev, to, toParams, from, fromParams) {
            $rootScope.previousState = from.name;
            $rootScope.currentState = to.name;
            $rootScope.returnToStateParams = fromParams.id;
            console.log('Previous state:' + $rootScope.previousState)
            console.log('Previous state with id :' + $rootScope.returnToStateParams)
            console.log('Current state:' + $rootScope.currentState)

        });
    })

    // Material them configuration
    .config(function($mdThemingProvider) {
        var customBlueMap = $mdThemingProvider.extendPalette('light-blue', {
            'contrastDefaultColor': 'light',
            'contrastDarkColors': ['50'],
            '50': 'ffffff'
        });
        $mdThemingProvider.definePalette('customBlue', customBlueMap);
        $mdThemingProvider.theme('default')
            .primaryPalette('customBlue', {
                'default': '500',
                'hue-1': '50'
            })
            .accentPalette('pink');
        $mdThemingProvider.theme('input', 'default')
            .primaryPalette('grey')
    })

    // angular loading bar configuration
    .config(['cfpLoadingBarProvider', function (cfpLoadingBarProvider) {
        cfpLoadingBarProvider.includeSpinner = true;

    }]);
