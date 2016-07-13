var searchUrl = global_settings.urlCORS + '/api/cotizacion/';

registrationModule.factory('cotizacionEvidenciasRepository', function ($http) {
    return {
        getEvidenciasByCotizacion: function (idCotizacion, idTipoUsuario) {
            return $http({
                url: searchUrl + 'evidenciasByCotizacion',
                method: "GET",
                 params: {idCotizacion:idCotizacion, idTipoUsuario:idTipoUsuario},
                headers: {
                    'Content-Type': 'application/json'
                }
               
            });
        }
    };
});


