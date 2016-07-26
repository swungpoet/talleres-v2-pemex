var OrdenView = require('../views/ejemploVista'),
    OrdenModel = require('../models/dataAccess2');

var fs = require('fs'),
    xml2js = require('xml2js');

var dirname = 'C:/Produccion/Talleres/talleres-v2-pemex/app/static/uploads/files/';

var Orden = function (conf) {
    this.conf = conf || {};

    this.view = new OrdenView();
    this.model = new OrdenModel({
        parameters: this.conf.parameters
    });

    this.response = function () {
        this[this.conf.funcionalidad](this.conf.req, this.conf.res, this.conf.next);
    }
}

//Obtiene las ordenes pendientes por cobrar
Orden.prototype.get_ordenesporcobrar = function (req, res, next) {
    var self = this;
    var params = [];

    this.model.query('SEL_ORDENES_POR_COBRAR_SP', params, function (error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
}

//Actualiza el estatus de una órden - cobrada
Orden.prototype.post_trabajocobrado = function (req, res, next) {
    //Objeto que almacena la respuesta
    var object = {};
    //Objeto que envía los parámetros
    var params = {};
    //Referencia a la clase para callback
    var self = this;

    var params = [{
        name: 'idTrabajo',
        value: req.body.idTrabajo,
        type: self.model.types.INT
        }];

    this.model.post('INS_TRABAJO_CONCLUIDO_SP', params, function (error, result) {
        //Callback
        object.error = error;
        object.result = result;

        self.view.expositor(res, object);
    });
}

//Devuelve los trabajos cobrados y listos para facturar
Orden.prototype.get_prefacturas = function (req, res, next) {
    var self = this;
    var params = [];

    this.model.query('SEL_TRABAJOS_COBRADOS_SP', params, function (error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
}

//Genera el TXT de un trabajo cobrado
Orden.prototype.get_generaTxtFactura = function (req, res, next) {
    //Objeto que almacena la respuesta
    var object = {};
    //Referencia a la clase para callback
    var self = this;
    //Objeto que envía los parámetros
    var paramsTipoOrden = [{
        name: 'idTrabajo',
        value: req.query.idTrabajo,
        type: self.model.types.INT
        }];

    //Identifica el tipo de orden de servicio 
    self.model.query('SEL_TIPO_ORDEN_SERVICIO_SP', paramsTipoOrden, function (error, result) {
        //Callback
        object.error = error;
        object.result = result;
        if(result.length > 0) {
        if (result[0].tipoOrdenServicio == 'SER') {
            fs = require('fs');
            var path = 'sth';
            fs.stat(path, function (err, stat) {
                if (err) {
                    if ('ENOENT' == err.code) {
                        //file did'nt exist so for example send 404 to client
                    } else {
                        //it is a server error so for example send 500 to client
                    }
                } else {
                    //every thing was ok so for example you can read it and send it to client
                }
            });
                var directorioFactura = dirname + req.query.idTrabajo + '/documentos';
                var files = fs.readdirSync(directorioFactura);
                var fecha, numFactura, uuid, nombreXml;

                files.forEach(function (file) {
                    var extension = obtenerExtArchivo(file);
                    if (extension == '.xml' || extension == '.XML') {
                        var parser = new xml2js.Parser();
                        fs.readFile(directorioFactura + '/' + file, function (err, data) {
                            parser.parseString(data, function (err, result) {
                                fecha = result['cfdi:Comprobante'].$['fecha'];
                                if (result['cfdi:Comprobante'].$['serie'] == undefined || result['cfdi:Comprobante'].$['serie'] == '') {
                                    numFactura = result['cfdi:Comprobante'].$['folio'];
                                } else {
                                    numFactura = result['cfdi:Comprobante'].$['serie'] + result['cfdi:Comprobante'].$['folio'];
                                }
                                uuid = result['cfdi:Comprobante']['cfdi:Complemento'][0]['tfd:TimbreFiscalDigital'][0].$['UUID'];
                                var nombreXml = file;

                                console.log('Fecha: ' + fecha);
                                console.log('Factura: ' + numFactura);
                                console.log('UUID: ' + uuid);
                                console.log('Nombre Xml: ' + nombreXml);
                                console.log('=========================')

                                var paramsSER = [{
                                        name: 'idTrabajo',
                                        value: req.query.idTrabajo,
                                        type: self.model.types.INT
                                                },
                                    {
                                        name: 'fecha',
                                        value: fecha,
                                        type: self.model.types.STRING
                                                },
                                    {
                                        name: 'numFactura',
                                        value: numFactura,
                                        type: self.model.types.STRING
                                                },
                                    {
                                        name: 'UUID',
                                        value: uuid,
                                        type: self.model.types.STRING
                                                },
                                    {
                                        name: 'XML',
                                        value: nombreXml,
                                        type: self.model.types.STRING
                                    }];
                                getDatosFactura(res,self,'SEL_FACTURA_TXT_SP', paramsSER);
                            });
                        });
                    }
                });
                console.log(result[0].tipoOrdenServicio);
            } else if(result[0].tipoOrdenServicio == 'REF') {
                getDatosFactura(res,self,'SEL_FACTURA_TXT_SP', paramsTipoOrden);
                console.log(result[0].tipoOrdenServicio);
            }
            else{
                res.end('');
            }
        }
    });
};   

//Obtiene datos factura y generar el txt
function getDatosFactura(res, self, stored, params) {
    //Objeto que almacena la respuesta
    var object = {};
    self.model.query(stored, params, function (error, result) {
        if (result.length > 0) {
            self.model.query('SEL_FACTURA_TXT_SP', params, function (error, result) {
                //Callback
                object.error = error;
                object.result = result;

                var wstream = fs.createWriteStream('C:/Produccion/Talleres/talleres-v2-pemex/app/static/facturas/factura-'+ result[0].numeroTrabajo + '.txt', 'utf8');
                if (wstream) {
                    var carrito = '';
                    var lineToInsert = '';
                    for (var i = 0; i < result.length; i++) {                
                        lineToInsert = result[i].dato.replace(/[^a-zA-Z0-9| ./-]/g, ' ');
                        carrito = (result.length - i) == 1 ? '' : '\r\n';
                        wstream.write(lineToInsert + carrito);
                    }
                    wstream.end(function () {
                        console.log('done');
                    });
                }
                self.view.expositor(res, object);
            });
        }
    });
};

//Se obtiene la extensión del archivo
var obtenerExtArchivo = function (file) {
    return '.' + file.split('.').pop();
}

module.exports = Orden;