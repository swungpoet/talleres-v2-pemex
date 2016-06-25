var searchUrl = global_settings.urlCORS + '/api/cotizacion/';

registrationModule.factory('cotizacionConsultaRepository', function ($http) {
    return {
        get: function(idUsuario){
            return $http({
                url: searchUrl + 'see/',
                method: "GET",
                params: {idUsuario: idUsuario},
                headers: {
                'Content-Type': 'application/json'
                }
            });
        },
        busquedaPieza: function(){
        	return $http({
        		url: searchUrl + 'buscar',
        		method: "GET"
        	});
        },
        getDetail: function (idCotizacion, idTaller) {
            var objCotizacion = {
                idCotizacion: idCotizacion,
                idTaller: idTaller
            };
            
            return $http({
                url: searchUrl + 'detail',
                method: "GET",
                params: objCotizacion,
                headers: {
                    'Content-Type': 'application/json'
                }
            });            
            /*return $http({
                url: searchUrl + 'detail/' + idCotizacion,
                method: "POST"
            });*/
        }
    };
});