var reporteCotizacionUrl = global_settings.urlCORS + '/api/dashboard/';

registrationModule.factory('reporteCotizacionRepository', function ($http) {
    return { 
        getNumCotizacion: function () {
            return $http({
                url: reporteCotizacionUrl + 'sumatoriaCotizaciones/',
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }       

    };
});