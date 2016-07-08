registrationModule.controller('reporteController', function ($scope, alertFactory, $rootScope, localStorageService, reporteRepository) {
    
    $scope.init = function () {
        $scope.getReporte();
    }

    $scope.getReporte = function () {
        reporteRepository.reporteGral()
            .then(function (result) {
                if (result.data.length > 0) {
                    alertFactory.success("Reposte general cargado");
                } 
            }, function (error) {
                alertFactory.error('Error');
            });
    }
});

