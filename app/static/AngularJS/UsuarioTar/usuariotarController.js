// -- =============================================
// -- Author:      Adolfo Martinez
// -- Create date: 27/03/2017
// -- Description: Administracion de usuarios por tar
// -- Modificó: 
// -- Fecha: 
// -- Modificó: 
// -- Fecha:
// -- =============================================

registrationModule.controller('usuariotarController', function ($scope, $route, $modal, $rootScope, localStorageService, alertFactory, usuariotarRepository, reporteRepository, dashBoardRepository, globalFactory) {
    $scope.userData = localStorageService.get('userData');

    $scope.init = function () {
        $scope.devuelveZonas();
        $scope.buscaCallCenter();
        $scope.usuarioporTar();
    }

    $scope.devuelveTars = function (zona) {
        if (zona != null) {
            dashBoardRepository.getTars(zona).then(function (tars) {
                if (tars.data.length > 0) {
                    $scope.tars = tars.data;

                }
            }, function (error) {
                alertFactory.error('No se pudo recuperar información de las TARs');
            });
        } else {
            $scope.tar = null;
        }
    }

    $scope.devuelveZonas = function () {
        dashBoardRepository.getZonas($scope.userData.idUsuario).then(function (zonas) {
            if (zonas.data.length > 0) {
                $scope.zonas = zonas.data;

            }
        }, function (error) {
            alertFactory.error('No se pudo recuperar información de las zonas');
        });
    }
    $scope.buscaCallCenter = function () {        
        var idUsuario = null;
        if ($scope.userData.idTipoUsuario==2) {   
          idUsuario=$scope.userData.idUsuario;
      }
      reporteRepository.callcenter(idUsuario).then(function (response) {
        if (response.data.length > 0) {
            $scope.callCenters=response.data; 
        }
    }, function (error) {
        alertFactory.error('Error al obtener la informacion');
    });
  }
  $scope.usuarioporTar = function () {        
    usuariotarRepository.buscaUsuarios($scope.zona, $scope.tar, $scope.callCenter).then(function (response) {
        $('.dataTableUsuarioTar').DataTable().destroy();
        if (response.data.length > 0) {
            globalFactory.waitDrawDocument("dataTableUsuarioTar", "Usuario_TAR");
            $scope.users=response.data; 
            alertFactory.success('Usuarios encontrados exitosamente!!');
        }else{
            alertFactory.info('No se encontraron usuarios');
        }
    }, function (error) {
        alertFactory.error('Error al obtener la informacion');
    });
}
$scope.asignaUsuario = function () {
    $('#usuarioTarModal').appendTo("body").modal('show');
}
});