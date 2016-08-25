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
        ordenAnticipoRepository.getOrdenesAnticipoPendiente().then(function(anticipoPendiente){
            if(anticipoPendiente.data.length){
                alertFactory.success("Órdenes con anticipos pendientes cargados");
            }
            else{
                alertFactory.info("No existen órdenes con anticipos pendientes")
            }
        }, function(error){
            alertFactory.error("Error al obtener órdenes con anticipo pendiente");
        });
    }
    
    //obtiene las órdenes con anticipos aplicados
    var getOrdenesAnticipoAplicado = function(){
        ordenAnticipoRepository.getOrdenesAnticipoAplicado().then(function(anticipoAplicado){
            if(anticipoAplicado.data.length){
                alertFactory.success("Órdenes con anticipos aplicados cargados");
            }
            else{
                alertFactory.info("No existen órdenes con anticipos aplicados")
            }
        }, function(error){
            alertFactory.error("Error al obtener órdenes con anticipo aplicado");
        });
    }
});