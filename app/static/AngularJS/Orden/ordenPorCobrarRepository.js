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
         putFechaCopade: function (fecha,idTrabajo,idTipoProceso) {
            var objTrabajo = {
                fecha:fecha,
                idTrabajo: idTrabajo,
                idTipoProceso:idTipoProceso
            };

            return $http({
                url: ordenUrl + 'fechaCopade',
                method: "POST",
                data: objTrabajo,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        getFechaCopade: function (idTrabajo, idTipoProceso) {
            return $http({
                url: ordenUrl + 'searchFechaCopade',
                method: "GET",
                params: {
                    idTrabajo: idTrabajo,
                    idTipoProceso: idTipoProceso
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }
    };
});