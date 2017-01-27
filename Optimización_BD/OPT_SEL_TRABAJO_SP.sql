
---Optimización sel SP [SEL_TRABAJO_SP] 27/01/2017

CREATE STATISTICS [_dta_stat_999674609_6_1] ON [dbo].[AprobacionUtilidad]([tipoAprobacion], [idAprobacionUtilidad])

CREATE STATISTICS [_dta_stat_999674609_2_1_6] ON [dbo].[AprobacionUtilidad]([idTrabajo], [idAprobacionUtilidad], [tipoAprobacion])

CREATE NONCLUSTERED INDEX [_dta_index_AprobacionUtilidad_7_999674609__K6_K2_K1] ON [dbo].[AprobacionUtilidad]
(
	[tipoAprobacion] ASC,
	[idTrabajo] ASC,
	[idAprobacionUtilidad] ASC
)WITH (SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF) ON [PRIMARY]


SET ANSI_PADDING ON

CREATE NONCLUSTERED INDEX [_dta_index_Cita_7_1646628909__K2_K1_K13_K3_5_10] ON [dbo].[Cita]
(
	[idUnidad] ASC,
	[idCita] ASC,
	[idCliente] ASC,
	[idTaller] ASC
)
INCLUDE ( 	[trabajo],
	[idTipoCita]) WITH (SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF) ON [PRIMARY]





	CREATE NONCLUSTERED INDEX [_dta_index_ItemPrecio_7_421576540__K5_K2] ON [dbo].[ItemPrecio]
(
	[idItem] ASC,
	[idListaPrecio] ASC
)WITH (SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF) ON [PRIMARY]





CREATE NONCLUSTERED INDEX [_dta_index_Trabajo_7_1109578991__K8_K5_K1_2_3] ON [dbo].[Trabajo]
(
	[idEstatus] ASC,
	[idCita] ASC,
	[idTrabajo] ASC
)
INCLUDE ( 	[numeroTrabajo],
	[fechaInicio]) WITH (SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF) ON [PRIMARY]




	SET ANSI_PADDING ON

CREATE NONCLUSTERED INDEX [_dta_index_Unidad_7_1054626800__K16_K1_3_12_13] ON [dbo].[Unidad]
(
	[idTar] ASC,
	[idUnidad] ASC
)
INCLUDE ( 	[numEconomico],
	[marca],
	[modeloMarca]) WITH (SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF) ON [PRIMARY]





	CREATE STATISTICS [_dta_stat_302624121_3_2] ON [dbo].[UsuarioTar]([idTAR], [idUsuario])


	CREATE NONCLUSTERED INDEX [_dta_index_UsuarioTar_7_302624121__K2_K3] ON [dbo].[UsuarioTar]
(
	[idUsuario] ASC,
	[idTAR] ASC
)WITH (SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF) ON [PRIMARY]
