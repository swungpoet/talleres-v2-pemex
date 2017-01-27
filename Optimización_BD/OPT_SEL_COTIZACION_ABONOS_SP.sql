---Optimización sel SP [SEL_COTIZACION_ABONADOS_SP] 25/01/2017

SET ANSI_PADDING ON

CREATE NONCLUSTERED INDEX [_dta_index_Cita_7_1646628909__K1_K13_K2_K8_5] ON [dbo].[Cita]
(
	[idCita] ASC,
	[idCliente] ASC,
	[idUnidad] ASC,
	[fechaIngresoUnidad] ASC
)
INCLUDE ( 	[trabajo]) WITH (SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF) ON [PRIMARY]


CREATE STATISTICS [_dta_stat_229575856_9_1_5] ON [dbo].[CotizacionMaestro]([idTaller], [idCotizacion], [idTrabajo])

CREATE STATISTICS [_dta_stat_2107154552_3_6] ON [dbo].[FacturaCotizacion]([numFactura], [total])

SET ANSI_PADDING ON

CREATE NONCLUSTERED INDEX [_dta_index_FacturaCotizacion_7_2107154552__K2_K3_K6] ON [dbo].[FacturaCotizacion]
(
	[idCotizacion] ASC,
	[numFactura] ASC,
	[total] ASC
)WITH (SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF) ON [PRIMARY]

CREATE NONCLUSTERED INDEX [_dta_index_ItemPrecioCliente_7_453576654__K5_3] ON [dbo].[ItemPrecioCliente]
(
	[idItemCliente] ASC
)
INCLUDE ( 	[precioCliente]) WITH (SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF) ON [PRIMARY]


CREATE STATISTICS [_dta_stat_631673298_1_5] ON [dbo].[Taller]([idTaller], [razonSocial])

SET ANSI_PADDING ON

CREATE NONCLUSTERED INDEX [_dta_index_Taller_7_631673298__K5_1] ON [dbo].[Taller]
(
	[razonSocial] ASC
)
INCLUDE ( 	[idTaller]) WITH (SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF) ON [PRIMARY]


CREATE NONCLUSTERED INDEX [_dta_index_Trabajo_7_1109578991__K5_K1_2_3_4] ON [dbo].[Trabajo]
(
	[idCita] ASC,
	[idTrabajo] ASC
)
INCLUDE ( 	[numeroTrabajo],
	[fechaInicio],
	[fechaFin]) WITH (SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF) ON [PRIMARY]

	CREATE STATISTICS [_dta_stat_1054626800_3_1] ON [dbo].[Unidad]([numEconomico], [idUnidad])
