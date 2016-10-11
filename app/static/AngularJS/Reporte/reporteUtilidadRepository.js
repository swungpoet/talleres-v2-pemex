var reporteUtilidadUrl = global_settings.urlCORS + '/api/reporte/';

registrationModule.factory('reporteUtilidadRepository', function ($http) {
    return {        
        getUtilidad: function (fechaInicio, fechaFin, numeroTrabajo, tipoOrden, facturado, copade) {
            return $http({
                url: reporteUtilidadUrl + 'reporteUtilidad/',
                method: "GET",
                params: {
                    fechaInicio:fechaInicio,
                    fechaFin:fechaFin,
                    numeroTrabajo:numeroTrabajo,
                    tipoOrden:tipoOrden,
                    facturado:facturado,
                    copade:copade
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }
    };
});