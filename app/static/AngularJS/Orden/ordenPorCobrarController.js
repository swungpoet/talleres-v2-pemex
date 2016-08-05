registrationModule.controller('ordenPorCobrarController', function ($scope, localStorageService, alertFactory, ordenPorCobrarRepository, $rootScope) {

    $scope.message = "Buscando...";
    $scope.userData = localStorageService.get('userData');

    $scope.init = function () {
        $scope.fecha='';
        $scope.getOrdenesPorCobrar();
        if ($scope.userData.idTipoUsuario == 1 || $scope.userData.idTipoUsuario == 2) {
            $scope.preFacturas();
        }
    }

    //Devuelve las órdenes por cobrar
    $scope.getOrdenesPorCobrar = function () {
        $scope.promise =
            ordenPorCobrarRepository.getOrdenesPorCobrar().then(function (result) {
                if (result.data.length > 0) {
                    $scope.ordenes = result.data;
                    setTimeout(function () {
                        $('.dataTableOrdenesPorCobrar').DataTable({
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
                    alertFactory.info('No se encontraron ordenes por cobrar.');
                }
            }, function (error) {
                alertFactory.error("No se pudieron obtener las órdenes por cobrar");
            });
    }

    //Carga Adenda y Copade
    $scope.subir = function (idTrabajo) {
        $scope.idTrabajo = idTrabajo;
        $('#subirAdenda').appendTo('body').modal('show');
    }

    $scope.trabajoCobrado = function () {
        $('.dataTableOrdenesPorCobrar').DataTable().destroy();
        ordenPorCobrarRepository.putTrabajoCobrado($scope.idTrabajo).then(function (result) {
            if (result.data.length > 0) {
                alertFactory.success('Trabajo cobrado exitosamente');
            } else {
                alertFactory.info('No se pudo actualizar el trabajo cobrado');
            }
        }, function (error) {
            alertFactory.error("Error al actualizar el trabajo cobrado");
        });
    }

    //Se realiza la carga de archivos
    $scope.cargarArchivos = function () {
        //Se obtienen los datos de los archivos a subir
        formArchivos = document.getElementById("uploader");
        contentForm = (formArchivos.contentWindow || formArchivos.contentDocument);
        if (contentForm.document)
            btnSubmit = contentForm.document.getElementById("submit2");
        elements = contentForm.document.getElementById("uploadForm").elements;
        idTrabajoEdit = contentForm.document.getElementById("idTrabajo");
        idCotizacionEdit = contentForm.document.getElementById("idCotizacion");
        idTipoEvidencia = contentForm.document.getElementById("idTipoEvidencia");
        vTrabajo = contentForm.document.getElementById("vTrabajo");
        idUsuario = contentForm.document.getElementById("idUsuario");
        idCategoria = contentForm.document.getElementById("idCategoria");
        idNombreEspecial = contentForm.document.getElementById("idNombreEspecial");
        idTrabajoEdit.value = $scope.idTrabajo;
        vTrabajo.value = "1";
        idTipoEvidencia.value = 1;
        idCategoria.value = 2;
        idNombreEspecial.value = 4; //Adenda
        idUsuario.value = $scope.userData.idUsuario;
        //Submit del botón del Form para subir los archivos        
        btnSubmit.click();

        setTimeout(function () {            
            $scope.getOrdenesPorCobrar();
            $scope.trabajoCobrado();
            $scope.preFacturas();
        }, 2000);
    }

    //Visualiza la órden de servicio
    $scope.aprobarTrabajo = function (orden, valBotonera) {
        var objBotonera = {};
        objBotonera.accion = valBotonera;
        objBotonera.idCita = orden.idCita;
        localStorageService.set('objTrabajo', orden);
        localStorageService.set("botonera", objBotonera);
        location.href = '/ordenservicio';
    }

    $scope.preFacturas = function () {
        $('.dataTablePreFacturas').DataTable().destroy();
        ordenPorCobrarRepository.getPreFacturas().then(function (result) {
            if (result.data.length > 0) {
                $scope.facturas = result.data;
                setTimeout(function () {
                    $('.dataTablePreFacturas').DataTable({
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
                alertFactory.info('No se encontraron trabajos por cobrar');
            }
        }, function (error) {
            alertFactory.error("Error al obtener trabajos por cobrar");
        });
    }

    $scope.generaTXT = function (idTrabajo, numeroTrabajo) {
        ordenPorCobrarRepository.getGeneraTXT(idTrabajo).then(function (result) {
            if (result.data.length > 0) {
                alertFactory.success("PreFactura generada correctamente!");
                $scope.downloadFile($rootScope.vIpServer + '/facturas/factura-' + numeroTrabajo + '.txt')
            } else {
                alertFactory.info('No existe la factura.xml');
            }
        }, function (error) {
            alertFactory.error("Error al generar la prefactura");
        });
    }
        $('#fechaTrabajo .input-group.date').datepicker({
        todayBtn: "linked",
        keyboardNavigation: true,
        forceParse: false,
        calendarWeeks: true,
        autoclose: true,
        todayHighlight: true
    });

     $scope.openFinishingTrabajoModal = function (idTrabajo) {
        $('#finalizarTrabajoModal').appendTo("body").modal('show');
         $scope.idTrabajo=idTrabajo;
          ordenPorCobrarRepository.getFechaCopade($scope.idTrabajo,5).then(function (result) {
                   $scope.resultado = result.data[0];  
                   $scope.fecha = $scope.resultado.fecha;
                }, function (error) {
                    alertFactory.error("Error al buscar la fecha");
                });
    }    
    $scope.saveFecha = function () {
      $scope.idTrabajo;
      $scope.fecha;
      if($scope.fecha!=''){
              ordenPorCobrarRepository.putFechaCopade($scope.fecha,$scope.idTrabajo,5).then(function (result) {
                   $scope.resultado = result.data; 
                   $scope.fecha=''; 
                    $('#finalizarTrabajoModal').modal('hide');  
                }, function (error) {
                    alertFactory.error("Error al insertar la fecha");
                });
       }else{
           alertFactory.info('Debe ingresar una fecha');
      }

    } 
    $scope.cleanfecha = function () {
    $scope.fecha=''; 
}


    $scope.downloadFile = function (downloadPath) {
        window.open(downloadPath, '_blank', 'Factura');  
    }

});