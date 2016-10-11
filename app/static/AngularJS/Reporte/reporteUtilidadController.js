// -- =============================================
// -- Author:      Carlos Adolfo Martinez Diosdado
// -- Create date: 30/08/2016
// -- Description: Reporte Utilidad controller
// -- =============================================

registrationModule.controller('reporteUtilidadController', function ($scope, alertFactory, $rootScope, localStorageService, reporteUtilidadRepository) {


    //Inicializa la pagina
    $scope.initUtilidad = function () {

    }

   
       //obtiene el total de las citas
    $scope.getMargenUtilidad = function () {
         $('.dataTableUtilidad').DataTable().destroy();
            reporteUtilidadRepository.getUtilidad().then(function (utilidad) {
                $scope.margen = utilidad.data;

                if (utilidad.data.length > 0) {
                    alertFactory.success('Datos encontrados');
                    waitDrawDocument("dataTableUtilidad");
                } else {
                    alertFactory.info('No se encontraron datos');
                }
            }, function (error) {
                alertFactory.error('Error al obtener los datos');
            });
        }

    //fecha
    $('#fecha .input-group.date').datepicker({
        todayBtn: "linked",
        keyboardNavigation: true,
        forceParse: false,
        calendarWeeks: true,
        autoclose: true,
        todayHighlight: true
      //startDate: new Date()
    });

    //espera que el documento se pinte para llenar el dataTable
    var waitDrawDocument = function (dataTable) {
        setTimeout(function () {
            var indicePorOrdenar = 0;
            if (dataTable == 'dataTableUtilidad') {
                indicePorOrdenar = 9;
            }

            $('.' + dataTable).DataTable({
                order: [[indicePorOrdenar, 'desc']],
                dom: '<"html5buttons"B>lTfgitp',
                buttons: [
                    {
                        extend: 'excel',
                        title: 'MargenUtilidad'
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