---Optimización del SP SEl_APROBACION_UTILIDAD_SP 26/01/2017

CREATE STATISTICS [_dta_stat_999674609_2_5] ON [dbo].[AprobacionUtilidad]([idTrabajo], [estatus])

CREATE STATISTICS [_dta_stat_999674609_3_2_5] ON [dbo].[AprobacionUtilidad]([fecha], [idTrabajo], [estatus])

CREATE NONCLUSTERED INDEX [_dta_index_AprobacionUtilidad_7_999674609__K2] ON [dbo].[AprobacionUtilidad]
(
	[idTrabajo] ASC
)WITH (SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF) ON [PRIMARY]

CREATE NONCLUSTERED INDEX [_dta_index_AprobacionUtilidad_7_999674609__K5_K2_K3_1_6_7] ON [dbo].[AprobacionUtilidad]
(
	[estatus] ASC,
	[idTrabajo] ASC,
	[fecha] ASC
)
INCLUDE ( 	[idAprobacionUtilidad],
	[tipoAprobacion],
	[margen]) WITH (SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF) ON [PRIMARY]


CREATE NONCLUSTERED INDEX [_dta_index_CotizacionMaestro_7_229575856__K7_K5_K1] ON [dbo].[CotizacionMaestro]
(
	[idEstatus] ASC,
	[idTrabajo] ASC,
	[idCotizacion] ASC
)WITH (SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF) ON [PRIMARY]

CREATE NONCLUSTERED INDEX [_dta_index_CotizacionMaestro_7_229575856__K5_K1_K9] ON [dbo].[CotizacionMaestro]
(
	[idTrabajo] ASC,
	[idCotizacion] ASC,
	[idTaller] ASC
)WITH (SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF) ON [PRIMARY]


CREATE NONCLUSTERED INDEX [_dta_index_Taller_7_631673298__K1_29] ON [dbo].[Taller]
(
	[idTaller] ASC
)
INCLUDE ( 	[idProveedor]) WITH (SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF) ON [PRIMARY]
