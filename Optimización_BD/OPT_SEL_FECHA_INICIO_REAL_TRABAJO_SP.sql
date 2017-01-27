---Optimización sel SP [SEL_ORDEN_VERIFICADA_SP] 27/01/2017


CREATE STATISTICS [_dta_stat_795149878_4_1] ON [dbo].[OrdenFechaInicioRealServicio]([idDetalleFechaServicio], [idOrderFechaInicio])


CREATE STATISTICS [_dta_stat_795149878_3_1] ON [dbo].[OrdenFechaInicioRealServicio]([idTrabajo], [idOrderFechaInicio])


CREATE NONCLUSTERED INDEX [_dta_index_OrdenFechaInicioRealServicio_7_795149878__K3_K4_K1_2] ON [dbo].[OrdenFechaInicioRealServicio]
(
	[idTrabajo] ASC,
	[idDetalleFechaServicio] ASC,
	[idOrderFechaInicio] ASC
)
INCLUDE ( 	[fechaServicio]) WITH (SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF) ON [PRIMARY]
