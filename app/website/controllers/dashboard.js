var DashBoardView = require('../views/ejemploVista'),
	DashBoardModel = require('../models/dataAccess2');

var DashBoard = function(conf){
	this.conf = conf || {};

	this.view = new DashBoardView();
	this.model = new DashBoardModel({ parameters : this.conf.parameters});

	this.response = function(){
		this[this.conf.funcionalidad](this.conf.req,this.conf.res,this.conf.next);
	}
}


//Obtiene la sumatoria de las citas 
DashBoard.prototype.get_sumatoriaCitas = function (req, res, next) {
    //Referencia a la clase para callback
    var self = this;
    //Obtención de valores de los parámetros del request
    var params = [];

    this.model.query('SEL_REPORTE_CITAS_SP', params, function (error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
}

module.exports = DashBoard;