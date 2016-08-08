// -- =============================================
// -- Author:      Uriel Godínez Martínez
// -- Create date: 23/03/2016
// -- Description: Citas controller
// -- Modificó: V. Vladimir Juárez Juárez
// -- Fecha: 30/03/2016
// -- Modificó: Carlos Adolfo Martinez Diosdado
// -- Fecha: 08/07/2016
// -- =============================================

registrationModule.controller('citaController', function ($scope, $route, $rootScope, localStorageService, alertFactory, citaRepository, cotizacionRepository, trabajoRepository) {
    var idTrabajoNew = '';
    $scope.message = 'Buscando...';
    $scope.userData = localStorageService.get('userData');
    var itemsAutorizacionRechazo = [];
    $scope.listaPiezas = [];
    $scope.talleres = [];


    $scope.init = function () {
        getCliente();
    }

    //init de la pantalla citaTrabajo
    $scope.initCita = function () {
        var userData = localStorageService.get('userData');
        $scope.unidadInfo = localStorageService.get('unidad');
        getCita($scope.unidadInfo.idUnidad, userData.idUsuario);
    }

    //init de la pantalla  nuevaCita
    $scope.initNuevaCita = function () {
        $scope.edita = localStorageService.get('ModoEdicion');
        localStorageService.remove('ModoEdicion');

        $scope.datosCita = {
            razonSocial: "",
            direccion: "",
            idTaller: "",
            tipoCita: undefined,
            fechaCita: "",
            horaCita: "",
            trabajoCita: "",
            observacionCita: "",
            idEstadoAutotanque: "",
            idTrasladoUnidad:""
        }
        if (localStorageService.get('citaEdicion') != undefined) {
            var idCita = localStorageService.get('citaEdicion')
            getidCita(idCita);
            localStorageService.remove('citaEdicion');
            busquedaServicioDetalle(idCita);
        }
        getTipoCita();
        getEstadoAutotanque();
        getTrasladoUnidad();
        $scope.idTipoCita = 1;
        $scope.userData = localStorageService.get('userData');

        $('.clockpicker').clockpicker();
        // When the window has finished loading google map
        google.maps.event.addDomListener(window, 'load', init);

        function init() {
            // Options for Google map
            // More info see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
            var mapOptions1 = {
                zoom: 11,
                center: new google.maps.LatLng(19.3329031, -99.2031112),
                // Style for Google Maps
                styles: [{
                    "featureType": "water",
                    "stylers": [{
                        "saturation": 43
                    }, {
                        "lightness": -11
                    }, {
                        "hue": "#0088ff"
                    }]
                }, {
                    "featureType": "road",
                    "elementType": "geometry.fill",
                    "stylers": [{
                        "hue": "#ff0000"
                    }, {
                        "saturation": -100
                    }, {
                        "lightness": 99
                    }]
                }, {
                    "featureType": "road",
                    "elementType": "geometry.stroke",
                    "stylers": [{
                        "color": "#808080"
                    }, {
                        "lightness": 54
                    }]
                }, {
                    "featureType": "landscape.man_made",
                    "elementType": "geometry.fill",
                    "stylers": [{
                        "color": "#ece2d9"
                    }]
                }, {
                    "featureType": "poi.park",
                    "elementType": "geometry.fill",
                    "stylers": [{
                        "color": "#ccdca1"
                    }]
                }, {
                    "featureType": "road",
                    "elementType": "labels.text.fill",
                    "stylers": [{
                        "color": "#767676"
                    }]
                }, {
                    "featureType": "road",
                    "elementType": "labels.text.stroke",
                    "stylers": [{
                        "color": "#ffffff"
                    }]
                }, {
                    "featureType": "poi",
                    "stylers": [{
                        "visibility": "off"
                    }]
                }, {
                    "featureType": "landscape.natural",
                    "elementType": "geometry.fill",
                    "stylers": [{
                        "visibility": "on"
                    }, {
                        "color": "#b8cb93"
                    }]
                }, {
                    "featureType": "poi.park",
                    "stylers": [{
                        "visibility": "on"
                    }]
                }, {
                    "featureType": "poi.sports_complex",
                    "stylers": [{
                        "visibility": "on"
                    }]
                }, {
                    "featureType": "poi.medical",
                    "stylers": [{
                        "visibility": "on"
                    }]
                }, {
                    "featureType": "poi.business",
                    "stylers": [{
                        "visibility": "simplified"
                    }]
                }]
            };

            // Get all html elements for map
            var mapElement1 = document.getElementById('map1');
            // Create the Google Map using elements
            var map1 = new google.maps.Map(mapElement1, mapOptions1);
        }
        $scope.userData.idTipoUsuario == 4 ? $scope.selectedTaller = false : $scope.selectedTaller = true;
        $scope.datosCita = {};
        $scope.unidadInfo = localStorageService.get('unidad');
        $scope.labelItems = 0;
    }

    //init de la pantalla tallerCita
    $scope.initTallerCita = function () {
        $('#calendar .input-group.date').datepicker({
            todayBtn: "linked",
            keyboardNavigation: true,
            forceParse: false,
            calendarWeeks: true,
            autoclose: true,
            todayHighlight: true
        });
        if ($route.current.params.confCita != undefined) {
            var idConfCita = Number($route.current.params.confCita);
            var fecha = $route.current.params.fecha;
            if (idConfCita != 0) {
                citaRepository.validaConfirmacionCita(idConfCita).then(function (exists) {
                    if (exists.data[0].existe == 1) {
                        alertFactory.info("La cita ya ha sido confirmada");
                        getCitaTaller(fecha, idConfCita);
                    } else {
                        alertFactory.success("Cita confirmada");
                        getCitaTaller(fecha, idConfCita);
                    }
                });
            }
        } else {
            var date = new Date();
            $scope.fecha = ('0' + date.getDate()).slice(-2) + '/' + ('0' + (date.getMonth() + 1)).slice(-2) + '/' + date.getFullYear();
            $scope.busquedaCita($scope.fecha);
        }
    }

    //obtiene la unidad mediante el dato buscado
    var getUnidad = function (selectedCliente, datoUnidad) {
        $('#btnBuscar').button('Buscando...');
        $scope.promise = citaRepository.getUnidadInformation(selectedCliente, datoUnidad, $scope.userData.idUsuario).then(function (unidadInfo) {
            $('.dataTableUnidad').DataTable().destroy();
            $scope.unidades = unidadInfo.data;
            if (unidadInfo.data.length > 0) {
                waitDrawDocument("dataTableUnidad");
                alertFactory.success('Datos encontrados');
                $('#btnBuscar').button('reset');
            } else {
                alertFactory.info('No se encontraron datos');
                $('#btnBuscar').button('reset');
            }
        }, function (error) {
            alertFactory.error('Error al obtener los datos');
            $('#btnBuscar').button('reset');
        });
    }

    //obtiene las citas de la unidad
    var getCita = function (idUnidad, idUsuario) {
        $('.dataTableCita').DataTable().destroy();
        $scope.promise = citaRepository.getCita(idUnidad, idUsuario).then(function (cita) {
            $scope.citas = cita.data;
            if (cita.data.length > 0) {
                waitDrawDocument("dataTableCita");
                alertFactory.success('Datos encontrados');
            } else {
                alertFactory.info('No se encontraron datos');
            }
        }, function (error) {
            alertFactory.error('Error al obtener datos');
        });
    }

    //regresa a la pantalla de cita
    $scope.backToCita = function () {
        location.href = '/cita';
    }

    //Obtiene información de la unidad
    $scope.lookUpUnidad = function (selectedCliente, datoUnidad) {
        if (selectedCliente != '' && selectedCliente != undefined && datoUnidad !== '' && datoUnidad !== undefined) {
            getUnidad(selectedCliente, datoUnidad);
        } else {
            alertFactory.info('Todos los campos son obligatorios');
        }
    }

    //obtiene las citas y servicios de la unidad
    $scope.lookUpCita = function (unidad) {
        location.href = '/citatrabajo';
        localStorageService.set('unidad', unidad);
    }

    //Búsqueda de citas
    $scope.busquedaCita = function (fecha) {
        var fechaCita = '';
        var dateHoy = new Date();
        var fechaHoy = ('0' + dateHoy.getDate()).slice(-2) + '/' + ('0' + (dateHoy.getMonth() + 1)).slice(-2) + '/' + dateHoy.getFullYear();
        var date = fecha.toString();
        var dia = date.substring(0, 2);
        var mes = date.substring(3, 5);
        var anio = date.substring(6, date.length);
        if (fechaHoy == date) {
            fechaCita = anio + '' + mes + '' + dia;
        } else {
            fechaCita = anio + '' + dia + '' + mes;
        }
        getCitaTaller(fechaCita, 0, $scope.userData.idUsuario);
    }

    //Se obtienen las citas de la fecha seleccionada
    var getCitaTaller = function (fecha, idCita, idUsuario) {
        $('.dataTableCitaTaller').DataTable().destroy();
        $scope.promise = citaRepository.getCitaTaller(fecha, idCita, idUsuario).then(function (cita) {
            if (cita.data.length > 0) {
                $scope.listaCitas = cita.data;
                waitDrawDocument("dataTableCitaTaller");
                alertFactory.success('Datos de citas cargados.');
            } else {
                $scope.listaCitas = '';
                alertFactory.info('No hay citas en la fecha seleccionada.');
            }
        }, function (error) {
            alertFactory.error("Error al obtener citas");
        });
    }


    //obtiene los talleres con su especialidad
    $scope.lookUpTaller = function (datoTaller) {
        if (datoTaller !== '' && datoTaller !== undefined) {
            $('.dataTableTaller').DataTable().destroy();
            $scope.promise = citaRepository.getTaller(datoTaller).then(function (taller) {
                $scope.talleres = taller.data;
                //  $scope.arrayCambios = $scope.talleres.slice();
                if (taller.data.length > 0) {
                    waitDrawDocument("dataTableTaller");
                    alertFactory.success('Datos encontrados');
                } else {
                    alertFactory.info('No se encontraron datos');
                }
            }, function (error) {
                alertFactory.error('Error al obtener los datos');
            });
        } else {
            alertFactory.info('Llene el campo de búsqueda');
        }
        inicializaListas();
    }

    //inserta una nueva cita
    $scope.addCita = function () {

        if ($scope.datosCita.fechaCita !== undefined && $scope.datosCita.horaCita !== undefined && $scope.datosCita.trabajoCita !== undefined && $scope.labelItems > 0 && $scope.datosCita.tipoCita != undefined && $scope.datosCita.idEstadoAutotanque != undefined) {

            if ($scope.userData.idTipoUsuario != 4 && $scope.datosCita.idTaller == undefined) {
                alertFactory.info("Seleccione un Taller");
            } else {
                $scope.datosCita.pieza = "";
                if (localStorageService.get('stgListaPiezas', $scope.listaPiezas) != undefined) {
                    $scope.datosCita.pieza = localStorageService.get('stgListaPiezas', $scope.listaPiezas).slice(0);
                }
                var citaTaller = {};
                citaTaller.idCita = 0;
                citaTaller.idUnidad = localStorageService.get('unidad').idUnidad;
                $scope.userData.idTipoUsuario == 4 ? citaTaller.idTaller = 0 :
                    citaTaller.idTaller = $scope.datosCita.idTaller;
                //citaTaller.idTaller = $scope.datosCita.idTaller;
                citaTaller.fecha = $scope.datosCita.fechaCita + ' ' + $scope.datosCita.horaCita;
                citaTaller.trabajo = $scope.datosCita.trabajoCita;
                citaTaller.observacion = $scope.datosCita.observacionCita;
                citaTaller.idUsuario = $scope.userData.idUsuario;
                citaTaller.idTipoCita = $scope.datosCita.tipoCita;
                citaTaller.idEstadoAutotanque = $scope.datosCita.idEstadoAutotanque;

                citaRepository.addCita(citaTaller).then(function (cita) {
                    citaTaller.idCita = cita.data[0].idCita;
                    if (citaTaller.idCita > 0) {
                        alertFactory.success("Se agendó correctamente");
                        $scope.clearInputs();
                        if ($scope.datosCita.pieza != "") {
                            $scope.datosCita.pieza.forEach(function (pieza, i) {
                                var item = {};
                                item.idCita = citaTaller.idCita;
                                item.idTipoElemento = pieza.idTipoElemento;
                                item.idElemento = pieza.idItem;
                                item.cantidad = pieza.cantidad;
                                citaRepository.addCitaServicioDetalle(item).then(function (piezaInserted) {
                                    if (piezaInserted.data.length > 0) {
                                        alertFactory.success("Se insertó correctamente");
                                    }
                                    if (($scope.datosCita.pieza.length - i) == 1) {
                                        citaRepository.enviarMailConfirmacion(citaTaller.idCita, $scope.userData.idTipoUsuario).then(function (enviado) {
                                            if (enviado.data.length > 0) {
                                                alertFactory.success("e-mail enviado");
                                                localStorageService.set('objCita', citaTaller);
                                                setTimeout(function(){
                                                    location.href = '/tallercita';
                                                },1000);                                                
                                                //localStorageService.remove('stgListaPiezas');
                                            } else {
                                                alertFactory.info("No se envío el e-mail");
                                            }
                                        }, function (error) {
                                            alertFactory.error("Error al enviar el e-mail")
                                        });
                                    }
                                }, function (error) {
                                    alertFactory.error("Error al insertar servicios");
                                });
                            });
                        }
                    }
                }, function (error) {
                    alertFactory.error("Error al insertar la cita");
                });
            }
        } else if ($scope.datosCita.fechaCita !== undefined && $scope.datosCita.horaCita !== undefined && $scope.datosCita.trabajoCita !== undefined && $scope.labelItems <= 0 && $scope.datosCita.tipoCita != undefined && $scope.datosCita.idEstadoAutotanque != undefined) {
            alertFactory.info("Llene la Pre-Orden");
        } else {
            alertFactory.info("Llene todos los campos");
        }
    }

    //combina la fecha y hora en una cadena
    var combineDateAndTime = function (date, time) {
        timeString = time.getHours() + ':' + time.getMinutes() + ':00';

        var year = date.getFullYear();
        var month = date.getMonth() + 1; // Jan is 0, dec is 11
        var day = date.getDate();
        var dateString = '' + year + '-' + month + '-' + day;
        var combined = dateString + ' ' + timeString;

        return combined;
    };

    //limpia los inputs del modal Cita
    $scope.clearInputs = function () {
        $scope.talleres = [];
        $scope.datoTaller = undefined;
        $scope.fechaCita = undefined;
        $scope.horaCita = undefined;
        $scope.trabajoCita = undefined;
    }

    //obtiene el taller seleccionado
    $scope.getTaller = function (idTaller) {
        //$scope.listaPiezas = [];
        //$scope.piezas = [];
        //$scope.datosCita.pieza = "";
        $scope.selectedTaller = false;
        $scope.datosCita.idTaller = idTaller;
        //$scope.labelItems = 0;
    }

    //Redirige a pagina para nueva cotización
    $scope.nuevaCotizacion = function (cita) {
        if (localStorageService.get('objEditCotizacion') != null) {
            localStorageService.remove('objEditCotizacion');
        }
        if (localStorageService.get('orden') != null) {
            localStorageService.remove('orden');
        }
        localStorageService.set('cita', cita);
        location.href = '/cotizacionnueva';
    }

    //despliega el div de las tablas
    $scope.slideDown = function () {
        $("#borderTop").slideDown(2000);
    }

    //contrae el div de las tablas
    $scope.slideUp = function () {
        $("#borderTop").slideUp(3000);
    }

    //va a la pantalla de nueva cita
    $scope.goNewCita = function () {
        localStorageService.remove('cita');
        location.href = 'nuevacita';
    }

    //visualiza la modal de servicioCita

    $scope.showCitaServicioModal = function () {
        if (localStorageService.get('cita') != null) {
            $scope.citaDatos = localStorageService.get('cita');
            $scope.estado = 1;
            $scope.editar = 0;
            datosCitaBien();
            $scope.idTaller = $scope.citaDatos.idTaller == 0 ? $scope.datosCita.idTaller : $scope.citaDatos.idTaller;
            //busquedaServicioDetalle($scope.citaDatos.idCita);
        }
        $scope.piezas = [];
        $('.dataTablePiezaTaller').DataTable().destroy();
        $('#citaServicioModal').appendTo("body").modal('show');
    }

    //init de servicio controller
    $scope.initCitaServicio = function () {
        $scope.listaPiezas = [];
    }

    //obtiene servicios/items
    $scope.getPieza = function (nombrePieza) {
        if (nombrePieza !== '' && nombrePieza !== undefined) {
            $('#btnBuscarPieza').button('Buscando...');
            $('.dataTablePiezaTaller').DataTable().destroy();
            $scope.promise = cotizacionRepository.buscarPieza($scope.datosCita.idTaller, nombrePieza).then(function (pieza) {
                $scope.piezas = pieza.data;
                if (pieza.data.length > 0) {
                    waitDrawDocument("dataTablePiezaTaller");
                    alertFactory.success("Datos obtenidos");
                } else {
                    $scope.piezas = [];
                    alertFactory.info("No se encontraron piezas");
                }
            }, function (error) {
                alertFactory.error("Error al obtener piezas");
                $('#btnBuscarPieza').button('reset');
            });
        } else {
            $scope.piezas = [];
            alertFactory.info("Introduzca datos para buscar")
        }
        $('#btnBuscarPieza').button('reset');
    }

    //añade una pieza en la lista
    $scope.addPieza = function (pieza) {
        if ($scope.listaPiezas.length > 0) { //idItem
            if (validaItemExists($scope.listaPiezas, pieza.idItem) == false) {
                if($scope.edita == 1){
                    pieza.accion = 1;
                }
                pieza.cantidad = 1;
                $scope.listaPiezas.push(pieza);
                $scope.labelItems = $scope.listaPiezas.length;
            }
        } else {
            if($scope.edita == 1){
                pieza.accion = 1;
            }
            pieza.cantidad = 1;
            $scope.listaPiezas.push(pieza);
            $scope.labelItems = $scope.listaPiezas.length;
        }
    }

    //valida si ya existe la pieza y aumenta la cantidad
    var validaItemExists = function (piezas, idItem) {
        var exists = false;
        piezas.forEach(function (p, i) {
            if (p.idItem == idItem) {
                $scope.listaPiezas[i].cantidad = p.cantidad + 1;
                exists = true;
            }
        });
        return exists;
    }

    //quita piezas de la lista
    $scope.removePieza = function (idItem) {
        $scope.listaPiezas.forEach(function (p, i) {
            if (p.idItem == idItem) {
                if (p.cantidad > 1) {
                    $scope.listaPiezas[i].cantidad = p.cantidad - 1;
                } else {
                    $scope.listaPiezas.splice(i, 1);
                    $scope.labelItems = $scope.listaPiezas.length;
                }
            }
        })
    }

    //regresar a nueva cita
    $scope.generarCitaServicio = function (pieza) {
        if(pieza != undefined){
            if ($scope.listaPiezas.length > 0) { //idItem
                if (validaItemExists($scope.listaPiezas, pieza.idItem) == false) {
                    pieza.cantidad = 1;
                    $scope.labelItems = $scope.listaPiezas.length;
                }
            } else {
                pieza.cantidad = 1;
                $scope.listaPiezas.push(pieza);
                $scope.labelItems = $scope.listaPiezas.length;
            }
        }
        
        localStorageService.set('stgListaPiezas', $scope.listaPiezas);
        localStorageService.remove('cita');
        $('#citaServicioModal').modal('hide');
    }

    //inicializa valores
    var inicializaListas = function () {
        $scope.talleres = [];
        //$scope.listaPiezas = [];
        $scope.piezas = [];
        $scope.datosCita.idTaller = undefined;
    }

    //ir a cotización trabajo
    $scope.goToCotizacionTrabajo = function (cita) {
        //obtiene los tabajos de la cita
        $scope.promise = citaRepository.getTrabajo(cita.idCita).then(function (trabajo) {
            if (trabajo.data.length > 0) {
                var objBotonera = {};
                objBotonera.accion = 0;
                objBotonera.idCita = cita.idCita;
                localStorageService.set("objTrabajo", trabajo.data);
                localStorageService.set("botonera", objBotonera);
                location.href = '/ordenservicio'
            } else {
                alertFactory.info('Aún no existe un trabajo');
            }

        }, function (error) {
            alertFactory.error("Error al obtener datos del trabajo");
        })
    }

    //fecha
    $('#fechaTrabajo .input-group.date').datepicker({
        todayBtn: "linked",
        keyboardNavigation: true,
        forceParse: false,
        calendarWeeks: true,
        autoclose: true,
        todayHighlight: true
    });

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

    //muestra el modal para la linea de tiempo
    $scope.showLineTime = function (idCita) {
        $('#lineaTiempoModal').appendTo("body").modal('show');
        getTimeLine(idCita);
    }

    //timeLine
    var getTimeLine = function (idCita) {
        trabajoRepository.getTimeLine(idCita).then(function (timeLine) {
            $scope.timeLine = timeLine.data;
        }, function (error) {
            alertFactory.error("Error al obtener timeLine");
        })
    }

    //obtiene los clientes
    var getCliente = function () {
        citaRepository.getCliente($scope.userData.idUsuario).then(function (cliente) {
            if (cliente.data.length > 0) {
                $scope.clientes = cliente.data;
                alertFactory.success("Clientes cargados");
            } else {
                alertFactory.info("No se encontraron clientes");
            }
        }, function (error) {
            alertFactory.error("Error al cargar clientes");
        });
    }

    //Modal Adjuntar Formato
    $scope.formatoRecepcion = function (cita) {
        $scope.idTrabajoUpl = cita.idTrabajo;
        $scope.idCitaUpld = cita.idCita;
        $scope.idUnidadUpl = cita.idUnidad;
        $('#evidencia').appendTo('body').modal('show');
    }

    //Se realiza la carga de archivos
    var cargarArchivos = function (idTrabajoNew, idDocEspecial) {
        //Se obtienen los datos de los archivos a subir
        $scope.userData = localStorageService.get('userData');
        formArchivos = document.getElementById("uploader");
        contentForm = (formArchivos.contentWindow || formArchivos.contentDocument);
        if (contentForm.document) {
            btnSubmit = contentForm.document.getElementById("submit2");
            elements = contentForm.document.getElementById("uploadForm").elements;
            idTrabajoEdit = contentForm.document.getElementById("idTrabajo");
            idTipoEvidencia = contentForm.document.getElementById("idTipoEvidencia");
            vTrabajo = contentForm.document.getElementById("vTrabajo");
            idUsuario = contentForm.document.getElementById("idUsuario");
            idCategoria = contentForm.document.getElementById("idCategoria");
            idNombreEspecial = contentForm.document.getElementById("idNombreEspecial");
            idTrabajoEdit.value = idTrabajoNew;
            idCategoria.value = 2;
            idNombreEspecial.value = idDocEspecial;
            idTipoEvidencia.value = 1;
            idUsuario.value = $scope.userData.idUsuario;
            vTrabajo.value = "1";
            //Submit del botón del Form para subir los archivos        
            btnSubmit.click();
        }
    }

    //Cargar comprobante de recepción
    $scope.recepcion = function () {
        trabajoRepository.insertTrabajo($scope.idCitaUpld, $scope.userData.idUsuario, $scope.idUnidadUpl)
            .then(function (trabajo) {
                idTrabajoNew = trabajo.data[0].idTrabajo;
                cargarArchivos(idTrabajoNew, 1);
                $scope.busquedaCita($scope.fecha);
            }, function (error) {
                alertFactory.error("Error al insertar el trabajo");
            });
    }

    //obtiene el tipo de cita
    var getTipoCita = function () {
        citaRepository.getTipoCita().then(function (citas) {
            if (citas.data.length > 0) {
                $scope.tiposCita = citas.data;
                alertFactory.success("Tipos de citas cargados");
            }
        }, function (error) {
            alertFactory.error("Error al obtener tipos de cita");
        });
    }

    //realiza la obtención de idCita para su edición
    $scope.editaCita = function (idCita, idUnidad, edita, cita) {
        localStorageService.set('IDUNIDAD', idUnidad);
        localStorageService.set('idCitaActualizar', idCita);
        localStorageService.set('ModoEdicion', edita);
        localStorageService.set('citaEdicion', idCita);
        localStorageService.set('cita', cita);
        location.href = "nuevacita"
    }

    //realiza la actualización de partidas de la cita
    $scope.updateCita = function () {
        if ($scope.datosCita.fechaCita !== undefined && $scope.datosCita.horaCita !== undefined && $scope.datosCita.trabajoCita !== undefined && $scope.labelItems > 0 && $scope.datosCita.tipoCita != undefined && $scope.datosCita.idEstadoAutotanque != undefined) {
            if ($scope.userData.idTipoUsuario != 4 && $scope.datosCita.idTaller == undefined) {
                alertFactory.info("Seleccione un Taller");
            } else {
                $scope.datosCita.pieza = "";
                compareList($scope.arrayOriginal, $scope.listaPiezas);
                joinListsItems();
                $scope.datosCita.pieza = JSON.parse(JSON.stringify($scope.listaPiezas));
                var citaTaller = {};
                citaTaller.idCita = localStorageService.get('idCitaActualizar');
                citaTaller.idUnidad = localStorageService.get('IDUNIDAD');
                citaTaller.idTaller = $scope.datosCita.idTaller;
                citaTaller.fecha = $scope.datosCita.fechaCita + ' ' + $scope.datosCita.horaCita;
                citaTaller.trabajo = $scope.datosCita.trabajoCita;
                citaTaller.observacion = $scope.datosCita.observacionCita;
                citaTaller.idUsuario = $scope.userData.idUsuario;
                citaTaller.idTipoCita = $scope.datosCita.tipoCita;
                citaTaller.idEstadoAutotanque = $scope.datosCita.idEstadoAutotanque;

                    citaRepository.updateCita(citaTaller).then(function (cita) {
                        citaTaller.idCita = $scope.idCitaToUpdate;
                        //citaTaller.idCita=localStorageService.get('idCitaActualizar');
                    if (citaTaller.idCita > 0) {
                        alertFactory.success("Se agendó correctamente");
                        $scope.clearInputs();
                        if ($scope.datosCita.pieza != "") {
                            $scope.datosCita.pieza.forEach(function (pieza, i) {
                                var item = {};
                                item.idCita = citaTaller.idCita;
                                item.idTipoElemento = pieza.idTipoElemento;
                                item.idElemento = pieza.idItem;
                                item.cantidad = pieza.cantidad;
                                item.accion= pieza.accion;
                                citaRepository.addCitaDetalle(item).then(function (piezaInserted) {
                                    if (piezaInserted.data.length > 0) {
                                        alertFactory.success("Se insertó correctamente");
                                    }
                                    if (($scope.datosCita.pieza.length - i) == 1) {
                                        citaRepository.enviarMailConfirmacion(citaTaller.idCita, $scope.userData.idTipoUsuario).then(function (enviado) {
                                            if (enviado.data.length > 0) {
                                                alertFactory.success("e-mail enviado");
                                                localStorageService.set('objCita', citaTaller);
                                                localStorageService.remove('stgListaPiezas');
                                                alertFactory.success("Cita actualizada correctamente");
                                                setTimeout(function(){
                                                    location.href = '/tallercita';
                                                },1000);                                                       
                                            } else {
                                                alertFactory.info("No se envío el e-mail");
                                            }
                                        }, function (error) {
                                            alertFactory.error("Error al enviar el e-mail")
                                        });
                                    }
                                }, function (error) {
                                    alertFactory.error("Error al insertar servicios");
                                });
                            });
                        }
                    }
                }, function (error) {
                    alertFactory.error("Error al insertar la cita");
                });
            }
        } else if ($scope.datosCita.fechaCita !== undefined && $scope.datosCita.horaCita !== undefined && $scope.datosCita.trabajoCita !== undefined && $scope.labelItems <= 0 && $scope.datosCita.tipoCita != undefined && $scope.datosCita.idEstadoAutotanque != undefined) {
            alertFactory.info("Llene la Pre-Orden");
        } else {
            alertFactory.info("Llene todos los campos");
        }
    }

    var getidCita = function (idCita) {
        citaRepository.getidCita(idCita).then(function (result) {
            if (result.data.length > 0) {
                var citaDato = result.data;
                $scope.idCitaToUpdate = citaDato[0].idCita;
                $scope.datosCita.razonSocial = citaDato[0].razonSocial;
                $scope.datosCita.direccion = citaDato[0].direccion;
                $scope.datosCita.idTaller = citaDato[0].tallerid;
                $scope.datosCita.idEstadoAutotanque = citaDato[0].idEstadoAutotanque;
                $scope.datosCita.tipoCita = citaDato[0].NumCita;
                $scope.datosCita.fechaCita = citaDato[0].fechaCita;
                $scope.datosCita.horaCita = citaDato[0].horaCita;
                $scope.datosCita.trabajoCita = citaDato[0].trabajo;
                $scope.datosCita.observacionCita = citaDato[0].observacion;
                localStorageService.set('citaTipo', $scope.datosCita.tipoCita);
                $scope.datosCita.tipoCita = parseInt(localStorageService.get('citaTipo'));
                localStorageService.remove('citaTipo');
                localStorageService.set('idtallerselected', $scope.datosCita.idTaller);
                $scope.datosCita.idTaller = localStorageService.get('idtallerselected');
                localStorageService.remove('idtallerselected');

                alertFactory.success("Datos encontado");
            } else {
                alertFactory.info("No se encontraron datos");
            }
        }, function (error) {
            alertFactory.error("Error al cargar datos");
        });
    }

    //cambia el estatus de la cita a cancelada
    $scope.dropCita = function (idCita) {
        citaRepository.dropCita(idCita).then(function (result) {
                $scope.algo = result.data;
            },
            function (error) {});
        $('#finalizarTrabajoModal').modal('hide');
        location.href = '/tallercita';
    }

    //Abre la modal para la cancelación de la cita
    $scope.openFinishingTrabajoModal = function (idCita) {
        //   $('#finalizarTrabajoModal').appendTo("body").modal('show');
        $scope.idCita = idCita;

        $('.btnTerminarTrabajo').ready(function () {
            swal({
                    title: "¿Esta seguro que desea cancelar la cita?",
                    text: "Se cambiará el estatus a 'Cita Cancelada'",
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
                        $scope.dropCita($scope.idCita);
                        swal("Trabajo terminado!", "La cita se ha cancelado", "success");
                    } else {
                        swal("No cancelado", "", "error");
                        $('#finalizarTrabajoModal').modal('hide');
                    }
                });
        });
    }

    //
    var datosCitaBien = function () {
        if (localStorageService.get('cita') != null) {
            $scope.numEconomico = $scope.citaDatos.numEconomico;
            $scope.modeloMarca = $scope.citaDatos.modeloMarca;
            $scope.trabajo = $scope.citaDatos.trabajo;
        }
    }
    
    //obtiene la preorden
    var busquedaServicioDetalle = function (idCita) {
        citaRepository.busquedaServicioDetalle(idCita)
            .then(function (result) {
                $scope.listaPiezas = result.data;
                $scope.arrayOriginal = JSON.parse(JSON.stringify($scope.listaPiezas));
                $scope.labelItems = $scope.arrayOriginal.length;
            }, function (error) {
                alertFactory.error('Error');
            });
    }
    
    //lista de items eliminados
    $scope.arrayDeletes = [];
    var compareList = function(arrayOriginal, arrayChanged){
        //items existentes en ambos arrays
        arrayOriginal.forEach(function(itemOriginal, i){
            
            if(!(existsItem(arrayChanged, itemOriginal))){
                $scope.arrayOriginal[i].accion = 3;
                $scope.arrayDeletes.push(itemOriginal);
            }
        });
    }
    
    //realiza la unión de items en un solo array
    var joinListsItems = function(){
        if($scope.arrayDeletes.length > 0){
            $scope.arrayDeletes.forEach(function(item){
                $scope.listaPiezas.push(item);
            });
        }
    }
    
    //valida si ya existe el item en lalista
    var existsItem = function (piezas, item) {
       var exists = false;
       piezas.forEach(function (p, i) {
           if (p.idItem === item.idItem) {
               if (p.cantidad !== item.cantidad) {
                   $scope.listaPiezas[i].accion = 2;
               }
               exists = true;
           }
       });
       return exists;
   }
    
    //Devuelve los estados de un autotanque
    var getEstadoAutotanque = function () {
        citaRepository.getEstadoAutotanque().then(function (result) {
            if (result.data.length > 0) {
                $scope.estadosAutotanque = result.data;
            } else {
                alertFactory.info('No se pudieron obtener los estados de un autotanque.');
            }
        }, function (error) {
            alertFactory.error('No se pudieron obtener los estados de un autotanque.');
        });
    };
    //Devuelve los traslados de un autotanque
    var getTrasladoUnidad = function () {
        citaRepository.getTrasladoUnidad().then(function (result) {
            if (result.data.length > 0) {
                $scope.TrasladosUnidad = result.data;
            } else {
                alertFactory.info('No se pudieron obtener los traslados de la unidad');
            }
        }, function (error) {
            alertFactory.error('No se pudieron obtener los traslados.');
        });
    };


});