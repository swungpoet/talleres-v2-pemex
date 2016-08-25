// -- =============================================
// -- Author:      V. Vladimir Juárez Juárez
// -- Create date: 25/08/2016
// -- Description: repositorio para los anticipos de las órdenes
// -- Modificó: 
// -- Fecha: 
// -- =============================================
var ordenAnticipoUrl = global_settings.urlCORS + '/api/ordenanticipo/';

registrationModule.factory('ordenAnticipoRepository', function ($http) {

    return {
        getOrdenesAnticipoPendiente: function () {
            return $http({
                url: ordenAnticipoUrl + 'ordenanticipopendiente/',
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        },
        getOrdenesAnticipoAplicado: function () {
            return $http({
                url: ordenAnticipoUrl + 'ordenanticipoaplicado/',
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        }
    };
});