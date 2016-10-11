// -- =============================================
// -- Author:      Uriel Godínez Martínez
// -- Create date: 11/10/2016
// -- Description: Reporte Certificado Conformidad Controller
// -- =============================================

registrationModule.controller('reporteCertificadoConformidadController', function ($scope, alertFactory, $rootScope, localStorageService, reporteCertificadoConformidadRepository, dashBoardRepository) {
    $scope.zonaSelected = null;
    $scope.tarSelected = null;
    $scope.userData = localStorageService.get('userData');

    //Inicializa la pagina
    $scope.init = function () {
        $scope.getCertificados(null, null, null, null);
        $scope.devuelveZonas();
        $scope.devuelveTars();
    }

    //Obtiene todas las citas no canceladas generadas para cierta unidad
    $scope.getCertificados = function (idZona, idTar, fechaInicial, fechaFinal) {
        $('.dataTableCertificadoConformidad').DataTable().destroy();
        reporteCertificadoConformidadRepository.getReporteCertificadoConformidad(idZona, idTar, fechaInicial, fechaFinal).then(function (certificados) {
            if (certificados.data.length > 0) {
                $scope.certificados = certificados.data;
                alertFactory.success("Certificados Cargados");
                waitDrawDocument("dataTableCertificadoConformidad");
            } else {
                $scope.certificados = [];
                alertFactory.info("No se encontraron certificados generados con los criterios de búsqueda");
            }
        }, function (error) {
            $scope.certificados = [];
            alertFactory.error("Error al obtener los certificados");
        });
    }

    $scope.devuelveZonas = function () {
        dashBoardRepository.getZonas($scope.userData.idUsuario).then(function (zonas) {
            if (zonas.data.length > 0) {
                $scope.zonas = zonas.data;

            }
        }, function (error) {
            alertFactory.error('No se pudo recuperar información de las zonas');
        });
    }

    $scope.devuelveTars = function () {
        if ($scope.zonaSelected != null) {
            dashBoardRepository.getTars($scope.zonaSelected).then(function (tars) {
                if (tars.data.length > 0) {
                    $scope.tars = tars.data;

                }
            }, function (error) {
                alertFactory.error('No se pudo recuperar información de las TARs');
            });
        } else {
            $scope.tarSelected = null;
        }
    }

    $scope.obtieneCertificados = function () {
        $scope.getCertificados($scope.zonaSelected, $scope.tarSelected, $scope.fInicialSelected, $scope.fFinalSelected);
    }

    //espera que el documento se pinte para llenar el dataTable
    var waitDrawDocument = function (dataTable) {
        setTimeout(function () {
            $('.' + dataTable).DataTable({
                dom: '<"html5buttons"B>lTfgitp',
                buttons: [
                    {
                        extend: 'excel',
                        title: 'CertificadoConformidad'
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
        }, 2500);
    }

    //Fechas
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
});