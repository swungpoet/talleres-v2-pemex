registrationModule.controller('reporteController', function ($scope, alertFactory, $rootScope, localStorageService, reporteRepository) {
    
    $scope.init = function () {
        getReporte();
    }

    $scope.getReporte = function () {
        reporteRepository.reporteGral()
            .then(function (result) {
                if (result.data.length > 0) {
                    
                } 
            }, function (error) {
                alertFactory.error('Error');
            });
    }
});

