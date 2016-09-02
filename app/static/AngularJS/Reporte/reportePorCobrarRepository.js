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
        getHistorialPorCobrar: function (idEstatus,idUsuario) {
            return $http({
                url: reportePorCobrarUrl + 'porCobrarHistorial/',
                method: "GET",
                params: {
                    idEstatus: idEstatus,
                    idUsuario:idUsuario
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }
    };
});