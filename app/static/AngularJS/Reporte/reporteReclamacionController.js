// -- =============================================
// -- Author:      Carlos Adolfo Martinez Diosdado
// -- Create date: 30/03/2017
// -- Description: Reporte Cita controller
// -- =============================================

registrationModule.controller('reporteReclamacionController', function ($scope, alertFactory, $rootScope, localStorageService, reporteReclamacionRepository) {
    $scope.userData = localStorageService.get('userData');

    //Inicializa la pagina
    $scope.init = function () {

    }

});