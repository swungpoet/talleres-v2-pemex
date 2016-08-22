
// -- =============================================
// -- Author:      Adolfo Marinez
// -- Create date: 22/08/2016
// -- Description: talleres controller
// -- =============================================

registrationModule.controller('accionTallerController', function($scope, alertFactory, accionTallerRepository){
	//this is the first method executed in the view
	$scope.init = function(){
	 $scope.getTaller();
	}

 $scope.getTaller = function () {
        $scope.promise = accionTallerRepository.getTallerInformation().then(function (tallerInfo) {
            $scope.talleres = tallerInfo.data;
             setTimeout(function () {
                     $('.dataTableTaller').DataTable({
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
                                        title: 'ReporteGeneral'
                                    },
                                    {
                                        extend: 'pdf',
                                        title: 'ReporteGeneral'
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
        }, function (error) {
            alertFactory.error('Error al obtener los datos');
        });
    }
    
    $scope.editaTaller = function () {
        location.href = '/administraciontaller';
    }
    $scope.nuevoTaller = function () {
        location.href = '/administraciontaller';
    }
    


});