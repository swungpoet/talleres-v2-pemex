// -- =============================================
// -- Author:      Adolfo Marinez
// -- Create date: 22/08/2016
// -- Description: talleres controller
// -- =============================================
registrationModule.controller('tallerController', function($scope, alertFactory){
	//this is the first method executed in the view
	$scope.init = function(){
	}

	$scope.accionesTaller = function () {
      location.href = '/acciontaller';
    }
});