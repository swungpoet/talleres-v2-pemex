var osurUrl = global_settings.urlCORS + '/api/osur/';

registrationModule.factory('osurRepository', function ($http) {
    return {
        getTars: function (idUsuario) {
            return $http({
                url: osurUrl + 'tars',
                method: "GET",
                params: {
                    idUsuario: idUsuario
                },
            });
        },
        getDatosOsur: function (idTAR) {
            return $http({
                url: osurUrl + 'datosOsur',
                method: "GET",
                params: {
                    idTAR: idTAR
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        putNuevaOsur: function (presupuesto,idTAR,folio,fechaInicial,fechaFinal,solpe) {             
            return $http({        
                url: osurUrl + 'nuevaosur',
                        method: "POST",
                         data: {
                           presupuesto: presupuesto,
                           idTAR: idTAR,
                           folio: folio,
                           fechaInicial: fechaInicial,
                           fechaFinal: fechaFinal,
                           solpe: solpe
                        },

                        headers: {          
                    'Content-Type': 'application/json'        
                }      
            });    
        },
        getOsurAplicacion: function (idTAR,idOsur,monto) {             
            return $http({        
                url: osurUrl + 'osuraplicacion',
                        method: "POST",
                         data: {
                           idTAR: idTAR,
                           idOsur: idOsur,
                           monto: monto
                        },

                        headers: {          
                    'Content-Type': 'application/json'        
                }      
            });    
        },
        getFondos: function (idTAR, idOsur) {
          
            return $http({
                url: osurUrl + 'fondos',
                method: "GET",
                params: {
                    idTAR: idTAR,
                    idOsur: idOsur
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }
    };
});