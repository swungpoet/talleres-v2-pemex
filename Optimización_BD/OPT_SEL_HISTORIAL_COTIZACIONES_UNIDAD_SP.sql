---Optimización sel SP [SEL_HISTORIAL_COTIZACIONES_UNIDAD_SP] 25/01/2017

SET ANSI_PADDING ON

CREATE NONCLUSTERED INDEX [_dta_index_Cita_7_1646628909__K2_K1_K3_K13_4_5] ON [dbo].[Cita]
(
	[idUnidad] ASC,
	[idCita] ASC,
	[idTaller] ASC,
	[idCliente] ASC
)
INCLUDE ( 	[fecha],
	[trabajo]) WITH (SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF) ON [PRIMARY]

SET ANSI_PADDING ON

CREATE NONCLUSTERED INDEX [_dta_index_CotizacionMaestro_7_229575856__K7_K5_K1_2_4] ON [dbo].[CotizacionMaestro]
(
	[idEstatus] ASC,
	[idTrabajo] ASC,
	[idCotizacion] ASC
)
INCLUDE ( 	[numeroCotizacion],
	[fecha]) WITH (SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF) ON [PRIMARY]
