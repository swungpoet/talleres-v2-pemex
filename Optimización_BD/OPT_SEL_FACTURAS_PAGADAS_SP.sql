---Optimización sel SP [SEL_FACTURAS_PAGADAS_SP] 25/01/2017

CREATE STATISTICS [_dta_stat_1646628909_2_13_3_1] ON [dbo].[Cita]([idUnidad], [idCliente], [idTaller], [idCita])

CREATE STATISTICS [_dta_stat_1646628909_13_3_1] ON [dbo].[Cita]([idCliente], [idTaller], [idCita])

CREATE NONCLUSTERED INDEX [_dta_index_CotizacionDetalle_7_197575742__K2_K4_6] ON [dbo].[CotizacionDetalle]
(
	[idCotizacion] ASC,
	[idElemento] ASC
)
INCLUDE ( 	[cantidad]) WITH (SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF) ON [PRIMARY]

SET ANSI_PADDING ON

CREATE NONCLUSTERED INDEX [_dta_index_CotizacionMaestro_7_229575856__K1_K5_2] ON [dbo].[CotizacionMaestro]
(
	[idCotizacion] ASC,
	[idTrabajo] ASC
)
INCLUDE ( 	[numeroCotizacion]) WITH (SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF) ON [PRIMARY]

CREATE STATISTICS [_dta_stat_224719853_3_1] ON [dbo].[DatosCopade]([total], [idDatosCopade])
