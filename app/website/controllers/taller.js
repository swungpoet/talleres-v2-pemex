var TallerView = require('../views/ejemploVista'),
    TallerModel = require('../models/dataAccess2'),
    moment = require('moment');

//configuración para el objeto Taller
var Taller = function (conf) {
    this.conf = conf || {};

    this.view = new TallerView();
    this.model = new TallerModel({
        parameters: this.conf.parameters
    });

    this.response = function () {
        this[this.conf.funcionalidad](this.conf.req, this.conf.res, this.conf.next);
    }
}

//obtiene 1 taller específicamente
Taller.prototype.get_obtienetaller = function (req, res, next) {
    //Con req.query se obtienen los parametros de la url
    //Ejemplo: ?p1=a&p2=b
    //Retorna {p1:'a',p2:'b'}
    //Objeto que envía los parámetros
    //Referencia a la clase para callback
    var self = this;
    //Obtención de valores de los parámetros del request
    var params = [{
            name: 'idTaller',
            value: req.query.idTaller,
            type: self.model.types.INT
        }];

    this.model.query('SEL_OBTIENE_TALLER', params, function (error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
}

//obtiene todos los talleres
Taller.prototype.get_obtienetalleres = function (req, res, next) {
    //Con req.query se obtienen los parametros de la url
    //Ejemplo: ?p1=a&p2=b
    //Retorna {p1:'a',p2:'b'}
    //Objeto que envía los parámetros
    //var params = [];
    //Referencia a la clase para callback
    var self = this;

    //asignación de valores mediante parámetros del request
    var params = [];

    this.model.query('SEL_OBTIENE_TALLERES', params, function (error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
}

//obtiene el tipo de persona
Taller.prototype.get_obtienetipopersona = function (req, res, next) {
    //Con req.query se obtienen los parametros de la url
    //Ejemplo: ?p1=a&p2=b
    //Retorna {p1:'a',p2:'b'}
    //Objeto que envía los parámetros
    //var params = [];
    //Referencia a la clase para callback
    var self = this;

    //asignación de valores mediante parámetros del request
    var params = [];

    this.model.query('SEL_TIPO_PERSONA_SP', params, function (error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
}

//obtiene el estatus del taller
Taller.prototype.get_obtieneestatustaller = function (req, res, next) {
    //Con req.query se obtienen los parametros de la url
    //Ejemplo: ?p1=a&p2=b
    //Retorna {p1:'a',p2:'b'}
    //Objeto que envía los parámetros
    //var params = [];
    //Referencia a la clase para callback
    var self = this;

    //asignación de valores mediante parámetros del request
    var params = [];

    this.model.query('SEL_STATUS_TALLER_SP', params, function (error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
}

//obtiene las gar de los talleres
Taller.prototype.get_obtienegar = function (req, res, next) {
    //Con req.query se obtienen los parametros de la url
    //Ejemplo: ?p1=a&p2=b
    //Retorna {p1:'a',p2:'b'}
    //Objeto que envía los parámetros
    //var params = [];
    //Referencia a la clase para callback
    var self = this;

    //asignación de valores mediante parámetros del request
    var params = [];

    this.model.query('SEL_GAR_SP', params, function (error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
}

//inserta nuevo taller
Taller.prototype.post_insertataller = function (req, res, next) {
    //Referencia a la clase para callback
    var self = this;
    //Asigno a params el valor de mis variables
    var params = [{
            name: 'idUnidad',
            value: req.body.idUnidad,
            type: self.model.types.INT
        }];

    this.model.post('INS_INSERTA_TALLER_SP', params, function (error, result) {
        //Callback
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
}

//actualiza taller existente
Taller.prototype.post_actualizataller = function (req, res, next) {
    //Referencia a la clase para callback
    var self = this;
    //Asigno a params el valor de mis variables
    var params = [{
            name: 'idTaller',
            value: req.body.idTaller,
            type: self.model.types.INT
        }];

    this.model.post('UPD_ACTUALIZA_TALLER_SP', params, function (error, result) {
        //Callback
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
}

//elimina taller existente
Taller.prototype.post_eliminataller = function (req, res, next) {
    //Referencia a la clase para callback
    var self = this;
    //Asigno a params el valor de mis variables
    var params = [{
            name: 'idTaller',
            value: req.body.idTaller,
            type: self.model.types.INT
        }];

    this.model.post('UPD_ACTUALIZA_TALLER_SP', params, function (error, result) {
        //Callback
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
}

module.exports = Taller;