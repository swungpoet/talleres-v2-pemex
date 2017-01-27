---Optimización sel SP [SEL_FACTURAS_PAGADAS_SP]_B2 25/01/2017

SET ANSI_PADDING ON

CREATE NONCLUSTERED INDEX [_dta_index_Cita_7_1646628909__K1_2_3_4_5_8_10_13] ON [dbo].[Cita]
(
	[idCita] ASC
)
INCLUDE ( 	[idUnidad],
	[idTaller],
	[fecha],
	[trabajo],
	[fechaIngresoUnidad],
	[idTipoCita],
	[idCliente]) WITH (SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF) ON [PRIMARY]


CREATE STATISTICS [_dta_stat_1109578991_8_2] ON [dbo].[Trabajo]([idEstatus], [numeroTrabajo])

CREATE STATISTICS [_dta_stat_1109578991_5_8_2] ON [dbo].[Trabajo]([idCita], [idEstatus], [numeroTrabajo])

CREATE STATISTICS [_dta_stat_1109578991_1_8_2] ON [dbo].[Trabajo]([idTrabajo], [idEstatus], [numeroTrabajo])
