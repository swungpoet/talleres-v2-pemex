// -- =============================================
// -- Author:      Adolfo Marinez
// -- Create date: 22/08/2016
// -- Description: talleres controller
// -- =============================================
var tallerUrl = global_settings.urlCORS + '/api/taller/';

registrationModule.factory('accionTallerRepository', function ($http) {
return {
        getTallerInformation: function () {
            return $http({
                url: tallerUrl + 'obtienetalleres/',
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }
        
    };

});