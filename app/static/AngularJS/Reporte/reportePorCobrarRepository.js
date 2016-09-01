var reportePorCobrarUrl = global_settings.urlCORS + '/api/dashboard/';

registrationModule.factory('reportePorCobrarRepository', function ($http) {
    return {        
        getNumPorCobrar: function () {
            return $http({
                url: reporteOrdenUrl + 'sumatoriaOrdenesPorCobrar/',
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }
    };
});