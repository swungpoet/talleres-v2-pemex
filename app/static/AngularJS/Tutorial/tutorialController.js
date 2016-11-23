// -- =============================================
// -- Author:      Uriel Godínez Martínez
// -- Create date: 23/03/2016
// -- Description: Citas controller
// -- Modificó: V. Vladimir Juárez Juárez
// -- Fecha: 30/03/2016
// -- Modificó: Carlos Adolfo Martinez Diosdado
// -- Fecha: 08/07/2016
// -- =============================================

registrationModule.controller('tutorialController', function ($scope, $route, $modal, $rootScope, localStorageService, alertFactory, globalFactory, citaRepository, ordenServicioRepository, cotizacionRepository, trabajoRepository, uploadRepository) {
 
	$scope.videoTutorial = function () {
        window.open($rootScope.vIpServer + '/uploads/tutorial/consulta_de_citas.mp4', '_blank', 'Cita');
     }
});