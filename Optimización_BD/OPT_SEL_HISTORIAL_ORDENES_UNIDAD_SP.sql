---Optimización sel SP [SEL_HISTORIAL_ORDENES_UNIDAD_SP] 26/01/2017

CREATE STATISTICS [_dta_stat_224719853_25_1] ON [dbo].[DatosCopade]([fechaRecepcionCopade], [idDatosCopade])

CREATE NONCLUSTERED INDEX [_dta_index_DatosCopadeOrden_7_507148852__K3_K2] ON [dbo].[DatosCopadeOrden]
(
	[idTrabajo] ASC,
	[idDatosCopade] ASC
)WITH (SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF) ON [PRIMARY]

CREATE NONCLUSTERED INDEX [_dta_index_OrdenFechaInicioRealServicio_7_795149878__K3_2] ON [dbo].[OrdenFechaInicioRealServicio]
(
	[idTrabajo] ASC
)
INCLUDE ( 	[fechaServicio]) WITH (SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF) ON [PRIMARY]

CREATE NONCLUSTERED INDEX [_dta_index_Trabajo_7_1109578991__K5_K8_K1_2_3_4] ON [dbo].[Trabajo]
(
	[idCita] ASC,
	[idEstatus] ASC,
	[idTrabajo] ASC
)
INCLUDE ( 	[numeroTrabajo],
	[fechaInicio],
	[fechaFin]) WITH (SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF) ON [PRIMARY]

