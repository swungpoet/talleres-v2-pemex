registrationModule.controller('precioventaController', function ($scope, alertFactory, precioventaRepository, globalFactory) {
  // this is the first method executed in the view
  $scope.init = function () {}

  $scope.getPieza = function (value) {
    $('#btnBuscar').button('Buscando...')
    $('.dataTablePiezaTaller').DataTable().destroy()
    precioventaRepository.getPrecio(value)
      .then(
        function (response) {
          $scope.piezas = response.data
          $('#btnBuscar').button('reset')
          globalFactory.waitDrawDocument('dataTablePiezaTaller', 'Precios')
        },
        function (error) {
          alertFactory.error('Error al obtener la pieza.')
          $('#btnBuscar').button('reset')
        }
    )
  }
})
