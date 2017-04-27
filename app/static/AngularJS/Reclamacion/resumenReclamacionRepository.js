var reclamacionUrl = global_settings.urlCORS + '/api/reclamacion/';

registrationModule.factory('resumenReclamacionRepository', function ($http, $q) {
    var deferred = $q.defer();

    return {
        getResumen: function () {
            return $http({
                url: reclamacionUrl + 'resumenReclamcion/',
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        }
    };

});