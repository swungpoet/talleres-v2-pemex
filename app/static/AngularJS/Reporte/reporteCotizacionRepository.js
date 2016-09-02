var reporteCotizacionUrl = global_settings.urlCORS + '/api/dashboard/';

registrationModule.factory('reporteCotizacionRepository', function ($http) {
    return { 
        getNumCotizacion: function () {
            return $http({
                url: reporteCotizacionUrl + 'sumatoriaCotizaciones/',
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        getHistorialCotizacion: function (idEstatus,idTar,idUsuario) {
            return $http({
                url: reporteCotizacionUrl + 'cotizacionesHistorial/',
                method: "GET",
                params: {
                    idEstatus: idEstatus,
                    idTar:idTar,
                    idUsuario:idUsuario
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }       

    };
});