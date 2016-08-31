var tableroUrl = global_settings.urlCORS + '/api/dashboard/';

registrationModule.factory('dashBoardRepository', function ($http) {
    return {
        getTotalCitas: function (idTar) {
            var objTAR = {
                idTar: idTar
            };

            return $http({
                url: tableroUrl + 'sumatoriaCitas/',
                method: "POST",
                data: objTAR,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        getTotalCotizaciones: function (idTar) {
            var objTAR = {
                idTar: idTar
            };

            return $http({
                url: tableroUrl + 'sumatoriaCotizaciones/',
                method: "POST",
                data: objTAR,
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
                url: tableroUrl + 'tars',
                method: "POST",
                data: objZona,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        getTotalOrdenes: function (idTar) {
            return $http({
                url: tableroUrl + 'sumatoriaOrdenes',
                method: "GET",
                params: {
                    idTar: idTar
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }
    };
});