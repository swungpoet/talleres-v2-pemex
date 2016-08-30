var reporteCitaUrl = global_settings.urlCORS + '/api/dashboard/';

registrationModule.factory('reporteCitaRepository', function ($http) {
    return {        
        getNumCita: function () {
            return $http({
                url: reporteCitaUrl + 'sumatoriaCitas/',
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }
    };
});