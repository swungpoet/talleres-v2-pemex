---Optimización sel SP [SEL_OBTIENE_COTIZACIONES_APROBADO_ORDEN_SP] 27/01/2017

CREATE STATISTICS [_dta_stat_1646628909_4_1] ON [dbo].[Cita]([fecha], [idCita])


CREATE STATISTICS [_dta_stat_229575856_1_9_7] ON [dbo].[CotizacionMaestro]([idCotizacion], [idTaller], [idEstatus])


SET ANSI_PADDING ON

CREATE NONCLUSTERED INDEX [_dta_index_CotizacionMaestro_7_229575856__K5_K7_K1_K9_2] ON [dbo].[CotizacionMaestro]
(
	[idTrabajo] ASC,
	[idEstatus] ASC,
	[idCotizacion] ASC,
	[idTaller] ASC
)
INCLUDE ( 	[numeroCotizacion]) WITH (SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF) ON [PRIMARY]


CREATE NONCLUSTERED INDEX [_dta_index_Item_7_462624691__K1_K12] ON [dbo].[Item]
(
	[idItem] ASC,
	[idTipoRestriccion] ASC
)WITH (SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF) ON [PRIMARY]





