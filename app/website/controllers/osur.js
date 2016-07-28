var OsurView = require('../views/ejemploVista'),
	OsurModel = require('../models/dataAccess2');

var Osur = function(conf){
	this.conf = conf || {};

	this.view = new OsurView();
	this.model = new OsurModel({ parameters : this.conf.parameters});

	this.response = function(){
		this[this.conf.funcionalidad](this.conf.req,this.conf.res,this.conf.next);
	}
}

//Valida credenciales de usuario
Osur.prototype.get_tars = function (req, res, next) {
    //Objeto que almacena la respuesta
    var object = {};
    //Objeto que envía los parámetros
    var params = {};
    //Referencia a la clase para callback
    var self = this;

    var params = [];

    this.model.query('SEL_TAR_SP',params, function (error, result) {
        //Callback
        object.error = error;
        object.result = result;

        self.view.expositor(res, object);
    });
}

//Obtiene los datos de Osur por TAR
Osur.prototype.get_datosOsur = function (req, res, next) {
    //Objeto que almacena la respuesta
    var object = {};
    //Objeto que envía los parámetros
    var params = {};
    //Referencia a la clase para callback
    var self = this;
    
    var params = [{
            name: 'idTAR',
            value: req.query.idTAR,
            type: self.model.types.INT
        }];

    this.model.query('SEL_DATOS_OSUR_BY_TAR_SP', params, function (error, result) {
        //Callback
        object.error = error;
        object.result = result;

        self.view.expositor(res, object);
    });
}

module.exports = Osur;