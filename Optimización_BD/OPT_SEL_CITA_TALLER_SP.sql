---Optimización sel SP [SEL_CITA_TALLER_SP] 25/01/2017

CREATE STATISTICS [_dta_stat_1646628909_7_9_1] ON [dbo].[Cita]([idUsuario], [idEstatus], [idCita])

CREATE STATISTICS [_dta_stat_1646628909_9_1_13_7_2_3] ON [dbo].[Cita]([idEstatus], [idCita], [idCliente], [idUsuario], [idUnidad], [idTaller])

CREATE STATISTICS [_dta_stat_1646628909_9_13] ON [dbo].[Cita]([idEstatus], [idCliente])

CREATE STATISTICS [_dta_stat_1646628909_3_9_1_13_7] ON [dbo].[Cita]([idTaller], [idEstatus], [idCita], [idCliente], [idUsuario])

CREATE NONCLUSTERED INDEX [_dta_index_Cita_7_1646628909__K1] ON [dbo].[Cita]
(
	[idCita] ASC
)WITH (SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF) ON [PRIMARY]


CREATE STATISTICS [_dta_stat_1646628909_2_9] ON [dbo].[Cita]([idUnidad], [idEstatus])

SET ANSI_PADDING ON

CREATE NONCLUSTERED INDEX [_dta_index_Cita_7_1646628909__K9_K1_K2_K13_K7_K3_4_5_6_10] ON [dbo].[Cita]
(
	[idEstatus] ASC,
	[idCita] ASC,
	[idUnidad] ASC,
	[idCliente] ASC,
	[idUsuario] ASC,
	[idTaller] ASC
)
INCLUDE ( 	[fecha],
	[trabajo],
	[observacion],
	[idTipoCita]) WITH (SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF) ON [PRIMARY]


	CREATE STATISTICS [_dta_stat_197575742_1_7] ON [dbo].[CotizacionDetalle]([idCotizacionDetalle], [idEstatus])

	CREATE STATISTICS [_dta_stat_197575742_4_1_2] ON [dbo].[CotizacionDetalle]([idElemento], [idCotizacionDetalle], [idCotizacion])

	CREATE NONCLUSTERED INDEX [_dta_index_CotizacionDetalle_7_197575742__K7_K2_K1_K4_5_6] ON [dbo].[CotizacionDetalle]
(
	[idEstatus] ASC,
	[idCotizacion] ASC,
	[idCotizacionDetalle] ASC,
	[idElemento] ASC
)
INCLUDE ( 	[precio],
	[cantidad]) WITH (SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF) ON [PRIMARY]


	CREATE STATISTICS [_dta_stat_197575742_1_2_7_4] ON [dbo].[CotizacionDetalle]([idCotizacionDetalle], [idCotizacion], [idEstatus], [idElemento])

	CREATE NONCLUSTERED INDEX [_dta_index_CotizacionMaestro_7_229575856__K7_K1_K5] ON [dbo].[CotizacionMaestro]
(
	[idEstatus] ASC,
	[idCotizacion] ASC,
	[idTrabajo] ASC
)WITH (SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF) ON [PRIMARY]

CREATE NONCLUSTERED INDEX [_dta_index_CotizacionMaestro_7_229575856__K5_K7_K1] ON [dbo].[CotizacionMaestro]
(
	[idTrabajo] ASC,
	[idEstatus] ASC,
	[idCotizacion] ASC
)WITH (SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF) ON [PRIMARY]

SET ANSI_PADDING ON

CREATE NONCLUSTERED INDEX [_dta_index_Taller_7_631673298__K1_5_6] ON [dbo].[Taller]
(
	[idTaller] ASC
)
INCLUDE ( 	[razonSocial],
	[direccion]) WITH (SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF) ON [PRIMARY]

	SET ANSI_PADDING ON

CREATE NONCLUSTERED INDEX [_dta_index_Tar_7_789577851__K1_K8_3] ON [dbo].[Tar]
(
	[idTAR] ASC,
	[idZona] ASC
)
INCLUDE ( 	[TAR]) WITH (SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF) ON [PRIMARY]


CREATE NONCLUSTERED INDEX [_dta_index_Trabajo_7_1109578991__K8_K5_K1] ON [dbo].[Trabajo]
(
	[idEstatus] ASC,
	[idCita] ASC,
	[idTrabajo] ASC
)WITH (SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF) ON [PRIMARY]

CREATE NONCLUSTERED INDEX [_dta_index_Trabajo_7_1109578991__K5_K1_K8_2] ON [dbo].[Trabajo]
(
	[idCita] ASC,
	[idTrabajo] ASC,
	[idEstatus] ASC
)
INCLUDE ( 	[numeroTrabajo]) WITH (SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF) ON [PRIMARY]


SET ANSI_PADDING ON

CREATE NONCLUSTERED INDEX [_dta_index_Unidad_7_1054626800__K1_K16_3_4_5_6_7_9_10_12_13] ON [dbo].[Unidad]
(
	[idUnidad] ASC,
	[idTar] ASC
)
INCLUDE ( 	[numEconomico],
	[clienteNumEconomico],
	[modelo],
	[clienteNumInventario],
	[numTAR],
	[GAR],
	[ubicacion],
	[marca],
	[modeloMarca]) WITH (SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF) ON [PRIMARY]


	SET ANSI_PADDING ON

CREATE NONCLUSTERED INDEX [_dta_index_Usuario_7_590625147__K1_4] ON [dbo].[Usuario]
(
	[idUsuario] ASC
)
INCLUDE ( 	[nombreCompleto]) WITH (SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF) ON [PRIMARY]
