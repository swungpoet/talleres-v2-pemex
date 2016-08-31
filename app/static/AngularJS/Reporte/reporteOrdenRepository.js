var reporteOrdenUrl = global_settings.urlCORS + '/api/dashboard/';

registrationModule.factory('reporteOrdenRepository', function ($http) {
    return {        
        getNumOrdenes: function () {
            return $http({
                url: reporteOrdenUrl + 'sumatoriaOrdenes/',
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        getHistorialOrden: function (idEstatus) {
            return $http({
                url: reporteCitaUrl + 'ordenesHistorial/',
                method: "GET",
                params: {
                    idEstatus: idEstatus
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }

    };
});