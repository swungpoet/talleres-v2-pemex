var tableroUrl = global_settings.urlCORS + '/api/dashboard/';

registrationModule.factory('dashBoardRepository', function ($http) {
    return {
        getTotalCitas: function () {
            return $http({
                url: tableroUrl + 'sumatoriaCitas/',
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        getTotalCotizaciones: function () {
            return $http({
                url: tableroUrl + 'sumatoriaCotizaciones/',
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }
    };
});