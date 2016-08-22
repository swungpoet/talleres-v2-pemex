// -- =============================================
// -- Author:      Adolfo Marinez
// -- Create date: 22/08/2016
// -- Description: talleres controller
// -- =============================================
var tallerUrl = global_settings.urlCORS + '/api/taller/';

registrationModule.factory('tallerRepository', function ($http) {
return {
        getTallerGar: function () {
            return $http({
                url: tallerUrl + 'obtienegar/',
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
                getTallerTar: function () {
            return $http({
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
                getTallerTipoUsuario: function () {
            return $http({
                url: tallerUrl + 'obtienetipopersona/',
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
                getTallerEstatus: function () {
            return $http({
                url: tallerUrl + 'obtieneestatustaller/',
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }
        
    };

});