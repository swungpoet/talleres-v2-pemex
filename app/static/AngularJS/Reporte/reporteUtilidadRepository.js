var reporteUtilidadUrl = global_settings.urlCORS + '/api/reporte/';

registrationModule.factory('reporteUtilidadRepository', function ($http) {
    return {        
        getUtilidad: function (fechaInicio, fechaFin, numeroTrabajo, tipoOrden, facturado) {
            return $http({
                url: reporteUtilidadUrl + 'reporteUtilidad/',
                method: "GET",
                params: {
                    fechaInicio:fechaInicio,
                    fechaFin:fechaFin,
                    numeroTrabajo:numeroTrabajo,
                    tipoOrden:tipoOrden,
                    facturado:facturado
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }
    };
});