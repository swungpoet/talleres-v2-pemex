var reclamacionUrl = global_settings.urlCORS + '/api/reclamacion/';
var searchUrl = global_settings.urlCORS + '/api/cotizacion/';

registrationModule.factory('historialReclamacionRepository', function ($http, $q) {
    var deferred = $q.defer();

    return {
        getReclamacion: function (fechaInicio, fechaFin) {
            return $http({
                url: reclamacionUrl + 'reclamacion/',
                method: "GET",
                params: {
                    fechaInicio: fechaInicio,
                    fechaFin: fechaFin
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        },
        getEvidenciasByReclamacion: function (idReclamacion, idTipoUsuario) {
            return $http({
                url: searchUrl + 'evidenciasByReclamacion',
                method: "GET",
                params: {
                    idReclamacion: idReclamacion, 
                    idTipoUsuario:idTipoUsuario
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }
    };

});