// -- =============================================
// -- Author:      Anel Candi Pérez pérez
// -- Create date: 10/10/2016
// -- Description: Arobación de utilidad
// -- Modificó: 
// -- Fecha: 
// -- Modificó: 
// -- Fecha:
// -- =============================================

registrationModule.controller('aprobacionutilidadController', function ($scope, $modal, $route, $rootScope, localStorageService, alertFactory, ordenServicioRepository, uploadRepository, ordenPorCobrarRepository, ordenAnticipoRepository, trabajoRepository ) {
        $scope.idTipoCotizacion=0;
        $scope.ideTaller=0;
    //init del controller
    $scope.init = function () {
        $scope.getAprobacionUtilidad();
        
    }

    $scope.getAprobacionUtilidad = function () {


        $('.dataTableAprobacionUtilidad').DataTable().destroy();
        ordenServicioRepository.getAprobacionUtilidad().then(function (aprobacionUtilidad) {
     
            if (aprobacionUtilidad.data.length > 0) {
               // alertFactory.success("Orden encontrada");
                $scope.aprobacionUtilidades = aprobacionUtilidad.data;
                waitDrawDocument("dataTableAprobacionUtilidad");
            } else {
                alertFactory.info("No se encontrarón datos");
            }
        }, function (error) {
            alertFactory.error("Error al cargar la orden");
        });
    }

     //visualiza la orden de servicio
    $scope.lookAt = function (trabajo, valBotonera) {
        var objBotonera = {};
        objBotonera.accion = valBotonera;
        objBotonera.idCita = trabajo.idCita;
        localStorageService.set('objTrabajo', trabajo);
        localStorageService.set("botonera", objBotonera);
        localStorageService.set('actualizaCosto', trabajo.numeroTrabajo)
        location.href = '/ordenservicio?state=1';
    }

     $scope.aprobar = function (utilidad) {
    
       $scope.idAprobacionUtilidad=utilidad.idAprobacionUtilidad; 

        modal_detalle_cotizacion($scope, $modal, utilidad.idTrabajo, 'Aprobacion', $scope.aprobarUtilidad, '');  
    }

    $scope.aprobarUtilidad = function (){
         $('.modal-dialog').css('width','600px'); 
         modal_tiket($scope, $modal, $scope.idAprobacionUtilidad, 'Aprobacion', $scope.getAprobacionUtilidad, '');         
    }

});



