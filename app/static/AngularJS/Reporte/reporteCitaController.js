// -- =============================================
// -- Author:      Carlos Adolfo Martinez Diosdado
// -- Create date: 30/08/2016
// -- Description: Reporte Cita controller
// -- =============================================

registrationModule.controller('reporteCitaController', function ($scope, alertFactory, $rootScope, localStorageService, reporteCitaRepository) {

    //Inicializa la pagina
    $scope.init = function () {
        $scope.obtieneDatoUrl();
        $scope.getNumeroCitas();
    }

    //obtiene el total de las citas
    $scope.getNumeroCitas = function () {
            reporteCitaRepository.getNumCita().then(function (citas) {
                $scope.registroCitas = citas.data;
                $scope.citasagendadas = $scope.registroCitas[0].total;
                $scope.citasconfirmadas = $scope.registroCitas[1].total;
                $scope.citascanceladas = $scope.registroCitas[2].total;
                if (citas.data.length > 0) {
                    alertFactory.success('Datos encontrados');
                } else {
                    alertFactory.info('No se encontraron datos');
                }
            }, function (error) {
                alertFactory.error('Error al obtener los datos');
            });
        }
        //Muestra el historico de citas canceldas
    $scope.citaCancelada = function (status) {
            $scope.tipoCita = status;
        }
        //Muestra el historico de citas confirmadas
    $scope.citaConfirmada = function (status) {
            $scope.tipoCita = status;
        }
        //Muestra el historico de citas agendadas
    $scope.citaAgendada = function (status) {
        $scope.tipoCita = status;
    }

    //Regresa la variable de la url
    $scope.obtieneDatoUrl = function () {
        var url = location.search.replace("?", "");
        var arrUrl = url.split("&");
        var urlObj = {};
        for (var i = 0; i < arrUrl.length; i++) {
            var x = arrUrl[i].split("=");
            urlObj[x[0]] = x[1]
        }
        $scope.tipoCita = urlObj.tipoCita;
    }


});