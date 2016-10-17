// -- ==================================================================================
// -- CREATE AUTH: Uriel Godínez Martínez
// -- CREATE DATE: 07/06/2016
// -- CREATE DESC: Controlador para el mantenimiento de las Osur por TAR
// -- ==================================================================================

registrationModule.controller('osurController', function ($scope, alertFactory, osurRepository) {
    $scope.presupuesto = '0.00';
    $scope.saldo = '0.00';
    $scope.gasto = '0.00';
    $scope.conTar = false;    

    $scope.init = function () {
        getTARS();
    }

    var getTARS = function () {
        osurRepository.getTars($scope.userData.idUsuario).then(function (tars) {
            if (tars.data.length > 0) {
                $scope.tars = tars.data;
                //alertFactory.success("Trabajos cargados");
            } else {
                alertFactory.info("No se encontro ninguna TAR");
            }
        }, function (error) {
            alertFactory.error("Error al cargar las TAR");
        });
    }

    $scope.GetMonto = function () {
        if ($scope.selectedTar == null) {
            $scope.conTar = false;
            alertFactory.info("Debe seleccionar una TAR");
        } else {
            $scope.conTar = true;
            osurRepository.getDatosOsur($scope.selectedTar.idTAR).then(function (result) {
                    if (result.data.length > 0) {
                        $scope.datosOsur = result.data;
                    } else {
                        $scope.datosOsur = [];
                        alertFactory.info("No existe información con los criterios de búsqueda");
                    }
                },
                function (error) {
                    alertFactory.error("Error al obtener la información");
                });
        }
    }

    //fecha
    $('#fechaFinal .input-group.date').datepicker({
        todayBtn: "linked",
        keyboardNavigation: true,
        forceParse: false,
        calendarWeeks: true,
        autoclose: true,
        todayHighlight: true,
        format: "dd/mm/yyyy"
    });

    $('#fechaInicial .input-group.date').datepicker({
        todayBtn: "linked",
        keyboardNavigation: true,
        forceParse: false,
        calendarWeeks: true,
        autoclose: true,
        todayHighlight: true,
        format: "dd/mm/yyyy"
    });
    
    //Ventana Modal
    $scope.nuevaOsur = function () {
        $('#newOsurModal').appendTo('body').modal('show');
    }

    $scope.saveOsur = function (){
        //presupuesto,idTAR,folio,fechaInicial,fechaFinal,solpe
        debugger;
        osurRepository.putNuevaOsur($scope.presupuesto,$scope.tarNuevo.idTAR,$scope.folio,$scope.fechaInicial,$scope.fechaFinal,$scope.solpe).then(function (result) {
                    debugger;
                    if (result.data[0].id == 1) {
                        alertFactory.info("Se generó correctamente la Osur");
                        $scope.GetMonto ();
                    } else {
                        $scope.datosOsur = [];
                        alertFactory.info("No existe información con los criterios de búsqueda");
                    }
                },
                function (error) {
                    alertFactory.error("Error al procesar la información");
                });
    }
});