// -- =============================================
// -- Author:      Adolfo Marinez
// -- Create date: 22/08/2016
// -- Description: talleres controller
// -- =============================================
registrationModule.controller('tallerController', function($scope, alertFactory,tallerRepository){
	//this is the first method executed in the view
	$scope.init = function(){
    $scope.limpiaCasillasTaller();
	$scope.getrecuperaGAR();
	$scope.getrecuperaTipoUsuario();
	$scope.getrecuperaEstatus();
    $scope.getTaller();
	}

	$scope.getrecuperaGAR = function () {
              $scope.promise = tallerRepository.getTallerGar().then(function (gar) {
            $scope.tipoGar = gar.data;
        }, function (error) {
            alertFactory.error('Error al obtener los datos GAR');
        });
    }
        $scope.obtieneZona = function () {
        $scope.getrecuperaTAR($scope.idZona);
    }
    $scope.getrecuperaTAR = function () {
        tallerRepository.getTallerTar($scope.idZona).then(function (tar) {
            $scope.tipoTar = tar.data;

        }, function (error) {
            alertFactory.error('Error al obtener los datos TAR');
        });
    }
    $scope.getrecuperaTipoUsuario = function () {
              $scope.promise = tallerRepository.getTallerTipoUsuario().then(function (tipoUsuario) {
            $scope.tipoUsuario = tipoUsuario.data;
        }, function (error) {
            alertFactory.error('Error al obtener los datos Usuario');
        });
    }
    $scope.getrecuperaEstatus = function () {
              $scope.promise = tallerRepository.getTallerEstatus().then(function (estatus) {
            $scope.estatus = estatus.data;
        }, function (error) {
            alertFactory.error('Error al obtener los datos Estatus');
        });
    }

     $scope.getTaller = function () {
        $scope.promise = tallerRepository.getTallerInformation().then(function (tallerInfo) {
            $scope.talleres = tallerInfo.data;
             setTimeout(function () {
                     $('.dataTableTaller').DataTable({
                                dom: '<"html5buttons"B>lTfgitp',
                                buttons: [
                                    {
                                        extend: 'copy'
                                    },
                                    {
                                        extend: 'csv'
                                    },
                                    {
                                        extend: 'excel',
                                        title: 'ReporteGeneral'
                                    },
                                    {
                                        extend: 'pdf',
                                        title: 'ReporteGeneral'
                                    },

                                    {
                                        extend: 'print',
                                        customize: function (win) {
                                            $(win.document.body).addClass('white-bg');
                                            $(win.document.body).css('font-size', '10px');

                                            $(win.document.body).find('table')
                                                .addClass('compact')
                                                .css('font-size', 'inherit');
                                        }
                            }
                        ]
                            });
                        }, 1000);
        }, function (error) {
            alertFactory.error('Error al obtener los datos');
        });
    }
    
    $scope.editaTaller = function () {
        location.href = '/administraciontaller';
    }
    $scope.nuevoTaller = function () {
        location.href = '/administraciontaller';
    }

     $('.clockpicker').clockpicker();

        $('#fechaTrabajo .input-group.date').datepicker({
        todayBtn: "linked",
        keyboardNavigation: true,
        forceParse: false,
        calendarWeeks: true,
        autoclose: true,
        todayHighlight: true
    });

    $scope.insertaTaller = function () {
       // if($scope.idZona!='' && $scope.nombreTar != ''){
var insertTaller = {};
insertTaller.zona = $scope.idZona;
insertTaller.gar = $scope.nombreTar.GAR;
insertTaller.tad = $scope.nombreTar.nombreTar;
insertTaller.ciudad = $scope.ciudad;
insertTaller.razonSocial = $scope.razonSocial;
insertTaller.encargado = $scope.encargado;
insertTaller.rfc = $scope.rfc;
insertTaller.tipo = $scope.idTipoPersona;
insertTaller.telefono = $scope.telefono;
insertTaller.email = $scope.email;
insertTaller.pais = $scope.pais;
insertTaller.estado = $scope.estado;
insertTaller.delegacion = $scope.delegacion;
insertTaller.colonia = $scope.colonia;
insertTaller.calle = $scope.calle;
insertTaller.numeroExt = $scope.numeroExterior;
insertTaller.codPostal = $scope.codigoPostal;
insertTaller.cveusu = $scope.claveUsuario;
insertTaller.status = $scope.idStatusTaller;
insertTaller.lada = $scope.lada;
insertTaller.idTar = $scope.nombreTar.idTAR;
insertTaller.idProveedor = $scope.idProveedor;
tallerRepository.addTaller(insertTaller).then(function (taller) {
                    if(taller.data[0].id > 0){
                        alertFactory.success("Taller insertado satisfactoriamente"); 
                        setTimeout(function () {    
                            location.href = '/acciontaller'                
                        }, 1000);
                    }
                },function(error){
                    alertFactory.error("Error al insertar el taller");
                });
//}else{
//   alertFactory.error('Debes llenar todos los campos');  
//   $scope.limpiaCasillasTaller();
//}
}

$scope.limpiaCasillasTaller = function () {
$scope.idZona = '';
$scope.nombreTar = '';
$scope.ciudad = '';
$scope.razonSocial = '';
$scope.encargado = '';
$scope.rfc = '';
$scope.descripcionUsuario = '';
$scope.telefono = '';
$scope.email = '';
$scope.pais = '';
$scope.estado = '';
$scope.delegacion = '';
$scope.colonia = '';
$scope.calle = '';
$scope.numeroExterior = '';
$scope.codigoPostal = '';
$scope.claveUsuario = '';
$scope.descripcionLarga = '';
$scope.lada = '';
$scope.idTar = '';
$scope.idProveedor = '';
}


$scope.openEliminaTallerModal = function (idTaller) {
   $('.btnEliminarTaller').ready(function () {
           swal({
                   title: "¿Esta seguro que desea eliminar el taller?",
                   /*text: "Se cambiará el estatus a 'Cita Cancelada'",*/
                   type: "warning",
                   showCancelButton: true,
                   confirmButtonColor: "#65BD10 ",
                   confirmButtonText: "Si",
                   cancelButtonText: "No",
                   closeOnConfirm: false,
                   closeOnCancel: false
               },
               function (isConfirm) {
                   if (isConfirm) {
                       tallerRepository.putEliminaTaller(idTaller).then(function (result) {
                           if (result.data.lenght > 0) {
                               swal("Taller eliminado!", "success");
                           }
                       }, function (error) {
                           swal("No se pudo eliminar el taller", "error");
                       });
                       swal("Taller eliminado!", "success");
                   } else {
                       swal("Acción cancelada", "", "error");
                       $('#openEliminaTallerModal').modal('hide');
                   }
               });
       });
}

});


