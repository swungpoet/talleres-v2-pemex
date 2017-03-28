var administracionUrl = global_settings.urlCORS + '/api/administracion/';

registrationModule.factory('usuariotarRepository', function ($http, $q) {
    var deferred = $q.defer();

    return {
        buscaUsuarios: function (idZona,idTar,idUsuario) {
            return $http({
                url: administracionUrl + 'users/',
                method: "GET",
                params: {
                    idZona: idZona,
                    idTar:idTar,
                    idUsuario:idUsuario
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }
    };
});