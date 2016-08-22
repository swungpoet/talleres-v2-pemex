// -- =============================================
// -- Author:      Adolfo Marinez
// -- Create date: 22/08/2016
// -- Description: talleres controller
// -- =============================================
registrationModule.controller('tallerController', function($scope, alertFactory,tallerRepository){
	//this is the first method executed in the view
	$scope.init = function(){
	$scope.getrecuperaGAR();
	
	$scope.getrecuperaTipoUsuario();
	$scope.getrecuperaEstatus();
    $scope.getTaller();
	}

	$scope.getrecuperaGAR = function () {
              $scope.promise = tallerRepository.getTallerGar().then(function (gar) {
            $scope.tipoGar = gar.data;
        }, function (error) {
            alertFactory.error('Error al obtener los datos GAR');
        });
    }
        $scope.obtieneZona = function () {
        $scope.idZona=$scope.idGar;
        $scope.getrecuperaTAR($scope.idZona);
    }
    $scope.getrecuperaTAR = function () {
        tallerRepository.getTallerTar($scope.idZona).then(function (tar) {
            $scope.tipoTar = tar.data;
            
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

     $scope.getTaller = function () {
        $scope.promise = tallerRepository.getTallerInformation().then(function (tallerInfo) {
            $scope.talleres = tallerInfo.data;
             setTimeout(function () {
                     $('.dataTableTaller').DataTable({
                                dom: '<"html5buttons"B>lTfgitp',
                                buttons: [
                                    {
                                        extend: 'copy'
                                    },
                                    {
                                        extend: 'csv'
                                    },
                                    {
                                        extend: 'excel',
                                        title: 'ReporteGeneral'
                                    },
                                    {
                                        extend: 'pdf',
                                        title: 'ReporteGeneral'
                                    },

                                    {
                                        extend: 'print',
                                        customize: function (win) {
                                            $(win.document.body).addClass('white-bg');
                                            $(win.document.body).css('font-size', '10px');

                                            $(win.document.body).find('table')
                                                .addClass('compact')
                                                .css('font-size', 'inherit');
                                        }
                            }
                        ]
                            });
                        }, 1000);
        }, function (error) {
            alertFactory.error('Error al obtener los datos');
        });
    }
    
    $scope.editaTaller = function () {
        location.href = '/administraciontaller';
    }
    $scope.nuevoTaller = function () {
        location.href = '/administraciontaller';
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

    $scope.insertaTaller = function () {
        

    }




});


