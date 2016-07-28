var osurUrl = global_settings.urlCORS + '/api/osur/';

registrationModule.factory('osurRepository', function ($http) {
    return {
        getTars: function () {
            return $http({
                url: osurUrl + 'tars',
                method: "GET"
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