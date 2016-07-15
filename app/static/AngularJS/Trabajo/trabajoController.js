// -- =============================================
// -- Author:      Mario Mejía
// -- Create date: 23/03/2016
// -- Description: trabajo controller
// -- Modificó: Vladimir Juárez Juárez
// -- Fecha: 10/04/2016
// -- =============================================
registrationModule.controller('trabajoController', function ($scope, $rootScope, localStorageService, alertFactory, trabajoRepository, cotizacionRepository) {
    //this is the first method executed in the view
    $scope.init = function () {
       // obtieneNombreArchivo(idTrabajo);
        $scope.userData = localStorageService.get('userData');
        getTrabajo($scope.userData.idUsuario);
        getTrabajoTerminado($scope.userData.idUsuario);
        getTrabajoAprobado($scope.userData.idUsuario);
        $scope.habilitaBtnAprobar = true;

        $scope.certificadoParams = {
            noReporte: "",
            solpe: "",
            ordenSurtimiento: "",
            montoOS: "",
            pedidoAsociado: "",
            nombreEmisor: "", //$scope.userData.nombreCompleto,
            nombreProveedor: "",
            puestoProveedor: ""
        }
    }

    var obtieneNombreArchivo = function(idTrabajo){
       cotizacionRepository.obtieneNombreArchivo(idTrabajo).then(function(nombreArchivo){
            if(nombreArchivo.data != null){
                $scope.certificadoConformidad = nombreArchivo.data[0];  
                trabajoRepository.descargaCerficadoConformidadTrabajo(20, idTrabajo).then(function (certificadoDescargado) {
                    //if(certificadoGenerado.data[0].idHistorialProceso > 0){
                    alertFactory.success("Certificado de conformidad descargado");
                    getTrabajo($scope.userData.idUsuario);
                    getTrabajoTerminado($scope.userData.idUsuario);
                    getTrabajoAprobado($scope.userData.idUsuario);
                    //}
                }, function (error) {
                    alertFactory.error("Error al cambiar la orden a estatus Certificado descargado");
                })

                //window.open($rootScope.vIpServer+'/uploads/files/'+idTrabajo+'/certificadoConformidad/'+$scope.certificadoConformidad, '_blank');   
           }
        }, function (error) {
            alertFactory.error("Error al encontrar nombre de archivo");
       });

    }

    var getTrabajo = function (idUsuario) {
        trabajoRepository.getTrabajo(idUsuario).then(function (trabajo) {
            $('.dataTableTrabajo').DataTable().destroy();
            $scope.trabajos = trabajo.data;
            if (trabajo.data.length > 0) {
                waitDrawDocument("dataTableTrabajo");
                alertFactory.success("Trabajos cargados");
            } else {
                alertFactory.info("No se encontraron trabajos");
            }
        }, function (error) {
            alertFactory.error("Error al cargar trabajos");
        });
    }

    //obtiene los trabajos terminados
    var getTrabajoTerminado = function (idUsuario) {
        $('.dataTableTrabajoTerminado').DataTable().destroy();
        trabajoRepository.getTrabajoTerminado(idUsuario).then(function (trabajoTerminado) {
            $scope.trabajosTerminados = trabajoTerminado.data;

            if (trabajoTerminado.data.length > 0) {
                waitDrawDocument("dataTableTrabajoTerminado");
                alertFactory.success("Trabajos terminados cargados");
            } else {
                alertFactory.info("No se encontraron trabajos terminados");
            }
        }, function (error) {
            alertFactory.error("Error al cargar trabajos terminados");
        });
    }

    //obtiene los trabajos aprobados
    var getTrabajoAprobado = function (idUsuario) {
        $('.dataTableTrabajoAprobado').DataTable().destroy();
        trabajoRepository.getTrabajoAprobado(idUsuario).then(function (trabajoAprobado) {
            $scope.trabajosAprobados = trabajoAprobado.data;

            if (trabajoAprobado.data.length > 0) {
                waitDrawDocument("dataTableTrabajoAprobado");
                alertFactory.success("Trabajos aprobados cargados");
            } else {
                alertFactory.info("No se encontraron trabajos aprobados");
            }
        }, function (error) {
            alertFactory.error("Error al cargar trabajos aprobados");
        });
    }

    $scope.aprobarTrabajo = function (trabajo, valBotonera) {
        var objBotonera = {};
        objBotonera.accion = valBotonera;
        objBotonera.idCita = trabajo.idCita;
        localStorageService.set('objTrabajo', trabajo);
        localStorageService.set("botonera", objBotonera);
        location.href = '/ordenservicio';
    }

    //espera que el documento se pinte para llenar el dataTable
    var waitDrawDocument = function (dataTable) {
        setTimeout(function () {
            $('.' + dataTable).DataTable({
                dom: '<"html5buttons"B>lTfgitp',
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
        }, 2500);
    }

    //actualiza el trabajo a estatus terminado
    $scope.updTerminaTrabajo = function (observacion) {
        trabajoRepository.terminaTrabajo(7, $scope.idTrabajo, observacion).then(function (trabajoTerminado) {
            if (trabajoTerminado.data[0].idHistorialProceso != 0) {
                getTrabajo($scope.userData.idUsuario);
                getTrabajoTerminado($scope.userData.idUsuario);
                $('#finalizarTrabajoModal').modal('hide');
            }
        });
    }

    //abre el modal para la finalización del trabajo
    $scope.openFinishingTrabajoModal = function (idTrabajo) {
        $('#finalizarTrabajoModal').appendTo("body").modal('show');
        $scope.idTrabajo = idTrabajo;
    }

    //confirm del trabajo para su terminación
    $('.btnTerminarTrabajo').click(function () {
        swal({
                title: "¿Está seguro de terminar el trabajo?",
                text: "Se cambiará el estatus del trabajo a TERMINADO",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Si",
                cancelButtonText: "No",
                closeOnConfirm: false,
                closeOnCancel: false
            },
            function (isConfirm) {
                if (isConfirm) {
                    $scope.updTerminaTrabajo($scope.observacionTrabajo);
                    swal("Trabajo terminado!", "El trabajo se ha terminado", "success");
                    $scope.observacionTrabajo = null;
                } else {
                    swal("Cancelado", "", "error");
                    $('#finalizarTrabajoModal').modal('hide');
                    $scope.observacionTrabajo = null;
                }
            });
    });

    //muestra el modal para la carga de archivos
    $scope.adjuntar = function (idTrabajo, hojaCalidad) {
        $scope.idTrabajo = idTrabajo;
        $scope.hojaCalidad = hojaCalidad;
        $('#factura').appendTo('body').modal('show');
    }

    //realiza la carga de archivos especiales de la orden
    $scope.cargaArchivosEspeciales = function () {
        cargarArchivos();
        archivoTrabajo($scope.idTrabajo, $scope.hojaCalidad);
    }

    //Se realiza la carga de archivos de factura
    var cargarArchivos = function () {
        //Se obtienen los datos de los archivos a subir
        $scope.userData = localStorageService.get('userData');
        formArchivos = document.getElementById("uploader");
        contentForm = (formArchivos.contentWindow || formArchivos.contentDocument);
        if (contentForm.document)
            btnSubmit = contentForm.document.getElementById("submit2");
        elements = contentForm.document.getElementById("uploadForm").elements;
        idTrabajoEdit = contentForm.document.getElementById("idTrabajo");
        idTipoEvidencia = contentForm.document.getElementById("idTipoEvidencia");
        idUsuario = contentForm.document.getElementById("idUsuario");
        vTrabajo = contentForm.document.getElementById("vTrabajo");
        idCategoria = contentForm.document.getElementById("idCategoria");
        idNombreEspecial = contentForm.document.getElementById("idNombreEspecial");
        idTrabajoEdit.value = $scope.idTrabajo;
        vTrabajo.value = "1";
        idTipoEvidencia.value = 1;
        idCategoria.value = 2;
        if ($scope.hojaCalidad == 2) {
            idNombreEspecial.value = 2;
        } else if ($scope.hojaCalidad == 3) {
            idNombreEspecial.value = 3;
        } else if ($scope.hojaCalidad == 5) {
            idNombreEspecial.value = 5;
        }
        else if ($scope.hojaCalidad == 6) {
            idNombreEspecial.value = 6;
        }
        idUsuario.value = $scope.userData.idUsuario;
        //Submit del botón del Form para subir los archivos        
        btnSubmit.click();
    }

    //cambia el trabajo a estatus a facturado
    var archivoTrabajo = function (idTrabajo, hojaCalidad) {
        if (hojaCalidad == 2) {
            trabajoRepository.transfResponsabilidadTrabajo(14, idTrabajo).then(function (hojaCalidad) {
                if (hojaCalidad.data[0].idHistorialProceso) {
                    alertFactory.success("Hoja de calidad cargada");
                    getTrabajo($scope.userData.idUsuario);
                    getTrabajoTerminado($scope.userData.idUsuario);
                }
            }, function (error) {
                alertFactory.error("Error al cargar la hoja de calidad");
            });
        } else if (hojaCalidad == 3) {
            trabajoRepository.facturaTrabajo(12, idTrabajo).then(function (trabajoFacturado) {
                if (trabajoFacturado.data[0].idHistorialProceso) {
                    alertFactory.success("Factura cargada");
                    getTrabajo($scope.userData.idUsuario);
                    getTrabajoTerminado($scope.userData.idUsuario);
                    getTrabajoAprobado($scope.userData.idUsuario);
                }
            }, function (error) {
                alertFactory.error("Error al cargar la factura");
            });
        } else if (hojaCalidad == 5) {
            trabajoRepository.uploadCertificadoCallCenterTrabajo(19, idTrabajo).then(function (certificadoTrabajo) {
                //if (trabajoFacturado.data[0].idHistorialProceso) {
                alertFactory.success("Certificado de conformidad cargada");
                getTrabajo($scope.userData.idUsuario);
                getTrabajoTerminado($scope.userData.idUsuario);
                //}
            }, function (error) {
                alertFactory.error("Error al cargar el certificado de conformidad");
            });
        } else if (hojaCalidad == 6) {
            trabajoRepository.uploadCertificadoClienteTrabajo(11, idTrabajo).then(function (certificadoTrabajo) {
                //if (trabajoFacturado.data[0].idHistorialProceso) {
                alertFactory.success("Certificado de conformidad cargada");
                getTrabajo($scope.userData.idUsuario);
                getTrabajoTerminado($scope.userData.idUsuario);
                getTrabajoAprobado($scope.userData.idUsuario);
                //}
            }, function (error) {
                alertFactory.error("Error al cargar el certificado de conformidad");
            });
        }
    }

    //genera el formato para el certificado de conformidad
    $scope.generaCertificadoConformidadPDF = function () {
        if ($scope.certificadoParams.noReporte != '' && $scope.certificadoParams.solpe != '' && $scope.certificadoParams.ordenSurtimiento != '' && $scope.certificadoParams.montoOS != '' && $scope.certificadoParams.pedidoAsociado != '' &&
            $scope.certificadoParams.nombreProveedor != '' && $scope.certificadoParams.puestoProveedor != '') {

            trabajoRepository.generaCerficadoConformidadTrabajo(17, $scope.idTrabajo).then(function (certificadoGenerado) {
                //if(certificadoGenerado.data[0].idHistorialProceso > 0){
                alertFactory.success("Certificado de conformidad generado");
                getTrabajo($scope.userData.idUsuario);
                getTrabajoTerminado($scope.userData.idUsuario);
                getTrabajoAprobado($scope.userData.idUsuario);
                //}
            }, function (error) {
                alertFactory.error("Error al cambiar la orden a estatus Certificado generado");
            })

            setTimeout(function () {
                window.open($rootScope.vIpServer + 
                    "/api/reporte/conformidadpdf/?noReporte=" + $scope.certificadoParams.noReporte +
                    "&solpe=" + $scope.certificadoParams.solpe +
                    "&ordenSurtimiento=" + $scope.certificadoParams.ordenSurtimiento +
                    "&montoOS=" + $scope.certificadoParams.montoOS +
                    "&pedidoAsociado=" + $scope.certificadoParams.pedidoAsociado +
                    "&nombreEmisor=" + $scope.certificadoParams.nombreEmisor +
                    "&nombreProveedor=" + $scope.certificadoParams.nombreProveedor +
                    "&puestoProveedor=" + $scope.certificadoParams.puestoProveedor +
                    "&fecha=" + new Date() +
                    "&idTrabajo=" + $scope.idTrabajo);

                $scope.certificadoParams = {
                    noReporte: "",
                    solpe: "",
                    ordenSurtimiento: "",
                    montoOS: "",
                    pedidoAsociado: "",
                    nombreEmisor: "", //$scope.userData.nombreCompleto,
                    nombreProveedor: "",
                    puestoProveedor: ""
                }
                $('#datosEntradaCertificadoModal').appendTo("body").modal('hide');
            }, 1000);
        } else {
            alertFactory.info("Llenar los campos vacíos");
        }
    }

    //realiza el cambio de estatus de la orden a certificado de conformidad descargada
    $scope.descargaCertificadoConformidadPDF = function (idTrabajo) {
        obtieneNombreArchivo(idTrabajo);
    }

    //abre la modal para los datos de entrada del certificado de conformidad
    $scope.datosEntradaCertificadoModal = function (idTrabajo) {
        $scope.idTrabajo = idTrabajo;
        $('#datosEntradaCertificadoModal').appendTo("body").modal('show');
    }

        $scope.ordenGarantia = function (idEstatus, idTrabajo) {
          trabajoRepository.ordenServicioGarantia(idEstatus, idTrabajo).then(function (orden) {
          $scope.ordens = orden.data;
              alertFactory.success("Se rachazo el trabajo");
             location.href = '/trabajo';
            }, function (error) {
                alertFactory.error("Error al rechzar el trabajo");
            });
    }

$scope.openOrdenTrabajoModal = function (idEstatus, idTrabajo) {  
  $scope.idEstatus = idEstatus;  
  $scope.idTrabajo = idTrabajo;    

 $('.btnTerminarTrabajo2').ready(function () {
        swal({
                title: "¿Esta seguro que desea rechazar el trabajo?",
                text: "Se cambiará el estatus a 'Orden de Servicio en Garantia'",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#65BD10",
                confirmButtonText: "Si",
                cancelButtonText: "No",
                closeOnConfirm: false,
                closeOnCancel: false
            },
            function (isConfirm) {
                if (isConfirm) {
                    $scope.ordenGarantia($scope.idEstatus, $scope.idTrabajo);
                    swal("Trabajo Rechazado!", "El trabajo se ha rechzado", "success");
                } else {
                    swal("Rechazo Cancelado", "", "error");
                }
            });
        });        
     }

});

