// -- =============================================
// -- Author:      Vladimir Juárez Juárez
// -- Create date: 15/08/2016
// -- Description: Administración Orden controller
// -- Modificó: 
// -- Fecha: 
// -- Modificó: 
// -- Fecha:
// -- =============================================

registrationModule.controller('administracionOrdenController', function ($scope, $route, $rootScope, localStorageService, alertFactory, ordenServicioRepository, uploadRepository, ordenPorCobrarRepository, ordenAnticipoRepository, trabajoRepository) {
    $scope.idTipoCotizacion = 0;
    $scope.ideTaller = 0;
    //init del controller
    $scope.init = function () {
        $scope.tipoCotizacion();
        //configuraciones de dropzone
        Dropzone.autoDiscover = false;
        $scope.dzOptionsArchivos = uploadRepository.getDzOptions('text/xml,application/pdf', 2);
        //realiza la búsqueda si viene la página órdenes
        if (localStorageService.get('actualizaCosto') != null) {
            $scope.numeroTrabajo = localStorageService.get('actualizaCosto');
            localStorageService.remove('actualizaCosto');
            $scope.getAdmonOrdenes($scope.numeroTrabajo);
        }
    }

    $scope.getAdmonOrdenes = function (numeroTrabajo) {
        $('.dataTableOrdenServicio').DataTable().destroy();
        ordenServicioRepository.getAdmonOrdenes(numeroTrabajo).then(function (admonOrden) {
            if (admonOrden.data.length > 0) {
                alertFactory.success("Orden encontrada");
                $scope.admonOrdenes = admonOrden.data;
                waitDrawDocument("dataTableOrdenServicio");
            } else {
                alertFactory.info("No se encontró el número de órden especificado");
            }
        }, function (error) {
            alertFactory.error("Error al cargar la orden");
        });
    }

    //visualiza las facturas de las cotizaciones
    $scope.verFactura = function (cotizacion) {
        window.open($rootScope.vIpServer + '/uploads/files/' + cotizacion.idTrabajo + '/' + cotizacion.idCotizacion + '/documentos/factura/Factura_' + cotizacion.numeroCotizacion + '.xml', '_blank', 'Factura');
        window.open($rootScope.vIpServer + '/uploads/files/' + cotizacion.idTrabajo + '/' + cotizacion.idCotizacion + '/documentos/factura/Factura_' + cotizacion.numeroCotizacion + '.pdf', '_blank', 'Factura');
    }

    //visualizacion de facturas ADOLFO 15092016
    /*  $scope.verFactura = function (idCotizacion, idTrabajo, numeroCotizacion) {
          trabajoRepository.encuentraFactura(idCotizacion, idTrabajo, numeroCotizacion).then(function (resp) {
              if (resp.data == 1) {
                  window.open($rootScope.vIpServer + '/uploads/files/' + idTrabajo + '/' + idCotizacion + '/documentos/factura/Factura_' + numeroCotizacion + '.xml', '_blank', 'Factura');
                  window.open($rootScope.vIpServer + '/uploads/files/' + idTrabajo + '/' + idCotizacion + '/documentos/factura/Factura_' + numeroCotizacion + '.pdf', '_blank', 'Factura');
              } else if (resp.data == 2) {
                  window.open($rootScope.vIpServer + '/uploads/files/' + idTrabajo + '/documentos/factura/Factura.xml', '_blank', 'Factura');
                  window.open($rootScope.vIpServer + '/uploads/files/' + idTrabajo + '/documentos/factura/Factura.pdf', '_blank', 'Factura');
              } else {
                  alertFactory.info("No se encontraron Facturas");
              }
          }, function (error) {
              alertFactory.error('Factura no se pudo obtener');
          });
      }  */

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
                $scope.proveedor = result.data;
                $scope.ideTaller = $scope.proveedor[0].idTaller;
                $scope.idTipoCotizacion = $scope.proveedor[0].idTipoCotizacion;
            }, function (error) {
                alertFactory.error("Error al actualizar el IdProveedor");
            });

            $scope.idCotizacion = idCotizacion;
        }
        //obtiene el tipo de Cotizacion
    $scope.tipoCotizacion = function () {
        ordenServicioRepository.tipoCotizacion().then(function (result) {
            $scope.tipoCotizacion = result.data;
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
        trabajoRepository.getCotizacionesOrdenAprobado(idTrabajo).then(function (ordenAnticipo) {
            if (ordenAnticipo.data.length > 0) {
                alertFactory.success("Cotizaciones cargadas");
                $scope.cotizacionesOrdenAprobado = ordenAnticipo.data;
            }
        }, function (error) {
            alertFactory.error("Error al obtener las cotizaciones de la orden");
        })
    }

    //muestra el modal para la carga de archivos
    $scope.adjuntar = function (objOrden, idNombreEspecial, ejecutaMetodo, anticipo) {
        $scope.idTrabajo = objOrden.idTrabajo;
        //LQMA add 19092016
        //$scope.idEstatusPorCerrar = objOrden.estatusTrabajo;

        $scope.idCotizacionFactura != null || $scope.idCotizacionFactura != undefined ?
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
            //formData.append('idEstatus', $scope.idEstatusPorCerrar);
        },
        'completemultiple': function (file, xhr) {
            var checkErrorFile = file.some(checkExistsError);
            if (!checkErrorFile) {
                var allSuccess = file.every(checkAllSuccess);
                if (allSuccess) {
                    if ($scope.idNombreEspecial == 3) {
                        trabajoRepository.getGuardaFactura($scope.idTrabajo, $scope.idCotizacionFactura, $scope.userData.idUsuario, $scope.numeroCotizacion).then(function (result) { //LQMA add idEstatusPorCerrar
                            if (result.data.length > 0) {
                                $scope.lecturaFactura = result.data;
                                $scope.totalxml = $scope.lecturaFactura[4].value;
                                // alertFactory.success("Proceso Correcto");
                                if (((parseFloat($scope.totalxml) - 1.0000) <= $scope.totalCotizacionBD) && ($scope.totalCotizacionBD <= (parseFloat($scope.totalxml) + 1.0000))) {
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
                                    $scope.eliminaFactura($scope.idTrabajo, $scope.idCotizacionFactura, 2);
                                    setTimeout(function () {
                                        $scope.renombraFacturaTemporal($scope.idTrabajo, $scope.idCotizacionFactura);
                                    }, 500);


                                } else {
                                    //if($scope.idEstatusTrabajo==11 || $scope.idEstatusPorCerrar == 12){
                                    //LQMA ADD 20092016, borra solo temporales: idOpcion = 1
                                    $scope.eliminaFactura($scope.idTrabajo, $scope.idCotizacionFactura, 1);
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
                    } else if ($scope.anticipo == 1) {
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
                $scope.cotizacionesOrdenes = orden.data;
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
    $scope.eliminaFactura = function (idTrabajo, idCotizacion, idOpcion) {
        trabajoRepository.removeFactura(idTrabajo, idCotizacion, idOpcion).then(function (orden) {
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

    $scope.verificaOrden = function (idTrabajo, sinProveedor, montoOrden, precioOrden, numeroTrabajo) {
        //LQMA 14092016
        $scope.idTrabajo=idTrabajo;
        var uitilidad = Math.abs(precioOrden - montoOrden);
        var UtilidadNeta = 0;
        //var UtilidadNeta = (precioOrden * 0.05)+1;

        ordenServicioRepository.getParametro(1, 'MV').then(function (parametro) {

            if (parametro.data.length > 0) {
                UtilidadNeta = (precioOrden * parametro.data[0].valor) + 1;

                if (sinProveedor > 0) {
                    swal("Existen proveedores sin asignar para todas o algunas de las cotizaciones");
                } else {
                    $('.btnVerificarOrden').ready(function () {

                        ordenServicioRepository.getEstatusUtilidad(idTrabajo).then(function (estatusUtilidad) {

                            if (estatusUtilidad.data.length > 0) {

                                if (estatusUtilidad.data[0].estatus == 1) {

                                    swal({
                                        title: "Advertencia",
                                        text: "La uitilidad debe ser minima de 5%, ya se encuentra en espera de aprobación.",
                                        type: "warning",
                                        showCancelButton: false,
                                        confirmButtonColor: "#67BF11",
                                        confirmButtonText: "Aceptar",
                                        closeOnConfirm: true
                                    });

                                } else {
                                    ordenServicioRepository.getOrdenServicio(numeroTrabajo).then(function (result) {
                                        if (result.data.length > 0) {
                                            swal({
                                                title: "Advertencia",
                                                text: "La compra ya fue procesada para esta orden.",
                                                type: "warning",
                                                showCancelButton: false,
                                                confirmButtonColor: "#67BF11",
                                                confirmButtonText: "Aceptar",
                                                closeOnConfirm: true
                                            });
                                        } else {

                                            swal({
                                                    title: "Advertencia",
                                                    text: "¿Está seguro de procesar la compra?",
                                                    type: "warning",
                                                    showCancelButton: true,
                                                    confirmButtonColor: "#67BF11",
                                                    confirmButtonText: "Si",
                                                    cancelButtonText: "No",
                                                    closeOnConfirm: false,
                                                    closeOnCancel: true
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
                                                    }
                                                });

                                        }
                                    }, function (error) {
                                        alertFactory.error("Error al verificar la orden");
                                    });
                                }


                            } else {

                                if (UtilidadNeta > uitilidad) {
                                    //INSERTA UTILIDAD
                                    ordenServicioRepository.putAprobacionUtilidad(idTrabajo, $scope.userData.idUsuario).then(function (aprobacionUtilidad) {
                                        if (aprobacionUtilidad.data[0].id > 0) {
                                           //CORREO
                                             ordenServicioRepository.enviarNotificacionUtilidad(idTrabajo).then(function (mail) {

                                                if (mail.data[0].enviado == 1) {
                                                    //token
                                                    $('#insertarToken').appendTo("body").modal('show');
                                                }
                                            }, function (error) {
                                                alertFactory.error("Error al enviar mail");
                                            });
                                        }
                                    }, function (error) {
                                        alertFactory.error("Error al cargar la orden");
                                    });

                                } else {

                                    ordenServicioRepository.getOrdenServicio(numeroTrabajo).then(function (result) {

                                        if (result.data.length > 0) {
                                            swal({
                                                title: "Advertencia",
                                                text: "La compra ya fue procesada para esta orden.",
                                                type: "warning",
                                                showCancelButton: false,
                                                confirmButtonColor: "#67BF11",
                                                confirmButtonText: "Aceptar",
                                                closeOnConfirm: true
                                            });
                                        } else {

                                            $scope.procesarCompra();

                                        }
                                    }, function (error) {
                                        alertFactory.error("Error al verificar la orden");
                                    });

                                }
                            }

                        }, function (error) {
                            alertFactory.error("Error al cargar la orden");
                        });

                    });
               }
            }
        }, function (error) {
            alertFactory.error("Error en la consulta");
        });


    }

    $scope.procesarCompra = function (){
        swal({
            title: "Advertencia",
            text: "¿Está seguro de procesar la compra?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#67BF11",
            confirmButtonText: "Si",
            cancelButtonText: "No",
            closeOnConfirm: false,
            closeOnCancel: true
        },
        function (isConfirm) {
            if (isConfirm) {
                trabajoRepository.cotizacionespago($scope.idTrabajo).then(function (ordenVerificada) {
                   
                    if (ordenVerificada.data[0].idHistorialProceso == 1) {
                        swal("Proceso Realizado!");
                        //location.href = '/ordenesporcobrar';
                    }else{
                         swal("No se puede procesar la provisión porque algunas cotizaciones no tienen facturas.");
                        // alertFactory.error("No se puede procesar la provisión porque algunas cotizaciones no tienen facturas.");
                    }
                }, function (error) {
                    alertFactory.error("Error al verificar la orden");
                });
            }
        });

    }

     $scope.saveToken = function () {
        ordenServicioRepository.estatusToken($scope.token).then(function (estatus) {
      
            if (estatus.data.length > 0) {
                if (estatus.data[0].estatus == 1) {
                   // swal("Token disponible"); 
                   $('#insertarToken').modal('hide');
                    ordenServicioRepository.putAprobacionUtilidadRespuesta($scope.idAprobacionUtilidad,$scope.userData.idUsuario, $scope.token).then(function (aprobacionUtilidad) {
                    
                        if (aprobacionUtilidad.data[0].id > 0) {
                            
                             $scope.procesarCompra();
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


    $scope.cancelarOrden = function (idCita, numeroTrabajo) {
        swal({
                title: "Advertencia",
                text: "¿Está seguro en eliminar la orden: " + numeroTrabajo + " ?",
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
                    trabajoRepository.postEliminaOrden(idCita).then(function (ordenEliminada) {
                        if (ordenEliminada.data[0].id > 0) {
                            alertFactory.success('Orden eliminada correctamente');
                            setTimeout(function () {
                                location.href = "/administracionordenes";
                            }, 1500);
                        } else {
                            alertFactory.info('La orden no se pudo eliminar');
                        }
                    }, function (error) {
                        console.log('No se pudo eliminar la orden: ' + error);
                        alertFactory.error('La orden no se pudo eliminar');
                    });
                }
            });


    }
});