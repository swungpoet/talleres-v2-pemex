var OrdenAnticipoView = require('../views/ejemploVista'),
    OrdenAnticipoModel = require('../models/dataAccess2'),
    moment = require('moment');

//configuración para el objeto OrdenAnticipo
var OrdenAnticipo = function (conf) {
    this.conf = conf || {};

    this.view = new OrdenAnticipoView();
    this.model = new OrdenAnticipoModel({
        parameters: this.conf.parameters
    });

    this.response = function () {
        this[this.conf.funcionalidad](this.conf.req, this.conf.res, this.conf.next);
    }
}

//obtiene las órdenes pendiente de anticipo
OrdenAnticipo.prototype.get_ordenanticipopendiente = function (req, res, next) {
    //Con req.query se obtienen los parametros de la url
    //Ejemplo: ?p1=a&p2=b
    //Retorna {p1:'a',p2:'b'}
    //Objeto que envía los parámetros
    //Referencia a la clase para callback
    var self = this;
    //Obtención de valores de los parámetros del request
    var params = [];

    this.model.query('SEL_ORDEN_ANTICIPO_PENDIENTE_SP', params, function (error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
}

//obtiene las órdenes con anticipos aplicados
OrdenAnticipo.prototype.get_ordenanticipoaplicado = function (req, res, next) {
    //Con req.query se obtienen los parametros de la url
    //Ejemplo: ?p1=a&p2=b
    //Retorna {p1:'a',p2:'b'}
    //Objeto que envía los parámetros
    //Referencia a la clase para callback
    var self = this;
    //Obtención de valores de los parámetros del request
    var params = [];

    this.model.query('SEL_ORDEN_ANTICIPO_APLICADO_SP', params, function (error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
}

module.exports = OrdenAnticipo;