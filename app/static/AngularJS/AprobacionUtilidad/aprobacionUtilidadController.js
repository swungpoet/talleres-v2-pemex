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
     
            if (aprobacionUtilidad.data.length > 0) {
                alertFactory.success("Orden encontrada");
                $scope.aprobacionUtilidades = aprobacionUtilidad.data;
                setTimeout(function () {
                    $('.dataTableAprobacionUtilidad').DataTable({
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
                }, 1000);
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

     $scope.aprobar = function (idAprobacionUtilidad) {

     
        $('.btn-aprobar').ready(function () {
                swal({
                    title: "Advertencia",
                    text: "¿Desea aprobar la orden con el margen de utilidad?.",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#67BF11",  
                    confirmButtonText: "Si",
                    cancelButtonText: "No",
                    closeOnConfirm: true,
                    closeOnCancel: true
                },
                function (isConfirm) {
                    if (isConfirm) {
                 
                       ordenServicioRepository.putAprobacionUtilidadRespuesta(idAprobacionUtilidad,$scope.userData.idUsuario).then(function (aprobacionUtilidad) {
                            if (aprobacionUtilidad.data[0].id > 0) {
                                 $scope.getAprobacionUtilidad();
                                 swal("Proceso Realizado!");                               
                            }
                        }, function (error) {
                            alertFactory.error("Error al cargar la orden");
                        });
                    }                   
                  });
         });   
                
    }

});



