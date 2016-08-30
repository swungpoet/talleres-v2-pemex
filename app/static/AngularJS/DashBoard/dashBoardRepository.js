var tableroUrl = global_settings.urlCORS + '/api/dashboard/';

registrationModule.factory('dashBoardRepository', function ($http) {
    return {
        getTotalCitas: function () {
            return $http({
                url: tableroUrl + 'sumatoriaCitas/',
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        getTotalCotizaciones: function () {
            return $http({
                url: tableroUrl + 'sumatoriaCotizaciones/',
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        getZonas: function () {
            return $http({
                url: tableroUrl + 'zonas/',
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        getTars: function (idZona) {
            var objZona = {
                idZona: idZona
            };

            return $http({
                url: tableroUrl + 'tars/',
                method: "GET",
                data: objZona,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }
    };
});