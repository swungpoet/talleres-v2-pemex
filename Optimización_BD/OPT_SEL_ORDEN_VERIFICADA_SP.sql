---Optimización sel SP [SEL_ORDEN_VERIFICADA_SP] 25/01/2017

CREATE STATISTICS [_dta_stat_1646628909_2_1_8] ON [dbo].[Cita]([idUnidad], [idCita], [fechaIngresoUnidad])

CREATE STATISTICS [_dta_stat_1646628909_2_1_13_8] ON [dbo].[Cita]([idUnidad], [idCita], [idCliente], [fechaIngresoUnidad])

CREATE NONCLUSTERED INDEX [_dta_index_Cita_7_1646628909__K1_2] ON [dbo].[Cita]
(
	[idCita] ASC
)
INCLUDE ( 	[idUnidad]) WITH (SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF) ON [PRIMARY]

CREATE STATISTICS [_dta_stat_820197972_6_3] ON [dbo].[ConsecutivoZona]([idTrabajo], [idOsur])

CREATE NONCLUSTERED INDEX [_dta_index_ConsecutivoZona_7_820197972__K3_6] ON [dbo].[ConsecutivoZona]
(
	[idOsur] ASC
)
INCLUDE ( 	[idTrabajo]) WITH (SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF) ON [PRIMARY]


CREATE STATISTICS [_dta_stat_197575742_2_7_4] ON [dbo].[CotizacionDetalle]([idCotizacion], [idEstatus], [idElemento])

CREATE STATISTICS [_dta_stat_197575742_4_7] ON [dbo].[CotizacionDetalle]([idElemento], [idEstatus])

CREATE NONCLUSTERED INDEX [_dta_index_CotizacionDetalle_7_197575742__K7_2_4_6] ON [dbo].[CotizacionDetalle]
(
	[idEstatus] ASC
)
INCLUDE ( 	[idCotizacion],
	[idElemento],
	[cantidad]) WITH (SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF) ON [PRIMARY]

CREATE STATISTICS [_dta_stat_197575742_2_4] ON [dbo].[CotizacionDetalle]([idCotizacion], [idElemento])

CREATE STATISTICS [_dta_stat_229575856_1_5] ON [dbo].[CotizacionMaestro]([idCotizacion], [idTrabajo])

CREATE NONCLUSTERED INDEX [_dta_index_CotizacionMaestro_7_229575856__K5_K1] ON [dbo].[CotizacionMaestro]
(
	[idTrabajo] ASC,
	[idCotizacion] ASC
)WITH (SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF) ON [PRIMARY]


CREATE NONCLUSTERED INDEX [_dta_index_Item_7_462624691__K1] ON [dbo].[Item]
(
	[idItem] ASC
)WITH (SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF) ON [PRIMARY]


CREATE NONCLUSTERED INDEX [_dta_index_ItemPrecio_7_421576540__K2_K5] ON [dbo].[ItemPrecio]
(
	[idListaPrecio] ASC,
	[idItem] ASC
)WITH (SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF) ON [PRIMARY]


CREATE NONCLUSTERED INDEX [_dta_index_ItemPrecioCliente_7_453576654__K3_5] ON [dbo].[ItemPrecioCliente]
(
	[precioCliente] ASC
)
INCLUDE ( 	[idItemCliente]) WITH (SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF) ON [PRIMARY]


SET ANSI_PADDING ON

CREATE NONCLUSTERED INDEX [_dta_index_Tar_7_789577851__K1_K8_K3] ON [dbo].[Tar]
(
	[idTAR] ASC,
	[idZona] ASC,
	[TAR] ASC
)WITH (SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF) ON [PRIMARY]

CREATE STATISTICS [_dta_stat_1109578991_5_8_1] ON [dbo].[Trabajo]([idCita], [idEstatus], [idTrabajo])

CREATE STATISTICS [_dta_stat_1109578991_1_8] ON [dbo].[Trabajo]([idTrabajo], [idEstatus])

CREATE NONCLUSTERED INDEX [_dta_index_Trabajo_7_1109578991__K8_K1_K5_2_3_4] ON [dbo].[Trabajo]
(
	[idEstatus] ASC,
	[idTrabajo] ASC,
	[idCita] ASC
)
INCLUDE ( 	[numeroTrabajo],
	[fechaInicio],
	[fechaFin]) WITH (SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF) ON [PRIMARY]

CREATE NONCLUSTERED INDEX [_dta_index_Unidad_7_1054626800__K1] ON [dbo].[Unidad]
(
	[idUnidad] ASC
)WITH (SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF) ON [PRIMARY]

SET ANSI_PADDING ON

CREATE NONCLUSTERED INDEX [_dta_index_Unidad_7_1054626800__K1_K16_K3] ON [dbo].[Unidad]
(
	[idUnidad] ASC,
	[idTar] ASC,
	[numEconomico] ASC
)WITH (SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF) ON [PRIMARY]

