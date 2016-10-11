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
        ordenServicioRepository.getAprobacionUtilidad().then(function (aprobacionUtilidad) {
            debugger;
            if (aprobacionUtilidad.data.length > 0) {
                alertFactory.success("Orden encontrada");
                $scope.aprobacionUtilidades = aprobacionUtilidad.data;
            } else {
                alertFactory.info("No se encontró el número de órden especificado");
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
     
        $('.btnVerificarOrden').ready(function () {

                swal({
                    title: "Se aprobará la utilidad",
                    text: "Utilidad",
                    type: "warning",
                    showCancelButton: false,
                    confirmButtonColor: "#67BF11",
                    confirmButtonText: "Aceptar",
                    closeOnConfirm: true
                },
                function (isConfirm) {
                    /*if (isConfirm) {
                       ordenServicioRepository.putAprobacionUtilidad(idTrabajo,$scope.userData.idUsuario).then(function (aprobacionUtilidad) {
                            if (aprobacionUtilidad.data[0].id > 0) {
                                swal("Proceso Realizado!");
                            }
                        }, function (error) {
                            alertFactory.error("Error al cargar la orden");
                        });
                        swal("Proceso Realizado!");
                    }   */                 
                  });
         });   
                
    }

});



