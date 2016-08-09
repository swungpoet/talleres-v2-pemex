registrationModule.controller('ordenPorCobrarController', function ($scope, localStorageService, alertFactory, ordenPorCobrarRepository, $rootScope, uploadRepository) {

    $scope.message = "Buscando...";
    $scope.userData = localStorageService.get('userData');

    $scope.init = function () {
        Dropzone.autoDiscover = false;
        $scope.dzOptionsOrdenCobrar = uploadRepository.getDzOptions("application/pdf,text/xml",2);
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
        $scope.ordenes.forEach(function (p, i) {
           if(p.idTrabajo == idTrabajo){
             if(p.fechaCopade != null){
        $('#subirAdenda').appendTo('body').modal('show');
         }else{
             alertFactory.info('Debe ingresar una fecha');
         }
       }
     });
    }
    $scope.removePieza = function(idItem){
        $scope.listaPiezas.forEach(function(p, i){
            if(p.idItem == idItem){
                if(p.cantidad > 1){
                    $scope.listaPiezas[i].cantidad =  p.cantidad - 1;
                }
                else{
                    $scope.listaPiezas.splice(i,1); 
                }
            }   
        })
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
    //Devuelve la fecha de la copade para su edicion
     $scope.openFinishingTrabajoModal = function (idTrabajo) {
        $('#finalizarTrabajoModal').appendTo("body").modal('show');
         $scope.idTrabajo=idTrabajo;
          ordenPorCobrarRepository.getFechaCopade($scope.idTrabajo,5).then(function (result) {
                   $scope.resultado = result.data[0];  
                }, function (error) {
                    alertFactory.error("Error al buscar la fecha");
                });
    }    
    //Guardamos la fecha capturable de la copade
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
    //Limpia en campo de la fecha para su edicion
    $scope.cleanfecha = function () {
    $scope.fecha=''; 
}


    $scope.downloadFile = function (downloadPath) {
        window.open(downloadPath, '_blank', 'Factura');  
    }
    
    //Se realiza la carga de archivos
    //call backs of drop zone
    $scope.dzCallbacks = {
        'addedfile': function (file) {
            $scope.newFile = file;
        },
        'sending': function(file, xhr, formData){
            formData.append('idTrabajo', $scope.idTrabajo);
            formData.append('idCotizacion', 0);
            formData.append('idCategoria', 2);
            formData.append('idNombreEspecial', 4);//adencaCopade
        }
        ,
        'completemultiple': function (file, xhr) {
            var checkErrorFile = file.some(checkExistsError);
            if(!checkErrorFile){
                var allSuccess = file.every(checkAllSuccess);
                if(allSuccess){
                    $scope.getOrdenesPorCobrar();
                    $scope.trabajoCobrado();
                    $scope.preFacturas();
                    setTimeout(function(){
                        $scope.dzMethods.removeAllFiles(true);
                        $('#subirAdenda').appendTo('body').modal('hide');
                    },1000);
                }
            }
        },
        'error': function (file, xhr) {
            if(!file.accepted){
                $scope.dzMethods.removeFile(file);
            }
            else{
                $scope.dzMethods.removeAllFiles(true);
                alertFactory.info("No se pudieron subir los archivos");   
            }
        },
    };

    //valida si todos son success
    function checkAllSuccess(file, index, array) {
        return file.status === 'success';
    }
    
    //valida si existe algún error
    function checkExistsError(file) {
        return file.status === 'error';
    }
});