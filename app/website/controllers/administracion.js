var AdministracionView = require('../views/ejemploVista'),
  AdministracionModel = require('../models/dataAccess2'),
  moment = require('moment')

// configuración para el objeto cita
var Administracion = function (conf) {
  this.conf = conf || {}

  this.view = new AdministracionView()
  this.model = new AdministracionModel({
    parameters: this.conf.parameters
  })

  this.response = function () {
    this[this.conf.funcionalidad](this.conf.req, this.conf.res, this.conf.next)
  }
}

// obtiene el trabajo de la cita
Administracion.prototype.get_users = function (req, res, next) {
  var self = this
  // Obtención de valores de los parámetros del request
  var params = [
    {
      name: 'idZona',
      value: req.query.idZona,
      type: self.model.types.INT
    },
    {
      name: 'idTar',
      value: req.query.idTar,
      type: self.model.types.INT
    },
    {
      name: 'idUsuario',
      value: req.query.idUsuario,
      type: self.model.types.INT
    }]

  this.model.query('SEL_USUARIO_TAR_SP', params, function (error, result) {
    self.view.expositor(res, {
      error: error,
      result: result
    })
  })
}

Administracion.prototype.post_deleteUserTar = function (req, res, next) {
  // Objeto que almacena la respuesta
  var object = {}
  // Objeto que envía los parámetros
  var params = {}
  // Referencia a la clase para callback
  var self = this

  // Asigno a params el valor de mis variables
  var params = [{
    name: 'idTar',
    value: req.body.idTar,
    type: self.model.types.INT
  },
    {
      name: 'idUsuario',
      value: req.body.idUsuario,
      type: self.model.types.INT
    }]

  this.model.post('DEL_USUARIO_TAR_SP', params, function (error, result) {
    // Callback
    object.error = error
    object.result = result

    self.view.expositor(res, object)
  })
}

Administracion.prototype.get_obtenerprecioventa = function (req, res, next) {
  // Objeto que almacena la respuesta
  var object = {}
  var params = {}
  var self = this

  // Asigno a params el valor de mis variables
  var params = [{
    name: 'busqueda',
    value: req.query.busqueda,
    type: self.model.types.STRING
  }]

  this.model.post('SEL_ITEM_PV_SP', params, function (error, result) {
    // Callback
    object.error = error
    object.result = result

    self.view.expositor(res, object)
  })
}

Administracion.prototype.post_addUserTar = function (req, res, next) {
  // Objeto que almacena la respuesta
  var object = {}
  // Objeto que envía los parámetros
  var params = {}
  // Referencia a la clase para callback
  var self = this

  // Asigno a params el valor de mis variables
  var params = [
    {
      name: 'idUsuario',
      value: req.body.idUsuario,
      type: self.model.types.INT
    }, {
      name: 'idTar',
      value: req.body.idTar,
      type: self.model.types.INT
    }
  ]

  this.model.post('INS_USUARIO_TAR_SP', params, function (error, result) {
    // Callback
    object.error = error
    object.result = result

    self.view.expositor(res, object)
  })
}

module.exports = Administracion
