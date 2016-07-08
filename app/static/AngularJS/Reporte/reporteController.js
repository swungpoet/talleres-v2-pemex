registrationModule.controller('reporteController', function ($scope, alertFactory, $rootScope, localStorageService, reporteRepository) {
    
    $scope.init = function () {
        getReporte();
    }

    $scope.getReporte = function () {
        reporteRepository.reporteGral()
            .then(function (result) {
                if (result.data.length > 0) {
                    $scope.datos = result.data;
                } 
            }, function (error) {
                alertFactory.error('Error');
            });
    }
});

