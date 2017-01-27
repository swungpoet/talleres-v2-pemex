---Optimización del SP SEL_ESTATUS_APROBACION_UTILIDAD_SP 27/01/2017

CREATE STATISTICS [_dta_stat_999674609_3_1_6] ON [dbo].[AprobacionUtilidad]([fecha], [idAprobacionUtilidad], [tipoAprobacion])

CREATE STATISTICS [_dta_stat_999674609_3_2_6] ON [dbo].[AprobacionUtilidad]([fecha], [idTrabajo], [tipoAprobacion])

CREATE NONCLUSTERED INDEX [_dta_index_AprobacionUtilidad_7_999674609__K2_K6_K1_K3_4_5_7] ON [dbo].[AprobacionUtilidad]
(
	[idTrabajo] ASC,
	[tipoAprobacion] ASC,
	[idAprobacionUtilidad] ASC,
	[fecha] ASC
)
INCLUDE ( 	[idUsuario],
	[estatus],
	[margen]) WITH (SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF) ON [PRIMARY]

CREATE STATISTICS [_dta_stat_999674609_1_6_2_3] ON [dbo].[AprobacionUtilidad]([idAprobacionUtilidad], [tipoAprobacion], [idTrabajo], [fecha])
