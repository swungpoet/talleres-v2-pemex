// -- =============================================
// -- Author:      Carlos Adolfo Martinez Diosdado
// -- Create date: 30/08/2016
// -- Description: Reporte Utilidad controller
// -- =============================================

registrationModule.controller('reporteUtilidadController', function ($scope, alertFactory, $rootScope, localStorageService, reporteUtilidadRepository) {     

    //Inicializa la pagina
    $scope.initUtilidad = function () {
        $scope.limpiaCampos();
    }

    $scope.limpiaCampos = function () {
        $scope.fechaInicio = '';
        $scope.fechaFin = '';
        $scope.tipoOrden = '';
        $scope.facturado = '';
        $scope.numeroTrabajo = '';
    }

    $scope.facturadas = function () {   
    //$scope.fechaInicio;
    $scope.fechaInicio == "" ? $scope.fechaInicio = '01/01/2016' : $scope.fechaInicio;
    //$scope.fechaFin;
    $scope.fechaFin == "" ? $scope.fechaFin = '10/31/2016' : $scope.fechaFin;
    $scope.tipoOrden;
    $scope.facturado;
    $scope.getMargenUtilidad($scope.fechaInicio, $scope.fechaFin, 0, $scope.tipoOrden, $scope.facturado);
    $scope.idProveedor == '' || $scope.idProveedor == null ? $scope.idProveedor = 0 : $scope.idProveedor;
    }

    $scope.ordenes = function () {
    $scope.numeroTrabajo;
    $scope.getMargenUtilidad(null,null, $scope.numeroTrabajo, null, null);
    }
       //obtiene el total de las citas
    $scope.getMargenUtilidad = function (fechaInicio, fechaFin, numeroTrabajo, tipoOrden, facturado) {
         if(($scope.tipoOrden != '' && $scope.facturado != '') || ($scope.numeroTrabajo != '')){
            $('.dataTableUtilidad').DataTable().destroy();
            reporteUtilidadRepository.getUtilidad(fechaInicio, fechaFin, numeroTrabajo, tipoOrden, facturado).then(function (utilidad) {
                $scope.margen = utilidad.data;

                if (utilidad.data.length > 0) {
                    alertFactory.success('Datos encontrados');
                    waitDrawDocument("dataTableUtilidad");
                    $scope.limpiaCampos();
                } else {
                    alertFactory.info('No se encontraron datos');
                }
            }, function (error) {
                alertFactory.error('Error al obtener los datos');
            });
          }else{
        alertFactory.info('Porfavor complete la informacion');
      }
    }

    //fecha
    $('#fecha .input-group.date').datepicker({
        todayBtn: "linked",
        keyboardNavigation: true,
        forceParse: false,
        calendarWeeks: true,
        autoclose: true,
        todayHighlight: true
      //startDate: new Date()
    });

    //espera que el documento se pinte para llenar el dataTable
    var waitDrawDocument = function (dataTable) {
        setTimeout(function () {
            var indicePorOrdenar = 0;
            if (dataTable == 'dataTableUtilidad') {
                indicePorOrdenar = 9;
            }

            $('.' + dataTable).DataTable({
                order: [[indicePorOrdenar, 'desc']],
                dom: '<"html5buttons"B>lTfgitp',
                buttons: [
                    {
                        extend: 'excel',
                        title: 'MargenUtilidad'
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



});