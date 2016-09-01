var reportePorCobrarUrl = global_settings.urlCORS + '/api/dashboard/';

registrationModule.factory('reportePorCobrarRepository', function ($http) {
    return {        
        getNumPorCobrar: function () {
            return $http({
                url: reportePorCobrarUrl + 'sumatoriaOrdenesPorCobrar/',
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        getHistorialPorCobrar: function (idEstatus) {
            return $http({
                url: reportePorCobrarUrl + 'porCobrarHistorial/',
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