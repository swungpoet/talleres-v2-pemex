var reporteOrdenUrl = global_settings.urlCORS + '/api/dashboard/';

registrationModule.factory('reporteReclamacionRepository', function ($http) {
    return {        
        getAnexos: function (idZona, idTar, anexo) {
            return $http({
                url: reporteOrdenUrl + 'buscaAnexos/',
                method: "GET",
                params: {
                    idZona: idZona,
                    idTar: idTar,
                    anexo: anexo
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }
    }
});