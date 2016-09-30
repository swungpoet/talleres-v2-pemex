// -- =============================================
// -- Author:      Vladimir Juárez Juárez
// -- Create date: 15/08/2016
// -- Description: Administración Orden controller
// -- Modificó: 
// -- Fecha: 
// -- Modificó: 
// -- Fecha:
// -- =============================================

registrationModule.controller('administracionOrdenController', function ($scope, $route, $rootScope, localStorageService, alertFactory, ordenServicioRepository, uploadRepository, ordenPorCobrarRepository ) {
    //init del controller
    $scope.init = function () {
        //configuraciones de dropzone
        Dropzone.autoDiscover = false;
        $scope.dzOptionsArchivos = uploadRepository.getDzOptions('text/xml,application/pdf', 2);
        //realiza la búsqueda si viene la página órdenes
        if(localStorageService.get('actualizaCosto') != null){
            $scope.numeroTrabajo = localStorageService.get('actualizaCosto');
            localStorageService.remove('actualizaCosto');
            $scope.getAdmonOrdenes($scope.numeroTrabajo);
        }
    }

    $scope.getAdmonOrdenes = function (numeroTrabajo) {
        ordenServicioRepository.getAdmonOrdenes(numeroTrabajo).then(function (admonOrden) {
            if (admonOrden.data.length > 0) {
                alertFactory.success("Orden encontrada");
                $scope.admonOrdenes = admonOrden.data;
            } else {
                alertFactory.info("No se encontró el número de órden especificado");
            }
        }, function (error) {
            alertFactory.error("Error al cargar la orden");
        });
    }

    $scope.verFactura = function (idTrabajo) {
        window.open($rootScope.vIpServer + '/uploads/files/' + idTrabajo + '/documentos/factura/Factura.xml', '_blank', 'Factura');
        window.open($rootScope.vIpServer + '/uploads/files/' + idTrabajo + '/documentos/factura/Factura.pdf', '_blank', 'Factura');
    }
 
    // Cierre de Orden
    $scope.cierreTrabajo = function (idTrabajo) {
        ordenServicioRepository.cierreOrden(idTrabajo).then(function (admonOrden) {
            if (admonOrden.data.length > 0) {
                alertFactory.success("Orden movida a cierre de orden");
                location.href = '/trabajo';
            } else {
                alertFactory.info("No se pudo mover la orden");
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

    //call backs of drop zone
    $scope.dzCallbacks = {
        'addedfile': function (file) {
            $scope.newFile = file;
        },
        'sending': function (file, xhr, formData) {
            formData.append('idTrabajo', $scope.idTrabajo);
            formData.append('idCotizacion', 0);
            formData.append('idCategoria', $scope.idCategoria);
            formData.append('idNombreEspecial', $scope.idNombreEspecial);
        },
        'completemultiple': function (file, xhr) {
            var checkErrorFile = file.some(checkExistsError);
            if (!checkErrorFile) {
                var allSuccess = file.every(checkAllSuccess);
                if (allSuccess) {
                    alertFactory.success("Archivos subidos satisfactoriamente");
                    setTimeout(function () {
                        $('#cargaArchivosModal').appendTo("body").modal('hide');
                        $scope.dzMethods.removeAllFiles(true);
                    }, 1000)
                }
            }
        },
        'error': function (file, xhr) {
            if (!file.accepted) {
                $scope.dzMethods.removeFile(file);
            } else {
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

    $scope.openFacturaModal = function (idTrabajo) {
        $('#cargaArchivosModal').appendTo("body").modal('show');
        $scope.idTrabajo = idTrabajo;
        $scope.idCategoria = 2;
        $scope.idNombreEspecial = 3;
    }

    //genera el txt de la factura
    $scope.generaTXT = function (idTrabajo, numeroTrabajo) {
        ordenPorCobrarRepository.getGeneraTXT(idTrabajo).then(function (result) {
            if (result.data.length > 0) {
                alertFactory.success("PreFactura generada correctamente!");
                window.open($rootScope.vIpServer + '/facturas/factura-' + numeroTrabajo + '.txt', '_blank', 'Factura'); 
            } else {
                alertFactory.info('No existe la factura.xml');
            }
        }, function (error) {
            alertFactory.error("Error al generar la prefactura");
        });
    }
});