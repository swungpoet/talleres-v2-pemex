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
        }

    };
});