---Optimización sel SP [SEL_ESTATUS_COTIZACION_SP] 26/01/2017
USE [talleres]
GO
/****** Object:  StoredProcedure [dbo].[SEL_ESTATUS_COTIZACION_SP]    Script Date: 26/01/2017 10:07:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- ==========================================================================================
-- Author:		Anel Candi Pérez Pérez
-- Create date: 10/11/2016
-- [SEL_ESTATUS_COTIZACION_SP] 11
-- ==========================================================================================

ALTER PROC [dbo].[SEL_ESTATUS_COTIZACION_SP]
	@idTrabajo NUMERIC(18,0)
AS
BEGIN

	SELECT count(CD.idEstatus)as estatus
		FROM CotizacionMaestro CM INNER JOIN CotizacionDetalle CD ON CM.idCotizacion= CD.idCotizacion
		WHERE CM.idTrabajo = @idTrabajo AND CD.idEstatus IN (8,25)
	
END