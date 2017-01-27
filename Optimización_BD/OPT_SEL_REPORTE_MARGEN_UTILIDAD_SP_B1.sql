---Optimización sel SP [SEL_REPORTE_MARGEN_UTILIDAD_SP]_B1 26/01/2017

CREATE STATISTICS [_dta_stat_1646628909_2_10] ON [dbo].[Cita]([idUnidad], [idTipoCita])

CREATE STATISTICS [_dta_stat_1646628909_3_10_13] ON [dbo].[Cita]([idTaller], [idTipoCita], [idCliente])

CREATE STATISTICS [_dta_stat_1646628909_13_2_3_10] ON [dbo].[Cita]([idCliente], [idUnidad], [idTaller], [idTipoCita])

CREATE STATISTICS [_dta_stat_1646628909_1_10_13_2] ON [dbo].[Cita]([idCita], [idTipoCita], [idCliente], [idUnidad])

CREATE STATISTICS [_dta_stat_1646628909_10_13_2_3_1] ON [dbo].[Cita]([idTipoCita], [idCliente], [idUnidad], [idTaller], [idCita])

CREATE STATISTICS [_dta_stat_197575742_7_2_4_5] ON [dbo].[CotizacionDetalle]([idEstatus], [idCotizacion], [idElemento], [precio])

CREATE STATISTICS [_dta_stat_197575742_7_5_4] ON [dbo].[CotizacionDetalle]([idEstatus], [precio], [idElemento])

CREATE STATISTICS [_dta_stat_197575742_2_7_5] ON [dbo].[CotizacionDetalle]([idCotizacion], [idEstatus], [precio])

CREATE STATISTICS [_dta_stat_197575742_5_2_4] ON [dbo].[CotizacionDetalle]([precio], [idCotizacion], [idElemento])

CREATE STATISTICS [_dta_stat_453576654_5_1_2] ON [dbo].[ItemPrecioCliente]([idItemCliente], [idItemPrecioCliente], [idListaPrecioCliente])

CREATE STATISTICS [_dta_stat_453576654_2_1] ON [dbo].[ItemPrecioCliente]([idListaPrecioCliente], [idItemPrecioCliente])

CREATE NONCLUSTERED INDEX [_dta_index_ItemPrecioCliente_7_453576654__K2_K5_K1_3] ON [dbo].[ItemPrecioCliente]
(
	[idListaPrecioCliente] ASC,
	[idItemCliente] ASC,
	[idItemPrecioCliente] ASC
)
INCLUDE ( 	[precioCliente]) WITH (SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF) ON [PRIMARY]
