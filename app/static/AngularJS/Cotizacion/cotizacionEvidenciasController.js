registrationModule.controller('cotizacionEvidenciasController', function ($scope, localStorageService, alertFactory, cotizacionEvidenciasRepository, $rootScope) {
    var idCotizacion = localStorageService.get('cotizacion');
    $scope.idTrabajo = localStorageService.get('work');
    $scope.userData = localStorageService.get('userData');

    $scope.init = function () {
        $scope.cargaEvidencias();
    }

    $scope.cargaEvidencias = function () {
        cotizacionEvidenciasRepository.getEvidenciasByCotizacion(idCotizacion, $scope.userData.idTipoUsuario, $scope.idTrabajo).then(function (result) {
            if (result.data.length > 0) {
                $scope.slides = result.data;
                setTimeout(function () {
                    $scope.efectoEvidencias();
                }, 1000)
            } else {
                $scope.alerta = 1;
            }
        }, function (error) {});
    }

    $scope.efectoEvidencias = function () {
        $('.file-box').each(function () {
            animationHover(this, 'pulse');
        });
    }

    $scope.openEvidencia = function () {
        document.getElementById("myNav").style.width = "100%";
    }

    $scope.adjuntarEvidencia = function () {
        $('#cotizacionDetalle').appendTo('body').modal('show');
    }

    $scope.setValFiltro = function (val) {
        $scope.filtro = {};
        //$scope.filtro.idTipoArchivo = 0;
        $scope.filtro.idTipoArchivo = val;
    }

    //Se realiza la carga de archivos
    $scope.cargarArchivos = function () {
        //Se obtienen los datos de los archivos a subir
        $scope.userData = localStorageService.get('userData');
        formArchivos = document.getElementById("uploader");
        contentForm = (formArchivos.contentWindow || formArchivos.contentDocument);
        if (contentForm.document)
            btnSubmit = contentForm.document.getElementById("submit2");
        elements = contentForm.document.getElementById("uploadForm").elements;
        idTrabajoEdit = contentForm.document.getElementById("idTrabajo");
        idCotizacionEdit = contentForm.document.getElementById("idCotizacion");
        idTipoEvidencia = contentForm.document.getElementById("idTipoEvidencia");
        idUsuario = contentForm.document.getElementById("idUsuario");
        idCategoria = contentForm.document.getElementById("idCategoria");
        idNombreEspecial = contentForm.document.getElementById("idNombreEspecial");
        idTrabajoEdit.value = $scope.idTrabajo;
        idCotizacionEdit.value = idCotizacion;
        idTipoEvidencia.value = 2;
        idCategoria.value = 1;
        idNombreEspecial.value = 0;
        idUsuario.value = $scope.userData.idUsuario;
        //Submit del botón del Form para subir los archivos        
        btnSubmit.click();

        setTimeout(function () {
            $scope.cargaEvidencias();
        }, 2000);
    }
});