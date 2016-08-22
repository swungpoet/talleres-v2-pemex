// -- =============================================
// -- Author:      Adolfo Marinez
// -- Create date: 22/08/2016
// -- Description: talleres controller
// -- =============================================
registrationModule.controller('tallerController', function($scope, alertFactory,tallerRepository){
	//this is the first method executed in the view
	$scope.init = function(){
	$scope.getrecuperaGAR();
	$scope.getrecuperaTAR();
	$scope.getrecuperaTipoUsuario();
	$scope.getrecuperaEstatus();
	}

	$scope.getrecuperaGAR = function () {
              $scope.promise = tallerRepository.getTallerGar().then(function (gar) {
            $scope.selectedGar = gar.data;
        }, function (error) {
            alertFactory.error('Error al obtener los datos GAR');
        });
    }
    $scope.getrecuperaTAR = function () {
              $scope.promise = tallerRepository.getTallerTar().then(function (tar) {
            $scope.tar = tar.data;
        }, function (error) {
            alertFactory.error('Error al obtener los datos TAR');
        });
    }
    $scope.getrecuperaTipoUsuario = function () {
              $scope.promise = tallerRepository.getTallerTipoUsuario().then(function (tipoUsuario) {
            $scope.tipoUsuario = tipoUsuario.data;
        }, function (error) {
            alertFactory.error('Error al obtener los datos Usuario');
        });
    }
    $scope.getrecuperaEstatus = function () {
              $scope.promise = tallerRepository.getTallerEstatus().then(function (estatus) {
            $scope.estatus = estatus.data;
        }, function (error) {
            alertFactory.error('Error al obtener los datos Estatus');
        });
    }

     $('.clockpicker').clockpicker();

        $('#fechaTrabajo .input-group.date').datepicker({
        todayBtn: "linked",
        keyboardNavigation: true,
        forceParse: false,
        calendarWeeks: true,
        autoclose: true,
        todayHighlight: true
    });

});


