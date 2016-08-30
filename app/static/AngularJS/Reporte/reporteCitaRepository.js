var reporteCitaUrl = global_settings.urlCORS + '/api/dashboard/';

registrationModule.factory('reporteCitaRepository', function ($http) {
    return {        
            return $http({
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }
    };
});