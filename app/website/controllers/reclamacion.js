var ReclamacionView = require('../views/ejemploVista'),
    ReclamacionModel = require('../models/dataAccess2');

var Reclamacion = function (conf) {
    this.conf = conf || {};

    this.view = new ReclamacionView();
    this.model = new ReclamacionModel({
        parameters: this.conf.parameters
    });

    this.response = function () {
        this[this.conf.funcionalidad](this.conf.req, this.conf.res, this.conf.next);
    }
}

Reclamacion.prototype.get_reclamacion = function (req, res, next) {
    var object = {};
    var params = {};
    var self = this;
    var params = [
        {
            name: 'idUsuario',
            value: req.query.idUsuario,
            type: self.model.types.INT
        }
    ];
    
    this.model.query('SEL_Reclamacion_SP', params, function (error, result) {
        //Callback
        object.error = error;
        object.result = result;

        self.view.expositor(res, object);
    });
}

module.exports = Reclamacion;