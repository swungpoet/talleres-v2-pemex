registrationModule.controller('comprobanteRecepcionController', function ($scope, $route, $modal, $rootScope, localStorageService, alertFactory, globalFactory, citaRepository, ordenServicioRepository, cotizacionRepository, trabajoRepository, uploadRepository) {

	
	$scope.init = function(){
		$scope.infoCita=localStorageService.get('cita');
		$scope.show_exteriores=true;
		$scope.show_interiores=false;
		$scope.show_accesorios=false;
		$scope.show_componentes=false;
		$scope.show_documentos=false;
		$scope.show_tablero=false;
		$scope.show_unidad=false;
		$scope.ubi_Delantera=false;
		$scope.ubi_Trasera=false;
		$scope.ubi_ParteDerecha=false;
		$scope.ubi_ParteIzquierda=false;
		$scope.ubi_Techo=false;
		
	}  

	$scope.menu = function(data){
		$scope.show_exteriores=false;
		$scope.show_interiores=false;
		$scope.show_accesorios=false;
		$scope.show_componentes=false;
		$scope.show_documentos=false;
		$scope.show_tablero=false;
		$scope.show_unidad=false;

		switch(data)
        {
              case 0:
                $scope.show_exteriores=true;
              break;

              case 1:
                $scope.show_interiores=true;
              break;

              case 2:
                $scope.show_accesorios=true;
              break;

              case 3:
                $scope.show_componentes=true;
              break;

              case 4:
                $scope.show_documentos=true;
              break;

              case 5:
                $scope.show_tablero=true;
              break;

              case 6:
                $scope.show_unidad=true;
              break;

              
        }  
	}


	$scope.addComprobanteRecepcion = function () {
	
		var data = {};
		if (!$scope.acepta) {
			alertFactory.info("Debe Aceptar las Condiciones.");
		}else{
			data.ext_Claxon=$scope.ext_Claxon;
			data.ext_TaponGasolina=$scope.ext_TaponGasolina;
			data.ext_TaponLlantas=$scope.ext_TaponLlantas;
			data.ext_FarosDelanteros=$scope.ext_FarosDelanteros;
			data.ext_Antena=$scope.ext_Antena;
			data.ext_Emblemas=$scope.ext_Emblemas;
			data.ext_Cristales=$scope.ext_Cristales;
			data.int_EspejoRetrovisor=$scope.int_EspejoRetrovisor;
			data.int_Radio=$scope.int_Radio;
			data.int_CinturonSeguridad=$scope.int_CinturonSeguridad;
			data.int_ManijasSeguros=$scope.int_ManijasSeguros;
			data.int_Encendedor=$scope.int_Encendedor;
			data.int_Cenicero=$scope.int_Cenicero;
			data.int_Tapetes=$scope.int_Tapetes;
			data.int_Ac=$scope.int_Ac;
			data.int_Lector=$scope.int_Lector;
			data.int_BolsaAireDelantera=$scope.int_BolsaAireDelantera;
			data.int_BolsaAireLateral=$scope.int_BolsaAireLateral;
			data.int_Usb=$scope.int_Usb;
			data.int_LlavesUnidad=$scope.int_LlavesUnidad;
			data.acs_Gato=$scope.acs_Gato;
			data.acs_ManeralGato=$scope.acs_ManeralGato;
			data.acs_LlaveRuedas=$scope.acs_LlaveRuedas;
			data.acs_Reflejantes=$scope.acs_Reflejantes;
			data.acs_Extintor=$scope.acs_Extintor;
			data.acs_LlantaRefaccion=$scope.acs_LlantaRefaccion;
			data.acs_CableCorriente=$scope.acs_CableCorriente;
			data.acs_PeliculaAntiasalto=$scope.acs_PeliculaAntiasalto;
			data.acs_BirlosTuercas=$scope.acs_BirlosTuercas;
			data.acs_ProteccionEspejoLateral=$scope.acs_ProteccionEspejoLateral;
			data.acs_Gps=$scope.acs_Gps;
			data.com_TaponAceite=$scope.com_TaponAceite;
			data.com_TaponRadiador=$scope.com_TaponRadiador;
			data.com_VarillaAceite=$scope.com_VarillaAceite;
			data.com_Bateria=$scope.com_Bateria;
			data.com_TaponMotor=$scope.com_TaponMotor;
			data.doc_PolizaSeguro=$scope.doc_PolizaSeguro;
			data.doc_TarjetaCirculacion=$scope.doc_TarjetaCirculacion;
			data.doc_Engomado=$scope.doc_Engomado;
			data.doc_Verificacion=$scope.doc_Verificacion;
			data.doc_ManualesUnidad=$scope.doc_ManualesUnidad;
			data.doc_PermisoProvisional=$scope.doc_PermisoProvisional;
			data.tab_Descripcion=$scope.tab_Descripcion;
			data.tab_Odometro=$scope.tab_Odometro;
			data.ubi_DelanteraDesc=$scope.ubi_DelanteraDesc;
			data.ubi_TraseraDesc=$scope.ubi_TraseraDesc;
			data.ubi_ParteDerechaDesc=$scope.ubi_ParteDerechaDesc;
			data.ubi_ParteIzquierdaDesc=$scope.ubi_ParteIzquierdaDesc;
			data.ubi_TechoDesc=$scope.ubi_TechoDesc;
			data.aprobacion=1;
			data.idCita=$scope.infoCita.idCita;

			if ($scope.ubi_Techo) {
				data.ubi_Techo=1;
			}else{
				data.ubi_Techo=0;
			}

			if ($scope.ubi_Delantera) {
				data.ubi_Delantera=1;
			}else{
				data.ubi_Delantera=0;
			}

			if ($scope.ubi_Trasera) {
				data.ubi_Trasera=1;
			}else{
				data.ubi_Trasera=0;
			}

			if ($scope.ubi_ParteDerecha) {
				data.ubi_ParteDerecha=1;
			}else{
				data.ubi_ParteDerecha=0;
			}

			if ($scope.ubi_ParteIzquierda) {
				data.ubi_ParteIzquierda=1;
			}else{
				data.ubi_ParteIzquierda=0;
			}

			
			citaRepository.addComprobanteRecepcion(data).then(function (rest) {
				
	            if (rest.data[0].id > 0) {
	                alertFactory.success("Se insertó correctamente");
	                location.href = '/tallercita';
	            }else{
	            	 alertFactory.error("Error al insertar datos");
	            }
	            
	        }, function (error) {
	            alertFactory.error("Error al insertar datos");
	        });
	    }    
	}


	$scope.validateAprobacion = function(){
		
		if ($scope.ext_Claxon != undefined 
			&& $scope.ext_TaponGasolina != undefined 
			&& $scope.ext_TaponLlantas != undefined 
			&& $scope.ext_FarosDelanteros != undefined 
			&& $scope.ext_Antena != undefined 
			&& $scope.ext_Emblemas != undefined 
			&& $scope.ext_Cristales != undefined 
			&& $scope.int_EspejoRetrovisor != undefined 
			&& $scope.int_Radio != undefined 
			&& $scope.int_CinturonSeguridad != undefined 
			&& $scope.int_ManijasSeguros != undefined 
			&& $scope.int_Encendedor != undefined 
			&& $scope.int_Cenicero != undefined 
			&& $scope.int_Tapetes != undefined
			&& $scope.int_Ac != undefined
			&& $scope.int_Lector != undefined
			&& $scope.int_BolsaAireDelantera != undefined
			&& $scope.int_BolsaAireLateral != undefined
			&& $scope.int_Usb != undefined
			&& $scope.int_LlavesUnidad != undefined
			&& $scope.acs_Gato != undefined
			&& $scope.acs_ManeralGato != undefined
			&& $scope.acs_LlaveRuedas != undefined
			&& $scope.acs_Reflejantes != undefined
			&& $scope.acs_Extintor != undefined
			&& $scope.acs_LlantaRefaccion != undefined
			&& $scope.acs_CableCorriente != undefined
			&& $scope.acs_PeliculaAntiasalto != undefined
			&& $scope.acs_BirlosTuercas != undefined
			&& $scope.acs_ProteccionEspejoLateral != undefined
			&& $scope.acs_Gps != undefined
			&& $scope.com_TaponAceite != undefined
			&& $scope.com_TaponRadiador != undefined
			&& $scope.com_VarillaAceite != undefined
			&& $scope.com_Bateria != undefined
			&& $scope.com_TaponMotor != undefined
			&& $scope.doc_PolizaSeguro != undefined
			&& $scope.doc_TarjetaCirculacion != undefined
			&& $scope.doc_Engomado != undefined
			&& $scope.doc_Verificacion != undefined
			&& $scope.doc_ManualesUnidad != undefined
			&& $scope.doc_PermisoProvisional != undefined
			&& $scope.tab_Descripcion != undefined
			&& $scope.tab_Odometro != undefined) {
			return true;

		}else {
			return false;
		}	
	}




});
