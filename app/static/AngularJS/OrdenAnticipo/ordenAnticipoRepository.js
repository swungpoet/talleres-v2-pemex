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
        //borrar función de ejemplo
        getExmapleFunction: function (id) {
            return $http({
                url: ordenAnticipoUrl + 'example/',
                method: "GET",
                params: {
                    id: id
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        }
    };
});