var reporteUtilidadUrl = global_settings.urlCORS + '/api/reporte/';

registrationModule.factory('reporteUtilidadRepository', function ($http) {
    return {        
        getUtilidad: function (fechaInicio, fechaFin, numeroTrabajo, facturado) {
            return $http({
                url: reporteUtilidadUrl + 'reporteUtilidad/',
                method: "GET",
                params: {
                    fechaInicio:fechaInicio,
                    fechaFin:fechaFin,
                    numeroTrabajo:numeroTrabajo,
                    facturado:facturado
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }
    };
});