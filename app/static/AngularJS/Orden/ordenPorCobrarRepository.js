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
        postGeneraTXT: function (idTrabajo) {
            var objTrabajo = {
                idTrabajo: idTrabajo
            };

            return $http({
                url: ordenUrl + 'generaTxtFactura',
                method: "POST",
                data: objTrabajo,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }
    };
});