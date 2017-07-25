var precioventaUrl = global_settings.urlCORS + '/api/administracion/'

registrationModule.factory('precioventaRepository', function ($http) {
  return {
    getPrecio: function (busqueda) {
      return $http({
        url: precioventaUrl + 'obtenerprecioventa/',
        method: 'GET',
        params: {
          busqueda: busqueda
        },
        headers: {
          'Content-Type': 'application/json'
        }
      })
    }
  }
})
