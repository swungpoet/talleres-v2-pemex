// -- =============================================
// -- Author:      Anel Candi Pérez pérez
// -- Create date: 10/10/2016
// -- Description: Arobación de utilidad
// -- Modificó: 
// -- Fecha: 
// -- Modificó: 
// -- Fecha:
// -- =============================================

registrationModule.controller('aprobacionutilidadController', function ($scope, $route, $rootScope, localStorageService, alertFactory, ordenServicioRepository, uploadRepository, ordenPorCobrarRepository, ordenAnticipoRepository, trabajoRepository ) {
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
     
       ordenServicioRepository.getDetalleOrden(parseInt(utilidad.idTrabajo)).then(function (detalle) {
            $scope.detalleOrden=detalle.data;
            $scope.sumaIvaTotal = 0;
            $scope.sumaPrecioTotal =0;
            $scope.sumaIvaTotalCliente =0;
            $scope.sumaPrecioTotalCliente =0;
            $scope.sumaGranTotal =0;
            $scope.sumaGranTotalCliente =0;
            $scope.detalleOrden=detalle.data;
             for (var i = 0; i < detalle.data.length; i++) {
                //Sumatoria Taller
                $scope.sumaIvaTotal += (detalle.data[i].cantidad * detalle.data[i].precio) * (detalle.data[i].valorIva / 100);
                $scope.sumaPrecioTotal += (detalle.data[i].cantidad * detalle.data[i].precio);

                //Sumatoria Cliente
                $scope.sumaIvaTotalCliente += (detalle.data[i].cantidad * detalle.data[i].precioCliente) * (detalle.data[i].valorIva / 100);
                $scope.sumaPrecioTotalCliente += (detalle.data[i].cantidad * detalle.data[i].precioCliente);
            }
            //Total Taller
            $scope.sumaGranTotal = ($scope.sumaPrecioTotal + $scope.sumaIvaTotal);

            //Total Cliente
            $scope.sumaGranTotalCliente = ($scope.sumaPrecioTotalCliente + $scope.sumaIvaTotalCliente);

            $('.modal-dialog').css('width','1000px'); 
            $('#cotizacionDetalle').appendTo("body").modal('show');



        }, function (error) {
           alertFactory.error("Error al cargar la orden");
        });

                
    }

    $scope.aprobarUtilidad = function (){
         $('#cotizacionDetalle').modal('hide');
         $('.modal-dialog').css('width','600px'); 
         $scope.token='';
         $('#insertarToken').appendTo('body').modal('show');          
    }

    $scope.saveToken = function () {
        ordenServicioRepository.estatusToken($scope.token).then(function (estatus) {
      
            if (estatus.data.length > 0) {
                if (estatus.data[0].estatus == 1) {
                   // swal("Token disponible"); 
                   $('#insertarToken').modal('hide');
                    ordenServicioRepository.putAprobacionUtilidadRespuesta($scope.idAprobacionUtilidad,$scope.userData.idUsuario, $scope.token).then(function (aprobacionUtilidad) {
                    
                        if (aprobacionUtilidad.data[0].id > 0) {
                            
                             $scope.getAprobacionUtilidad();
                             //alertFactory.success("Proceso Realizado!");                               
                        }
                    }, function (error) {
                        alertFactory.error("Error al cargar la orden");
                    });
                }else{
                    alertFactory.error("El token se ha utilizado previamente."); 
                }
                                               
            }else{
                 alertFactory.error("El token es incorrecto");  
            }
        }, function (error) {
            alertFactory.error("Error al cargar la orden.");
        });
    }

});



