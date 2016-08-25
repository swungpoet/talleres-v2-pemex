// -- =============================================
// -- Author:      V. Vladimir Juárez Juárez
// -- Create date: 25/08/2016
// -- Description: controlador para los anticipos de las órdenes
// -- Modificó: 
// -- Fecha: 
// -- =============================================

registrationModule.controller('ordenAnticipoController', function ($scope,$rootScope, localStorageService, alertFactory, ordenAnticipoRepository) {

    //método de inicio en la pantalla en relación
    $scope.init = function () {
        getOrdenesAnticipoPendiente();
        getOrdenesAnticipoAplicado();
    }
    
    //obitiene las órdenes pendiente de atincipo
    var getOrdenesAnticipoPendiente = function(){
        $scope.promise = ordenAnticipoRepository.getOrdenesAnticipoPendiente().then(function(anticipoPendiente){
            if(anticipoPendiente.data.length){
                $('.dataTablePendienteAnticipo').DataTable().destroy();
                $scope.ordenesAticipoPendiente = anticipoPendiente.data;
                waitDrawDocument("dataTablePendienteAnticipo");
                alertFactory.success("Órdenes con anticipos pendientes cargados");
            }
            else{
                alertFactory.info("No existen órdenes con anticipos pendientes");
            }
        }, function(error){
            alertFactory.error("Error al obtener órdenes con anticipo pendiente");
        });
    }
    
    //obtiene las órdenes con anticipos aplicados
    var getOrdenesAnticipoAplicado = function(){
        $scope.promise = ordenAnticipoRepository.getOrdenesAnticipoAplicado().then(function(anticipoAplicado){
            if(anticipoAplicado.data.length){
                $('.dataTableAnticipoAplicado').DataTable().destroy();
                $scope.ordenesAticipoAplicado = anticipoPendiente.data;
                waitDrawDocument("dataTableAnticipoAplicado");
                alertFactory.success("Órdenes con anticipos aplicados cargados");
            }
            else{
                alertFactory.info("No existen órdenes con anticipos aplicados");
            }
        }, function(error){
            alertFactory.error("Error al obtener órdenes con anticipo aplicado");
        });
    }
    
    //espera que el documento se pinte para llenar el dataTable
    var waitDrawDocument = function (dataTable) {
        setTimeout(function () {
            $('.' + dataTable).DataTable({
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
                        title: 'ExampleFile'
                    },
                    {
                        extend: 'pdf',
                        title: 'ExampleFile'
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