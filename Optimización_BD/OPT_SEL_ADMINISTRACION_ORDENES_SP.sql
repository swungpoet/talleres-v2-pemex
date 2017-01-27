---Optimización sel SP [SEL_ADMINISTRACION_ORDENES_SP] 26/01/2017

CREATE STATISTICS [_dta_stat_229575856_7_1_5_9] ON [dbo].[CotizacionMaestro]([idEstatus], [idCotizacion], [idTrabajo], [idTaller])

CREATE STATISTICS [_dta_stat_229575856_9_7_5] ON [dbo].[CotizacionMaestro]([idTaller], [idEstatus], [idTrabajo])

CREATE NONCLUSTERED INDEX [_dta_index_CotizacionMaestro_7_229575856__K7_K5_K9_1] ON [dbo].[CotizacionMaestro]
(
	[idEstatus] ASC,
	[idTrabajo] ASC,
	[idTaller] ASC
)
INCLUDE ( 	[idCotizacion]) WITH (SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF) ON [PRIMARY]

CREATE STATISTICS [_dta_stat_229575856_5_9] ON [dbo].[CotizacionMaestro]([idTrabajo], [idTaller])

CREATE STATISTICS [_dta_stat_1109578991_2_1] ON [dbo].[Trabajo]([numeroTrabajo], [idTrabajo])
