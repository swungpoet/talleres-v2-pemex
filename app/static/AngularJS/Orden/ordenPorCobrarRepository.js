var ordenUrl = global_settings.urlCORS + '/api/orden/';

registrationModule.factory('ordenPorCobrarRepository', function ($http) {
    return {
        getOrdenesPorCobrar: function () {
            return $http({
                url: ordenUrl + 'ordenesporcobrar',
                method: "GET"
            });
        },
        putTrabajoCobrado: function (idTrabajo) {
            var objTrabajo = {
                idTrabajo: idTrabajo
            };

            return $http({
                url: ordenUrl + 'trabajocobrado',
                method: "POST",
                data: objTrabajo,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        getPreFacturas: function () {
            return $http({
                url: ordenUrl + 'prefacturas',
                method: "GET"
            });
        },
        getGeneraTXT: function (idTrabajo) {
            var objTrabajo = {
                idTrabajo: idTrabajo
            };
            return $http({
                url: ordenUrl + 'generaTxtFactura',
                method: "GET",
                params: objTrabajo,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
         putFechaCopade: function (idTrabajo,fechaServicio) {
            var objTrabajo = {
                idTrabajo: idTrabajo,
                fechaServicio:fechaServicio  
            };
            return $http({
                url: ordenUrl + 'putFechaServicio',
                method: "POST",
                data: objTrabajo,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        getFechaCopade: function (idTrabajo) {
            return $http({
                url: ordenUrl + 'searchFechaCopade',
                method: "GET",
                params: {
                    idTrabajo: idTrabajo
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
       getCopades: function () {
           return $http({
               url: ordenUrl + 'copades',
               method: "GET"
           });
       },
        putGeneraDatosCopade: function (archivos) {
           var objArchivos = {
               archivos: archivos
           };

           return $http({
               url: ordenUrl + 'generaDatosCopade',
               method: "POST",
               data: objArchivos,
               headers: {
                   'Content-Type': 'application/json'
               }
           });
       },
       getMejorCoincidencia: function (numeroEconomico,monto) {
            return $http({
                url: ordenUrl + 'getCoincidenciaMejor',
                method: "GET",
                params: {
                    numeroEconomico: numeroEconomico,
                    monto:monto
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }
       
    };
});