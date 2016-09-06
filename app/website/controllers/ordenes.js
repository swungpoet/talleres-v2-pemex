var OrdenView = require('../views/ejemploVista'),
    OrdenModel = require('../models/dataAccess2');

var mkdirp = require('mkdirp');
var fs = require('fs'),
    xml2js = require('xml2js');


var dirname = 'C:/Produccion/Talleres/talleres-v2-pemex/app/static/uploads/files/';
var dirCopades = 'C:/Produccion/Talleres/talleres-v2-pemex/app/static/uploads/copades/';


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
    var params = [{
        name: 'monto',
        value: req.query.monto,
        type: self.model.types.INT
        }];

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
        },
        {
            name: 'idDatosCopade',
            value: req.body.idDatosCopade,
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
        if (result.length > 0) {
            if (result[0].tipoOrdenServicio == 'SER') {
                var directorioFactura = dirname + req.query.idTrabajo + '/documentos/factura';
                var files = fs.readdirSync(directorioFactura);
                var fecha, numFactura, uuid, nombreXml, totalFactura;

                var existeFacturaXML = files.some(checkExistsXML);
                if (existeFacturaXML) {
                    files.forEach(function (file) {
                        var extension = obtenerExtArchivo(file);
                        if (extension == '.xml' || extension == '.XML') {
                            if (file.includes('Factura')) {
                                var parser = new xml2js.Parser();
                                fs.readFile(directorioFactura + '/' + file, function (err, data) {
                                    parser.parseString(data, function (err, result) {
                                        fecha = result['cfdi:Comprobante'].$['fecha'];
                                        if ((result['cfdi:Comprobante'].$['serie'] == undefined || result['cfdi:Comprobante'].$['serie'] == '') &&
                                            (result['cfdi:Comprobante'].$['folio'] == undefined ||
                                                result['cfdi:Comprobante'].$['folio'] == ''
                                            )) {
                                            numFactura = result['cfdi:Comprobante']['cfdi:Complemento'][0]['tfd:TimbreFiscalDigital'][0].$['UUID'];
                                        } else if (result['cfdi:Comprobante'].$['serie'] == undefined || result['cfdi:Comprobante'].$['serie'] == '') {
                                            numFactura = result['cfdi:Comprobante'].$['folio'];
                                        } else {
                                            numFactura = result['cfdi:Comprobante'].$['serie'] + result['cfdi:Comprobante'].$['folio'];
                                        }
                                        uuid = result['cfdi:Comprobante']['cfdi:Complemento'][0]['tfd:TimbreFiscalDigital'][0].$['UUID'];

                                        totalFactura = result['cfdi:Comprobante'].$['total'];
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
                                            },
                                            {
                                                name: 'totalFactura',
                                                value: totalFactura,
                                                type: self.model.types.DECIMAL
                                            }
                                        ];
                                        getDatosFactura(res, self, 'SEL_FACTURA_TXT_SP', paramsSER);
                                    });
                                });
                            }
                        }
                    });
                } else {
                    res.end('');
                }
                console.log(result[0].tipoOrdenServicio);
            } else if (result[0].tipoOrdenServicio == 'REF') {
                getDatosFactura(res, self, 'SEL_FACTURA_TXT_SP', paramsTipoOrden);
                console.log(result[0].tipoOrdenServicio);
            }
        } else {
            res.end('');
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

                var wstream = fs.createWriteStream('C:/Produccion/Talleres/talleres-v2-pemex/app/static/facturas/factura-' + result[0].numeroTrabajo + '.txt', 'utf8');
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

//valida si existe al menos un archivo xml
function checkExistsXML(file) {
    return file.split('.').pop() === 'xml' || file.split('.').pop() === 'XML';
}

//URIEL
//Obtiene las copades que aún no han sido asignadas
Orden.prototype.get_copades = function (req, res, next) {
    var self = this;
    var params = [];

    this.model.query('SEL_COPADES_SP', params, function (error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
}

//Lee la copade xml, y devuelve todo en un Array para después almacenarlos en bd

Orden.prototype.post_generaDatosCopade = function (req, res, next) {  //Objeto que almacena la respuesta
      
    var object = {};   //Objeto que envía los parámetros
      
    var params = [];   //Referencia a la clase para callback
      
    var self = this;

      
    var nombreArchivos = [];
    nombreArchivos = req.body.archivos;  
    var subTotal, numeroEconomico, numeroEstimacion, ordenSurtimiento, numeroCopade, fechaRecepcionCopade = req.body.fechaRecepcionCopade;  
    var objCopade = [];
    var paramValuesCopade = [];

      
    nombreArchivos.forEach(function (file, i) {    
        var extension = obtenerExtArchivo(file);    
        if (extension == '.xml' || extension == '.XML') {      
            var parser = new xml2js.Parser();

                  
            fs.readFile(dirCopades + file, function (err, data) {        
                parser.parseString(data, function (err, lector) {          
                    subTotal = lector['PreFactura']['Comprobante'][0].$['subtotal'];          
                    numeroEstimacion = lector['PreFactura']['cfdi:Addenda'][0]['pm:Addenda_Pemex'][0]['pm:N_ESTIMACION'][0];          
                    ordenSurtimiento = lector['PreFactura']['cfdi:Addenda'][0]['pm:Addenda_Pemex'][0]['pm:O_SURTIMIENTO'][0]; 
                    numeroCopade = lector['PreFactura']['cfdi:Addenda'][0]['pm:Addenda_Pemex'][0]['pm:ENTRADA'][0];                   
                    objCopade = {            
                        subTotal: subTotal,
                        numeroEstimacion: numeroEstimacion,
                        ordenSurtimiento: ordenSurtimiento,
                        numeroCopade:numeroCopade,
                        nombreCopade: file,
                        fechaRecepcionCopade: fechaRecepcionCopade          
                    };                    

                    paramValuesCopade.push(objCopade);       
                    if ((nombreArchivos.length - i) == 1) {            
                        object.error = err;            
                        object.result = paramValuesCopade;            
                        self.view.expositor(res, object);
                        nombreArchivos = [];
                        paramValuesCopade = [];          
                    } 
                });      
            });    
        }  
    });
}

Orden.prototype.get_getCoincidenciaMejor = function (req, res, next) {
    var self = this;
    var params = [{
            name: 'folio',
            value: req.query.folio,
            type: self.model.types.STRING
        },
        {
            name: 'monto',
            value: req.query.monto,
            type: self.model.types.INT
        }];

    this.model.query('SEL_MEJOR_COINCIDENCIA_SP', params, function (error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
}

//obtiene todas las órdenes de servicio que no están canceladas, pero están auntorizadas
Orden.prototype.get_getadmonordenes = function (req, res, next) {
    var self = this;
    var params = [{
        name: 'numeroTrabajo',
        value: req.query.numeroTrabajo,
        type: self.model.types.STRING
        }];

    this.model.query('SEL_ADMINISTRACION_ORDENES_SP', params, function (error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
}

//Inserta los datos de la copade en bd
Orden.prototype.post_insertaDatosCopade = function (req, res, next) { 
    //Objeto que almacena la respuesta
    var object = {};
    //Objeto que envía los parámetros
    var params = {};
    //Referencia a la clase para callback
    var self = this;

    var params = [
        {
            name: 'subTotal',
            value: req.body[0].subTotal,
            type: self.model.types.DECIMAL
        },
        {
            name: 'numeroEstimacion',
            value: req.body[0].numeroEstimacion,
            type: self.model.types.STRING
        },
        {
            name: 'ordenSurtimiento',
            value: req.body[0].ordenSurtimiento,
            type: self.model.types.STRING
        },
        {
            name: 'nombreCopade',
            value: req.body[0].nombreCopade,
            type: self.model.types.STRING
        },
        {
            name: 'fechaRecepcionCopade',
            value: req.body[0].fechaRecepcionCopade,
            type: self.model.types.STRING
        },
        {
            name: 'numeroCopade',
            value: req.body[0].numeroCopade,
            type: self.model.types.STRING
        }
    ];

    this.model.post('INS_DATOS_COPADE_SP', params, function (error, result) {
        //Callback
        object.error = error;
        object.result = result;

        self.view.expositor(res, object);
    });
}

//Actualiza el precio de una partida desde la orden de servicio
Orden.prototype.post_precioEditado = function (req, res, next) {
    //Objeto que almacena la respuesta
    var object = {};
    //Objeto que envía los parámetros
    var params = {};
    //Referencia a la clase para callback
    var self = this;

    var params = [
        {
            name: 'idCotizacion',
            value: req.body.idCotizacion,
            type: self.model.types.INT
        },
        {
            name: 'idPartida',
            value: req.body.idPartida,
            type: self.model.types.INT
        },
        {
            name: 'nuevoPrecio',
            value: req.body.nuevoPrecio,
            type: self.model.types.DECIMAL
        },
    ];

    this.model.post('UPD_PRECIO_PARTIDA_SP', params, function (error, result) {
        //Callback
        object.error = error;
        object.result = result;

        self.view.expositor(res, object);
    });
}

//Renombra el nombre de la copade con su identity 
Orden.prototype.post_cambiaNombreCopade = function (req, res, next) {
    //Objeto que almacena la respuesta
    var object = {};
    //Objeto que envía los parámetros
    var params = {};
    //Referencia a la clase para callback
    var self = this;

    var nombreArchivos = req.body.nombreCopade;
    var identificador = req.body.idCopade[0].id;

    nombreArchivos.forEach(function (nombre) {
        var extension = obtenerExtArchivo(nombre);
        if (extension == '.pdf' || extension == '.PDF') {
            var modificacion = fs.renameSync(dirCopades + nombre, dirCopades + 'COPADE_' + identificador + extension);
        }
        if (extension == '.xml' || extension == '.XML') {
            var modificacion = fs.renameSync(dirCopades + nombre, dirCopades + 'COPADE_' + identificador + extension);
        }
    });

    object.error = null;            
    object.result = 1;            
    self.view.expositor(res, object);

}

//Quita la copade de la carpeta 'copades' y la pone en su respectiva orden de servicio 'idTrabajo/documentos/adendaCopade'
Orden.prototype.post_mueveCopade = function (req, res, next) {
    //Objeto que almacena la respuesta
    var object = {};
    //Objeto que envía los parámetros
    var params = {};
    //Referencia a la clase para callback
    var self = this;

    var idTrabajo = req.body.idTrabajo;
    var idCopade = req.body.idDatosCopade;

    var nombreXmlMinusculas = 'COPADE_' + idCopade + '.xml';
    var nombreXmlMayusculas = 'COPADE_' + idCopade + '.XML';
    var nombrePdfMinusculas = 'COPADE_' + idCopade + '.pdf';
    var nombrePdfMayusculas = 'COPADE_' + idCopade + '.PDF';
    var rutaDestino = dirname + idTrabajo + '/documentos/adendaCopade';

    if (!fs.existsSync(rutaDestino)) {
        fs.mkdirSync(rutaDestino);
    }

    if (fs.existsSync(dirCopades + nombreXmlMinusculas)) {
        fs.renameSync(dirCopades + nombreXmlMinusculas, rutaDestino + '/' + nombreXmlMinusculas);
    }
    if (fs.existsSync(dirCopades + nombreXmlMayusculas)) {
        fs.renameSync(dirCopades + nombreXmlMayusculas, rutaDestino + '/' + nombreXmlMayusculas);
    }
    if (fs.existsSync(dirCopades + nombrePdfMinusculas)) {
        fs.renameSync(dirCopades + nombrePdfMinusculas, rutaDestino + '/' + nombrePdfMinusculas);
    }
    if (fs.existsSync(dirCopades + nombrePdfMayusculas)) {
        fs.renameSync(dirCopades + nombrePdfMayusculas, rutaDestino + '/' + nombrePdfMayusculas);
    }

    //Callback
    object.error = null;
    object.result = 1;

    self.view.expositor(res, object);
}

//Obtiene las copades que aún no han sido asignadas
Orden.prototype.get_ordenesverificadas = function (req, res, next) {
    var self = this;
    var params = [];

    this.model.query('SEL_ORDEN_VERIFICADA_SP', params, function (error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
}

module.exports = Orden;