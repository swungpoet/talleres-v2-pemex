---Optimización sel SP [SEL_HISTORIAL_CITAS_UNIDAD_SP] 25/01/2017

CREATE STATISTICS [_dta_stat_1646628909_9_13_2] ON [dbo].[Cita]([idEstatus], [idCliente], [idUnidad])
CREATE STATISTICS [_dta_stat_1646628909_1_13_2_9_3] ON [dbo].[Cita]([idCita], [idCliente], [idUnidad], [idEstatus], [idTaller])
SET ANSI_PADDING ON

CREATE NONCLUSTERED INDEX [_dta_index_Cita_7_1646628909__K2_K1_K13_K9_K3_4_5] ON [dbo].[Cita]
(
	[idUnidad] ASC,
	[idCita] ASC,
	[idCliente] ASC,
	[idEstatus] ASC,
	[idTaller] ASC
)
INCLUDE ( 	[fecha],
	[trabajo]) WITH (SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF) ON [PRIMARY]
