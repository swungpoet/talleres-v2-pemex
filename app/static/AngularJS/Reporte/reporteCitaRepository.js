var reporteCitaUrl = global_settings.urlCORS + '/api/dashboard/';

registrationModule.factory('reporteCitaRepository', function ($http) {
    return {        
        getNumCita: function (idTar,idUsuario) {
            return $http({
                url: reporteCitaUrl + 'sumatoriaCitas/',
                method: "GET",
                params: {
                    idTar:idTar,
                    idUsuario: idUsuario
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        getHistorialCita: function (idEstatus,idTaller) {
            return $http({
                url: reporteCitaUrl + 'citasHistorial/',
                method: "GET",
                params: {
                    idEstatus: idEstatus,
                    idTaller:idTaller
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }
    };
});