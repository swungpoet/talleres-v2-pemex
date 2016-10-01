var osurUrl = global_settings.urlCORS + '/api/osur/';

registrationModule.factory('osurRepository', function ($http) {
    return {
        getTars: function (idUsuario) {
            return $http({
                url: osurUrl + 'tars',
                method: "GET",
                params: {
                    idUsuario: idUsuario
                },
            });
        },
        getDatosOsur: function (idTAR) {
            return $http({
                url: osurUrl + 'datosOsur',
                method: "GET",
                params: {
                    idTAR: idTAR
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }
    };
});