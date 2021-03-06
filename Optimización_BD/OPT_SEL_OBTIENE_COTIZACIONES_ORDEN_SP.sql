---Optimización sel SP [SEL_OBTIENE_COTIZACIONES_ORDEN_SP] 26/01/2017
USE [talleres]
GO
/****** Object:  StoredProcedure [dbo].[SEL_OBTIENE_COTIZACIONES_ORDEN_SP]    Script Date: 25/01/2017 17:09:09 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/* ======================================================================================
	AUTOR:  VLADIMIR JUAREZ JUAREZ
	FECHA: 08/09/2016
	FECHA MOD:
*/
ALTER PROC [dbo].[SEL_OBTIENE_COTIZACIONES_ORDEN_SP]  --[SEL_OBTIENE_COTIZACIONES_ORDEN_SP] 458
@idTrabajo NUMERIC(18,0)
AS
BEGIN
	
	SELECT fechaOrden = CONVERT(VARCHAR,C.fecha, 103), 
		   T.idTrabajo, 
		   T.numeroTrabajo,								
		   T.idEstatus estatusTrabajo,
		   CM.idCotizacion,								
		   CM.numeroCotizacion,							
		   existeAnticipo = ISNULL(OA.idCotizacion,0),	
		   existeProveedor = ISNULL(TL2.idProveedor,0),	
		   --idProveedor = ISNULL(TL.idProveedor,57), 
		   subTotal = SUM(CD.cantidad*CD.precio),	     
		   SUM(CD.cantidad*CD.precio) + SUM((CD.cantidad*CD.precio) * .16) Total  
	FROM Cita c
	--JOIN Taller TL ON TL.idTaller = C.idTaller
	JOIN Trabajo T ON T.idCita = C.idCita
	JOIN CotizacionMaestro CM ON CM.idTrabajo = T.idTrabajo
	LEFT JOIN Taller TL2 ON TL2.idTaller = CM.idTaller
	LEFT JOIN OrdenAnticipo OA ON OA.idCotizacion = CM.idCotizacion
	LEFT JOIN [192.168.20.31].[GAAutoExpress].[dbo].[ADE_ORDANTICIPO] OAS ON OAS.OAN_IDENT = OA.idAnticipo
	JOIN CotizacionDetalle CD ON CD.idCotizacion = CM.idCotizacion
	WHERE T.idTrabajo = @idTrabajo
		  AND 
		  CM.idEstatus = 9
		  AND CD.idEstatus = 9
	GROUP BY C.fecha, T.idTrabajo, T.numeroTrabajo,T.idEstatus,CM.idCotizacion, CM.numeroCotizacion,OA.idCotizacion,TL2.idProveedor
END
