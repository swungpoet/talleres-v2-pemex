// -- ==================================================================================
// -- CREATE AUTH: Uriel Godínez Martínez
// -- CREATE DATE: 07/06/2016
// -- CREATE DESC: Controlador para el mantenimiento de las Osur por TAR
// -- ==================================================================================

registrationModule.controller('osurController', function ($scope, alertFactory, osurRepository) {
     $scope.presupuestoTotal=0.00;
     $scope.utilizadoTotal=0.00;
     $scope.saldoTotal=0.00;
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

        $scope.presupuestoTotal=0.00;
        $scope.utilizadoTotal=0.00;
        $scope.saldoTotal=0.00;

        if ($scope.selectedTar == null) {
            $scope.conTar = false;
            alertFactory.info("Debe seleccionar una TAR");
            
        } else {
            $scope.conTar = true;
            $('.dataTableOsur').DataTable().destroy();
            osurRepository.getDatosOsur($scope.selectedTar.idTAR).then(function (result) {
                    if (result.data.length > 0) {
                        $scope.datosOsur = result.data;
                         
                        for(var i=0;i<result.data.length;i++){
                            $scope.presupuestoTotal += parseFloat(result.data[i].presupuesto);
                            $scope.utilizadoTotal += parseFloat(result.data[i].utilizado);
                            $scope.saldoTotal += parseFloat(result.data[i].saldo);
                        };

                        waitDrawDocument("dataTableOsur");
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

    $scope.saveOsur = function () {
        var valoresInicial = $scope.fechaInicial.split('/');
        var dateStringInicial = valoresInicial[2] + '-' + valoresInicial[1] + '-' + valoresInicial[0];

        var valoresFinal = $scope.fechaFinal.split('/');
        var dateStringFinal = valoresFinal[2] + '-' + valoresFinal[1] + '-' + valoresFinal[0];

        osurRepository.putNuevaOsur($scope.presupuesto, $scope.tarNuevo.idTAR, $scope.folio, dateStringInicial, dateStringFinal, $scope.solpe).then(function (result) {
                if (result.data.length > 0) {
                    alertFactory.info("Se generó correctamente la Osur");
                    $('#newOsurModal').modal('hide');
                    if ($scope.selectedTar != null) {
                        $scope.GetMonto();
                    }
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