
registrationModule.controller('presupuestoController', function ($scope, $modalInstance, $modal, callback, error, $http, $sce, $window, ordenServicioRepository, alertFactory) {

	$scope.init= function (){
		$scope.valorAdmin = '3lCr1st1n0'
	}

	$scope.close = function(){
		$modalInstance.dismiss('cancel');
	}

	$scope.checkValue = function(){
		if($scope.valueAdmin == $scope.valorAdmin){
			alertFactory.success("La contraseña es correcta!!");
		}else{
			alertFactory.info("El valor introducido no corresponde, porfavor intentelo nuevamente!!");
		}
	}

});
