registrationModule.controller('resumenReclamacionController', function ($scope, $route, $modal, $rootScope, localStorageService, alertFactory, globalFactory, uploadRepository, resumenReclamacionRepository) {
    $scope.userData = localStorageService.get('userData');


    $scope.init = function () {

    }
});