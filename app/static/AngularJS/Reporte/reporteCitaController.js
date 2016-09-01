// -- =============================================
// -- Author:      Carlos Adolfo Martinez Diosdado
// -- Create date: 30/08/2016
// -- Description: Reporte Cita controller
// -- =============================================

registrationModule.controller('reporteCitaController', function ($scope, alertFactory, $rootScope, localStorageService, reporteCitaRepository) {

    //Inicializa la pagina
    $scope.init = function () {
        $scope.obtieneDatoUrl();
        $scope.getNumeroCitas();
    }

    //obtiene el total de las citas
    $scope.getNumeroCitas = function () {
            reporteCitaRepository.getNumCita().then(function (citas) {
                $scope.registroCitas = citas.data;

                citas.data.forEach(function (sumatoria) {
                    if (sumatoria.estatus == 'SOLICITADAS') $scope.citasolicitadas = sumatoria.total;
                    if (sumatoria.estatus == 'AGENDADA') $scope.citasagendadas = sumatoria.total;
                    if (sumatoria.estatus == 'CONFIRMADA') $scope.citasconfirmadas = sumatoria.total;
                    if (sumatoria.estatus == 'CANCELADA') $scope.citascanceladas = sumatoria.total;
                });
                /*$scope.citasolicitadas = $scope.registroCitas[0].total;
                $scope.citasagendadas = $scope.registroCitas[1].total;
                $scope.citasconfirmadas = $scope.registroCitas[2].total;
                $scope.citascanceladas = $scope.registroCitas[3].total;*/

                $scope.obtenPorcentaje();
                if (citas.data.length > 0) {
                    alertFactory.success('Datos encontrados');
                } else {
                    alertFactory.info('No se encontraron datos');
                }
            }, function (error) {
                alertFactory.error('Error al obtener los datos');
            });
        }
        //obtiene el procentaje de las citas
    $scope.obtenPorcentaje = function () {
            var totalCitas = $scope.citasolicitadas + $scope.citasagendadas + $scope.citasconfirmadas + $scope.citascanceladas;
            $scope.porcentajesolicitado = ($scope.citasolicitadas * 100) / totalCitas;
            $scope.porcentajeagendado = ($scope.citasagendadas * 100) / totalCitas;
            $scope.porcentajeconfirmado = ($scope.citasconfirmadas * 100) / totalCitas;
            $scope.porcentajecancelada = ($scope.citascanceladas * 100) / totalCitas;
        }
        //Muestra el historico de citas canceldas
    $scope.citaCancelada = function () {
            $scope.tipoCita = 3;
            reporteCitaRepository.getHistorialCita(22, null).then(function (citacancela) {
                $('.dataTableCancelada').DataTable().destroy();
                $scope.cancelacion = citacancela.data;
                waitDrawDocument("dataTableCancelada");
                if (citacancela.data.length > 0) {
                    alertFactory.success('Exito al obtener citas canceladas');
                } else {
                    alertFactory.info('No se encontraron citas canceladas');
                }
            }, function (error) {
                alertFactory.error('Error al obtener los datos');
            });
        }
        //Muestra el historico de citas confirmadas
    $scope.citaConfirmada = function () {
            $scope.tipoCita = 2;
            reporteCitaRepository.getHistorialCita(2, null).then(function (citaconfirma) {
                $('.dataTableConfirmada').DataTable().destroy();
                $scope.confirmacion = citaconfirma.data;
                waitDrawDocument("dataTableConfirmada");
                if (citaconfirma.data.length > 0) {
                    alertFactory.success('Exito al obtener citas confirmadas');
                } else {
                    alertFactory.info('No se encontraron citas confirmadas');
                }
            }, function (error) {
                alertFactory.error('Error al obtener los datos');
            });
        }
        //Muestra el historico de citas agendadas
    $scope.citaAgendada = function () {
            $scope.tipoCita = 1;
            reporteCitaRepository.getHistorialCita(1, null).then(function (citaagenda) {
                $('.dataTableAgendada').DataTable().destroy();
                $scope.agendacion = citaagenda.data;
                waitDrawDocument("dataTableAgendada");
                if (citaagenda.data.length > 0) {
                    alertFactory.success('Exito al obtener citas agendadas');
                } else {
                    alertFactory.info('No se encontraron citas agendadas');
                }
            }, function (error) {
                alertFactory.error('Error al obtener los datos');
            });
        }
        //Muestra el historico de citas solicitadas
    $scope.citaSolicitada = function () {
        $scope.tipoCita = 0;
        reporteCitaRepository.getHistorialCita(1, 0).then(function (citasolicita) {
            $('.dataTableSolicitar').DataTable().destroy();
            $scope.solicitacion = citasolicita.data;
            waitDrawDocument("dataTableSolicitar");
            if (citasolicita.data.length > 0) {
                alertFactory.success('Exito al obtener citas solicitadas');
            } else {
                alertFactory.info('No se encontraron citas solicitadas');
            }
        }, function (error) {
            alertFactory.error('Error al obtener los datos');
        });
    }

    //Regresa la variable de la url
    $scope.obtieneDatoUrl = function () {
        var url = location.search.replace("?", "");
        var arrUrl = url.split("&");
        var urlObj = {};
        for (var i = 0; i < arrUrl.length; i++) {
            var x = arrUrl[i].split("=");
            urlObj[x[0]] = x[1]
        }
        $scope.tipoCita = urlObj.tipoCita;
        if ($scope.tipoCita == 0) {
            $scope.citaSolicitada();
        } else if ($scope.tipoCita == 1) {
            $scope.citaAgendada();
        } else if ($scope.tipoCita == 2) {
            $scope.citaConfirmada();
        } else if ($scope.tipoCita == 3) {
            $scope.citaCancelada();
        } else {
            $scope.citaSolicitada();
        }
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
                        title: 'CitasRegistradas'
                    },
                    {
                        extend: 'pdf',
                        title: 'CitasRegistradas'
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



});