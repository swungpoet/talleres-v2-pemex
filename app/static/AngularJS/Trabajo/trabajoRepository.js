var trabajoUrl = global_settings.urlCORS + '/api/trabajo/';

registrationModule.factory('trabajoRepository', function ($http) {
    return {
        getTrabajo: function(idUsuario){
            return $http({
                url: trabajoUrl + 'trabajo/',
                method: "GET",
                params: {idUsuario: idUsuario},
                headers: {
                'Content-Type': 'application/json'
                }
            });
        },
        getTrabajoTerminado: function(idUsuario){
            return $http({
                url: trabajoUrl + 'trabajoterminado/',
                method: "GET",
                params: {idUsuario: idUsuario},
                headers: {
                'Content-Type': 'application/json'
                }
            });
        },
        getTrabajoAprobado: function(idUsuario){
            return $http({
                url: trabajoUrl + 'trabajoaprobado/',
                method: "GET",
                params: {idUsuario: idUsuario},
                headers: {
                'Content-Type': 'application/json'
                }
            });
        },
        terminaTrabajo: function(idEstatus,idTrabajo, observacion){
            return $http({
                url: trabajoUrl + 'updtrabajoterminado/',
                method: "POST",
                data: {idEstatus: idEstatus,idTrabajo:idTrabajo,observacion : observacion},
                headers: {
                'Content-Type': 'application/json'
                }
            });
        },
        generaCerficadoConformidadTrabajo: function(idEstatus,idTrabajo){
            return $http({
                url: trabajoUrl + 'updtrabajocertificadogenerado/',
                method: "POST",
                data: {idEstatus: idEstatus,idTrabajo: idTrabajo},
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        descargaCerficadoConformidadTrabajo: function(idEstatus,idTrabajo){
            return $http({
                url: trabajoUrl + 'updtrabajocertificadodescargado/',
                method: "POST",
                data: {idEstatus: idEstatus,idTrabajo: idTrabajo},
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        uploadCertificadoCallCenterTrabajo: function(idEstatus,idTrabajo){
            return $http({
                url: trabajoUrl + 'updtrabajocertificadocallcenter/',
                method: "POST",
                data: {idEstatus: idEstatus,idTrabajo: idTrabajo},
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        uploadCertificadoClienteTrabajo: function(idEstatus,idTrabajo){
            return $http({
                url: trabajoUrl + 'updtrabajocertificadocliente/',
                method: "POST",
                data: {idEstatus: idEstatus,idTrabajo: idTrabajo},
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        transfResponsabilidadTrabajo: function(idEstatus,idTrabajo){
            return $http({
                url: trabajoUrl + 'updtrabajotransfreponsabilidad/',
                method: "POST",
                data: {idEstatus: idEstatus,idTrabajo: idTrabajo},
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        facturaTrabajo: function(idEstatus,idTrabajo){
            return $http({
                url: trabajoUrl + 'updtrabajofacturado/',
                method: "POST",
                data: {idEstatus: idEstatus,idTrabajo:idTrabajo},
                headers: {
                'Content-Type': 'application/json'
                }
            });
        
        },
        getTimeLine: function(idCita){
            return $http({
                url: trabajoUrl + 'timeLine/',
                method: "GET",
                params: {idCita: idCita},
                headers: {
                'Content-Type': 'application/json'
                }
            });
        },
        insertTrabajo: function(idCita,idUsuario,idUnidad){
            return $http({
                url: trabajoUrl + 'insertTrabajo/',
                method: "POST",
                data: {idCita: idCita,idUsuario: idUsuario,idUnidad: idUnidad},
                headers: {
                'Content-Type': 'application/json'
                }
            });
        },
        ordenServicioGarantia: function(idEstatus,idTrabajo,observacion){
            return $http({
                url: trabajoUrl + 'updtrabajoordengarantia',
                method: "POST",
                data: {idEstatus:idEstatus, idTrabajo:idTrabajo, observacion:observacion},
                headers: {
                'Content-Type': 'application/json'
                }
            }); 
        },
          getOrdenEmail: function(idTrabajo){
            return $http({
                url: trabajoUrl + 'trabajorechazado/',
                method: "GET",
                params: {idTrabajo: idTrabajo},
                headers: {
                'Content-Type': 'application/json'
                }
            });
        },
         putFechaRealTrabajo: function (idTrabajo,fechaServicio) {
            var objTrabajo = {
                idTrabajo: idTrabajo,
                fechaServicio:fechaServicio  
            };
            return $http({
                method: "POST",
                data: objTrabajo,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        getFechaRealTrabajo: function (idTrabajo) {
            return $http({
                method: "GET",
                params: {
                    idTrabajo: idTrabajo
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }

    };
});