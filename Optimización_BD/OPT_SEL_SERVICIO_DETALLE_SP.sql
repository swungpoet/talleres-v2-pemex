---Optimización sel SP [SEL_SERVICIO_DETALLE_SP] 26/01/2017

CREATE STATISTICS [_dta_stat_1646628909_2_3] ON [dbo].[Cita]([idUnidad], [idTaller])

CREATE STATISTICS [_dta_stat_101575400_4_2_3_5] ON [dbo].[CitaServicioDetalle]([idElemento], [idCita], [idTipoElemento], [cantidad])

CREATE STATISTICS [_dta_stat_101575400_3_5_2] ON [dbo].[CitaServicioDetalle]([idTipoElemento], [cantidad], [idCita])

CREATE NONCLUSTERED INDEX [_dta_index_CitaServicioDetalle_7_101575400__K2_K4_K3_K5] ON [dbo].[CitaServicioDetalle]
(
	[idCita] ASC,
	[idElemento] ASC,
	[idTipoElemento] ASC,
	[cantidad] ASC
)WITH (SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF) ON [PRIMARY]


CREATE STATISTICS [_dta_stat_1054626800_12_5_13_3] ON [dbo].[Unidad]([marca], [modelo], [modeloMarca], [numEconomico])


CREATE STATISTICS [_dta_stat_1054626800_1_12_5_13_3] ON [dbo].[Unidad]([idUnidad], [marca], [modelo], [modeloMarca], [numEconomico])
