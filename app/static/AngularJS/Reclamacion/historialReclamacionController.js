registrationModule.controller('historialReclamacionController', function ($scope, $route, $modal, $rootScope, localStorageService, alertFactory, globalFactory, uploadRepository, historialReclamacionRepository) {
    $scope.userData = localStorageService.get('userData');


    $scope.init = function () {

    }
});