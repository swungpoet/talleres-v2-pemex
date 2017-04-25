var reclamacionUrl = global_settings.urlCORS + '/api/reclamacion/';

registrationModule.factory('resumenReclamacionRepository', function ($http, $q) {
    var deferred = $q.defer();

    return {
        getResumen: function (idZona) {
            return $http({
                url: reclamacionUrl + 'resumenReclamcion/',
                method: "GET",
                params: {
                    idZona: idZona
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        }
    };

});