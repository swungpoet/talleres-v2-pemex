// -- =============================================
// -- Author:      Vladimir Juárez Juárez
// -- Create date: 15/08/2016
// -- Description: Administración Orden controller
// -- Modificó: 
// -- Fecha: 
// -- Modificó: 
// -- Fecha:
// -- =============================================

registrationModule.controller('administracionOrdenController', function ($scope, $route, $rootScope, localStorageService, alertFactory, ordenServicioRepository, uploadRepository, ordenPorCobrarRepository, ordenAnticipoRepository, trabajoRepository ) {
        $scope.idTipoCotizacion=0;
        $scope.ideTaller=0;
    //init del controller
    $scope.init = function () {
        $scope.tipoCotizacion();
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

    //visualiza las facturas de las cotizaciones
    $scope.verFactura = function (cotizacion) {
        window.open($rootScope.vIpServer + '/uploads/files/' + cotizacion.idTrabajo +'/'+ cotizacion.idCotizacion + '/documentos/factura/Factura_'+cotizacion.numeroCotizacion+'.xml', '_blank', 'Factura');
        window.open($rootScope.vIpServer + '/uploads/files/' + cotizacion.idTrabajo +'/'+ cotizacion.idCotizacion + '/documentos/factura/Factura_'+cotizacion.numeroCotizacion+'.pdf', '_blank', 'Factura');
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

     //genera el txt de la factura
    $scope.actualizaProveedor = function () {
 
        ordenServicioRepository.updateCotMaestro($scope.idCotizacion, $scope.idTipoCotizacion, $scope.ideTaller).then(function (result) {
            if (result.data.length > 0) {
                alertFactory.success("IdProveedor insertado correctamente!");
                 $('#editaCMaestro').appendTo('body').modal('hide');
            } else {
                alertFactory.info('No se pudo realizar el proceso');
            }
        }, function (error) {
            alertFactory.error("Error al actualizar el IdProveedor");
        });

    }

    $scope.modalEditaCM = function (idCotizacion) {
      $('#editaCMaestro').appendTo("body").modal('show');
      ordenServicioRepository.recuperaCotizacion(idCotizacion).then(function (result) {
           $scope.proveedor=result.data;
           $scope.ideTaller=$scope.proveedor[0].idTaller;
           $scope.idTipoCotizacion=$scope.proveedor[0].idTipoCotizacion;
        }, function (error) {
            alertFactory.error("Error al actualizar el IdProveedor");
        });

        $scope.idCotizacion = idCotizacion;
    }
      //obtiene el tipo de Cotizacion
    $scope.tipoCotizacion = function () {
        ordenServicioRepository.tipoCotizacion().then(function (result) {
           $scope.tipoCotizacion=result.data;
        }, function (error) {
            alertFactory.error("Error al actualizar el IdProveedor");
        });
    }

    //obtiene el idCotizacion
    $scope.getIdCotizacion = function (idCotizacion, numeroCotizacion) {
        $scope.idCotizacionFactura = idCotizacion;
        $scope.numeroCotizacion = numeroCotizacion;
    }
    
    //obtienes las cotizaciones de la orden
    $scope.getCotizacionesOrden = function (idTrabajo) {
        ordenAnticipoRepository.getCotizacionesOrden(idTrabajo).then(function (ordenAnticipo) {
            if (ordenAnticipo.data.length > 0) {
                alertFactory.success("Cotizaciones cargadas");
                $scope.cotizacionesOrden = ordenAnticipo.data;
            }
        }, function (error) {
            alertFactory.error("Error al obtener las cotizaciones de la orden");
        })
    }
    
    //LQMA 13092016 Obtiene el popopo que corresponde a su cotizacion por trabajo
    $scope.getCotizacionesOrdenAprobado = function (idTrabajo) {
        trabajoRepository.getCotizacionesOrdenAprobado(idTrabajo,11).then(function (ordenAnticipo) {
            if (ordenAnticipo.data.length > 0) {
                alertFactory.success("Cotizaciones cargadas");
                $scope.cotizacionesOrden = ordenAnticipo.data;
            }
        }, function (error) {
            alertFactory.error("Error al obtener las cotizaciones de la orden");
        })
    }
    
    //muestra el modal para la carga de archivos
    $scope.adjuntar = function (objOrden, idNombreEspecial, ejecutaMetodo, anticipo) {
        $scope.idTrabajo = objOrden.idTrabajo;
        //LQMA add 19092016
        $scope.idEstatusPorCerrar = objOrden.estatusTrabajo;
        
        $scope.idCotizacionFactura != null || $scope.idCotizacionFactura != 'undefined' ? 
            $scope.idCotizacion = $scope.idCotizacionFactura + '|' + $scope.numeroCotizacion : 
            $scope.idCotizacion = 0;  

        $scope.idCategoria = 2;
        $scope.idNombreEspecial = idNombreEspecial;
        $scope.ejecutaMetodo = ejecutaMetodo;
        if (anticipo == 1) {
            $scope.anticipo = 1;
            $scope.tituloModal = 'Solicitud de Anticipo';
            $scope.textoBoton = 'Solicitar';
            //$scope.getMontoOrdenTrabajo(objOrden.idCita);
        } else {
            $scope.anticipo = 0;
            $scope.tituloModal = 'Carga Archivo';
            $scope.textoBoton = 'Cargar';
        }
        $('#modalCargaArchivos').appendTo('body').modal('show');
    }
    
    $scope.dzCallbacks = {
        'addedfile': function (file) {
            $scope.newFile = file;
        },
        'sending': function (file, xhr, formData) {
            formData.append('idTrabajo', $scope.idTrabajo);
            formData.append('idCotizacion', $scope.idCotizacion);
            formData.append('idCategoria', $scope.idCategoria);
            formData.append('idNombreEspecial', $scope.idNombreEspecial);
            //LQMA  add 15092016  --idEstatus , define si crea el archivo de forma temporal
            formData.append('idEstatus', $scope.idEstatusPorCerrar);
        },
        'completemultiple': function (file, xhr) {
            var checkErrorFile = file.some(checkExistsError);
            if (!checkErrorFile) {
                var allSuccess = file.every(checkAllSuccess);
                if (allSuccess) {
                    if ($scope.idNombreEspecial == 3) {
                        trabajoRepository.getGuardaFactura($scope.idTrabajo, $scope.idCotizacionFactura, $scope.userData.idUsuario,$scope.idEstatusPorCerrar).then(function (result) {  //LQMA add idEstatusPorCerrar
                            if (result.data.length > 0) {
                                $scope.lecturaFactura = result.data;
                                $scope.totalxml = $scope.lecturaFactura[4].value;
                                // alertFactory.success("Proceso Correcto");
                                if ((($scope.totalxml - 1) <= $scope.totalCotizacionBD) && ($scope.totalCotizacionBD <= ($scope.totalxml + 1))) {
                                    result.data.forEach(function (sumatoria) {
                                        if (sumatoria.name == 'idCotizacion') $scope.idCotizacionFac = sumatoria.value;
                                        if (sumatoria.name == 'numFactura') $scope.numFacturaFac = sumatoria.value;
                                        if (sumatoria.name == 'UUID') $scope.UUIDFac = sumatoria.value;
                                        if (sumatoria.name == 'fechaFactura') $scope.fechaFacturaFac = sumatoria.value;
                                        if (sumatoria.name == 'total') $scope.totalFac = sumatoria.value;
                                        if (sumatoria.name == 'subtotal') $scope.subtotalFac = sumatoria.value;
                                        if (sumatoria.name == 'idUsuario') $scope.idUsuarioFac = sumatoria.value;
                                        if (sumatoria.name == 'xmlFactura') $scope.xmlFacturaFac = sumatoria.value;
                                    });
                                    $scope.guardaDatosFactura($scope.idCotizacionFac, $scope.numFacturaFac, $scope.UUIDFac, $scope.fechaFacturaFac, $scope.totalFac, $scope.subtotalFac, $scope.idUsuarioFac, $scope.xmlFacturaFac);
                                        /*if($scope.idEstatusTrabajo==11){
                                            upadateEstatusTrabajo($scope.idTrabajo, $scope.idNombreEspecial);
                                        }else{*/
                                                setTimeout(function () {
                                                    $scope.dzMethods.removeAllFiles();
                                                    $('#modalCargaArchivos').appendTo('body').modal('hide');
                                                }, 1000);
                                                alertFactory.success("Factura Cargada Correctamente");
                                            //}
                                        //LQMA ADD 20092016, borra solo temporales: idOpcion = 2
                                        $scope.eliminaFactura($scope.idTrabajo, $scope.idCotizacionFactura,2);
                                        setTimeout(function () {
                                             $scope.renombraFacturaTemporal($scope.idTrabajo, $scope.idCotizacionFactura);
                                         },500);


                                } else {
                                        //if($scope.idEstatusTrabajo==11 || $scope.idEstatusPorCerrar == 12){
                                            //LQMA ADD 20092016, borra solo temporales: idOpcion = 1
                                            $scope.eliminaFactura($scope.idTrabajo, $scope.idCotizacionFactura,1); 
                                         //   }
                                    setTimeout(function () {
                                        $scope.dzMethods.removeAllFiles();
                                        $('#modalCargaArchivos').appendTo('body').modal('hide');
                                    }, 1500);
                                    alertFactory.info("El monto de la orden seleccionada rebasa el rango especificado de (+- $1.00 MXN), seleccione una orden que se adecúe con el monto de la Factura");
                                }
                            }
                        }, function (error) {
                            alertFactory.error("Error al cargar la prefactura");
                        });
                    }
                    else if ($scope.anticipo == 1) {
                        setTimeout(function () {
                            $scope.dzMethods.removeAllFiles();
                            $('#modalCargaArchivos').appendTo('body').modal('hide');
                        }, 1000);
                        $scope.anticipo = 0;
                        ordenAnticipoRepository.putAnticipo($scope.idCotizacionFactura).then(function (ordenAnticipo) {
                            alertFactory.success("Anticipo registrado");
                        }, function (error) {
                            alertFactory.error("Error al insertar el anticipo");
                        });
                    } else {
                        setTimeout(function () {
                            $scope.dzMethods.removeAllFiles();
                            $('#modalCargaArchivos').appendTo('body').modal('hide');
                        }, 1000);
                        $scope.getAdmonOrdenes();
                    }
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

    //LQMA add 20092016 renombra factura
    $scope.renombraFacturaTemporal = function (idTrabajo, idCotizacion) {
        trabajoRepository.renombraFacturaTemporal(idTrabajo, idCotizacion).then(function (orden) {
            if (orden.data.length > 0) {
                $scope.cotizacionesOrden = orden.data;
                //alertFactory.info("Cargue nuevamente la Factura");
            }
        }, function (error) {
            alertFactory.error("Error al procesar la informacion Temporal");
        })
    }
    
    //  guardamos datos de la factura
    $scope.guardaDatosFactura = function (idCotizacion, numFactura, UUID, fechaFactura, total, subtotal, idUsuario, xmlFactura) {
            trabajoRepository.insertaFactura(idCotizacion, numFactura, UUID, fechaFactura, total, subtotal, idUsuario, xmlFactura).then(function (result) {
                if (result.data.length > 0) {
                    alertFactory.success("Registro Exitoso");
                }
            }, function (error) {
                alertFactory.error("Error al generar la prefactura");
            });
    }
    
    //eliminamos la factura de la ruta si no coincide el costo
    $scope.eliminaFactura = function (idTrabajo, idCotizacion,idOpcion) {
        trabajoRepository.removeFactura(idTrabajo, idCotizacion,idOpcion).then(function (orden) {
            if (orden.data.length > 0) {
                $scope.cotizacionesOrden = orden.data;
                //alertFactory.info(""); 
            }
        }, function (error) {
            alertFactory.error("Error al procesar la informacion");
        })
    }
    
    //obtiene el idCotizacion
    $scope.getCotizacion = function (idCotizacion, Total, existe, numeroCotizacion, idEstatus) {
        $scope.idCotizacionFactura = idCotizacion;
        $scope.totalCotizacionBD = Total;
        $scope.existeCotizacionFactura = existe;
        $scope.numeroCotizacion = numeroCotizacion;
        $scope.idEstatusTrabajo = idEstatus;
    }
    
    $scope.verificaOrden = function (idTrabajo, sinProveedor) {
        //LQMA 14092016
         if(sinProveedor > 0)
         {
            swal("Existen proveedores sin asignar para todas o algunas de las cotizaciones");
         }
         else
         {
            $('.btnVerificarOrden').ready(function () {
                swal({
                        title: "¿Está seguro de verificar la Orden?",
                        text: "Pasara a Orden por Cobrar",
                        type: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#67BF11",
                        confirmButtonText: "Si",
                        cancelButtonText: "No",
                        closeOnConfirm: false,
                        closeOnCancel: false
                    },
                    function (isConfirm) {
                        if (isConfirm) {
                            trabajoRepository.cotizacionespago(idTrabajo).then(function (ordenVerificada) {
                                if (ordenVerificada.data[0].idHistorialProceso > 0) {
                                    swal("Proceso Realizado!");
                                    //location.href = '/ordenesporcobrar';
                                }
                            }, function (error) {
                                alertFactory.error("Error al verificar la orden");
                            });
                            swal("Proceso Realizado!");
                        } else {
                            swal("Cancelacion de Orden");
                        }
                    });
            });
         }
    }
});