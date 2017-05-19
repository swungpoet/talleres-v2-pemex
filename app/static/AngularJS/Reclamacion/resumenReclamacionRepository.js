var reclamacionUrl = global_settings.urlCORS + '/api/reclamacion/';
var cotizacionUrl = global_settings.urlCORS + '/api/cotizacion/';

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
        },
        getReclamacion: function () {
            return $http({
                url: reclamacionUrl + 'reclamcionMeastro/',
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        },        
        callExternalPdf: function (jsonData) {
            return $http({
                url: cotizacionUrl + 'newpdfReclamacion/',
                method: "POST",
                data: {
                    values: jsonData
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        callZip: function (jsonAnexos) {
            return $http({
                url: cotizacionUrl + 'generaZip/',
                method: "POST",
                data: {
                    jsonAnexos: jsonAnexos
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }
    };

});