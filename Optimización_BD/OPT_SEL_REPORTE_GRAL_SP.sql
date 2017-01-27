
---Optimización del SP SEL_REPORTE_GRAL_SP 26/01/2017

CREATE STATISTICS [_dta_stat_1646628909_3_1_9_2_12] ON [dbo].[Cita]([idTaller], [idCita], [idEstatus], [idUnidad], [idTrasladoUnidad])

CREATE STATISTICS [_dta_stat_1646628909_9_1_12_11_3_2] ON [dbo].[Cita]([idEstatus], [idCita], [idTrasladoUnidad], [idEstadoAutotanque], [idTaller], [idUnidad])

CREATE STATISTICS [_dta_stat_1646628909_12_1] ON [dbo].[Cita]([idTrasladoUnidad], [idCita])

CREATE STATISTICS [_dta_stat_1646628909_1_2_9_12_11] ON [dbo].[Cita]([idCita], [idUnidad], [idEstatus], [idTrasladoUnidad], [idEstadoAutotanque])

CREATE STATISTICS [_dta_stat_1646628909_11_1_9] ON [dbo].[Cita]([idEstadoAutotanque], [idCita], [idEstatus])

CREATE STATISTICS [_dta_stat_357576312_4_3_2_5] ON [dbo].[HistorialProceso]([idProceso], [fecha], [idEstatus], [idTipoProceso])

CREATE STATISTICS [_dta_stat_357576312_5_4] ON [dbo].[HistorialProceso]([idTipoProceso], [idProceso])

CREATE NONCLUSTERED INDEX [_dta_index_HistorialProceso_7_357576312__K2_K5_K4_K3] ON [dbo].[HistorialProceso]
(
	[idEstatus] ASC,
	[idTipoProceso] ASC,
	[idProceso] ASC,
	[fecha] ASC
)WITH (SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF) ON [PRIMARY]

CREATE STATISTICS [_dta_stat_357576312_4_2_5] ON [dbo].[HistorialProceso]([idProceso], [idEstatus], [idTipoProceso])

CREATE STATISTICS [_dta_stat_795149878_3_4] ON [dbo].[OrdenFechaInicioRealServicio]([idTrabajo], [idDetalleFechaServicio])
