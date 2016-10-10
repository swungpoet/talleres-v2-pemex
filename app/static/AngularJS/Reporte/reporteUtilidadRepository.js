var reporteUtilidadUrl = global_settings.urlCORS + '/api/reporte/';

registrationModule.factory('reporteUtilidadRepository', function ($http) {
    return {        
        getUtilidad: function () {
            return $http({
                url: reporteUtilidadUrl + 'reporteUtilidad/',
                method: "GET",
                params: {
                    numeroEconomico: numeroEconomico
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }
    };
});