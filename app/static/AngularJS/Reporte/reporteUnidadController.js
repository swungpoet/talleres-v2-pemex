// -- =============================================
// -- Author:      Vladimir Juárez Juárez
// -- Create date: 22/09/2016
// -- Description: Reporte Unidad Controller
// -- =============================================

registrationModule.controller('reporteUnidadController', function ($scope, alertFactory, $rootScope, localStorageService, reporteUnidadRepository) {

    //Inicializa la pagina
    $scope.init = function () {
        
    }
    
    //Obtiene todas las citas no canceladas generadas para cierta unidad
    $scope.getHistorialUnidad = function(numeroEconomico){
        if(numeroEconomico != ''){
            //carga de citas
            $('.dataTableCita').DataTable().destroy();
            reporteUnidadRepository.getCitasUnidad(numeroEconomico).then(function(citasUnidad){
                if(citasUnidad.data.length > 0){
                    $scope.citasUnidad = citasUnidad.data;
                    alertFactory.success("Citas cargadas");
                    waitDrawDocument("dataTableCita");
                } 
                else{
                    alertFactory.info("No existen citas en el historial de la unidad requerida");
                }
            }, function(error){
                alertFactory.error("Error al obtener citas de la unidad");
            });

            //carga de cotizaciones
            $('.dataTableCotizacion').DataTable().destroy();
            reporteUnidadRepository.getCotizacionesUnidad(numeroEconomico).then(function(cotizacionesUnidad){
                if(cotizacionesUnidad.data.length > 0){
                    $scope.cotizacionesUnidad = cotizacionesUnidad.data;
                    alertFactory.success("Cotizaciones cargadas");
                    waitDrawDocument("dataTableCotizacion");
                } 
                else{
                    alertFactory.info("No existen cotizaciones en el historial de la unidad requerida");
                }
            }, function(error){
                alertFactory.error("Error al obtener cotizaciones de la unidad");
            });

            //carga de órdenes
            $('.dataTableOrden').DataTable().destroy();
            reporteUnidadRepository.getOrdenesUnidad(numeroEconomico).then(function(ordenesUnidad){
                if(ordenesUnidad.data.length > 0){
                    $scope.ordenesUnidad = ordenesUnidad.data;
                    alertFactory.success("Órdenes cargadas");
                    waitDrawDocument("dataTableOrden");
                } 
                else{
                    alertFactory.info("No existen órdenes en el historial de la unidad requerida");
                }
            }, function(error){
                alertFactory.error("Error al obtener órdenes de la unidad");
            });
        }
        else{
            alertFactory.info("Ingresar el número económico de la unidad");
        }
        $scope.numeroEconomico = '';
        $scope.citasUnidad = [];
        $scope.cotizacionesUnidad = [];
        $scope.ordenesUnidad = [];
    }
    
    //espera que el documento se pinte para llenar el dataTable
    var waitDrawDocument = function (dataTable) {
        setTimeout(function () {
            $('.' + dataTable).DataTable({
                dom: '<"html5buttons"B>lTfgitp',
                buttons: [
                    {
                        extend: 'excel',
                        title: 'OrdenServicio'
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