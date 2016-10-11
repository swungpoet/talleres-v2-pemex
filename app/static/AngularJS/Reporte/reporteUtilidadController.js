// -- =============================================
// -- Author:      Carlos Adolfo Martinez Diosdado
// -- Create date: 30/08/2016
// -- Description: Reporte Utilidad controller
// -- =============================================

registrationModule.controller('reporteUtilidadController', function ($scope, alertFactory, $rootScope, localStorageService, reporteUtilidadRepository) {     
        $scope.arrayMargen = [];
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
        $scope.copade = '';
    }

    $scope.facturadas = function () {   
    $scope.fechaInicio == "" ? $scope.fechaInicio = '01/01/2010' : $scope.fechaInicio;
    $scope.fechaFin == "" ? $scope.fechaFin = '11/29/2020' : $scope.fechaFin;
    $scope.tipoOrden;
    $scope.facturado;
    $scope.copade == "" ? $scope.copade = 0 : $scope.copade;
    $scope.getMargenUtilidad($scope.fechaInicio, $scope.fechaFin, 0, $scope.tipoOrden, $scope.facturado, $scope.copade);
    }

    $scope.ordenes = function () {
    $scope.numeroTrabajo;
    $scope.getMargenUtilidad(null,null, $scope.numeroTrabajo, null, null, 0);
    }
       //obtiene el total de las citas
    $scope.getMargenUtilidad = function (fechaInicio, fechaFin, numeroTrabajo, tipoOrden, facturado, copade) {
         if(($scope.tipoOrden != '' && $scope.facturado != '') || ($scope.numeroTrabajo != '') || ($scope.copade != '')){
            $('.dataTableUtilidad').DataTable().destroy();
            reporteUtilidadRepository.getUtilidad(fechaInicio, fechaFin, numeroTrabajo, tipoOrden, facturado, copade).then(function (utilidad) {
                $scope.arrayMargen = [];
                $scope.margenUtilidad = utilidad.data;
                
                $scope.margenUtilidad.forEach(function (p, i) {
                    if($scope.margenUtilidad[i].costoOrden != null){
                    $scope.costoOrden = $scope.margenUtilidad[i].costoOrden;
                    $scope.idCita = $scope.margenUtilidad[i].idCita;
                    $scope.numeroTrabajo = $scope.margenUtilidad[i].numeroTrabajo;
                    $scope.numEconomico = $scope.margenUtilidad[i].numEconomico;
                    $scope.zona = $scope.margenUtilidad[i].zona;
                    $scope.TAR = $scope.margenUtilidad[i].TAR;
                    $scope.razonSocial = $scope.margenUtilidad[i].razonSocial;
                    $scope.descripcionLarga = $scope.margenUtilidad[i].descripcionLarga;
                    $scope.fecha = $scope.margenUtilidad[i].fecha;
                    $scope.precioOrden = $scope.margenUtilidad[i].precioOrden;
                    $scope.razonSocialCM = $scope.margenUtilidad[i].razonSocialCM;
                    $scope.margen = ($scope.margenUtilidad[i].precioOrden - $scope.margenUtilidad[i].costoOrden) * (100) / ($scope.margenUtilidad[i].precioOrden);
                    $scope.utilidad = ($scope.margenUtilidad[i].precioOrden - $scope.margenUtilidad[i].costoOrden);
                   
                    $scope.arrayMargen.push({
                        idCita:$scope.idCita,
                        numeroTrabajo:$scope.numeroTrabajo,
                        numEconomico:$scope.numEconomico,
                        zona:$scope.zona,
                        TAR:$scope.TAR,
                        razonSocial:$scope.razonSocial,
                        descripcionLarga:$scope.descripcionLarga,
                        fecha:$scope.fecha,
                        costoOrden:$scope.costoOrden,
                        precioOrden:$scope.precioOrden,
                        razonSocialCM:$scope.razonSocialCM,
                        utilidad:$scope.utilidad,
                        margen:$scope.margen
                             });
                        }
                 });

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
   /* var waitDrawDocument = function (dataTable) {
        setTimeout(function () {
            $('.' + dataTable).DataTable({
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
    }*/

        //espera que el documento se pinte para llenar el dataTable
    var waitDrawDocument = function (dataTable) {
        setTimeout(function () {
           var indicePorOrdenar = 0;
            if (dataTable == 'dataTableUtilidad') {
               indicePorOrdenar = 10;
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