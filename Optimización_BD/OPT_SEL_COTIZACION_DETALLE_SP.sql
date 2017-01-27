---Optimización del SP SEL_COTIZACION_DETALLE_SP 27/01/2017

CREATE STATISTICS [_dta_stat_197575742_1_7_4] ON [dbo].[CotizacionDetalle]([idCotizacionDetalle], [idEstatus], [idElemento])

CREATE NONCLUSTERED INDEX [_dta_index_CotizacionDetalle_7_197575742__K2_K1_K7_K4_3_5_6] ON [dbo].[CotizacionDetalle]
(
	[idCotizacion] ASC,
	[idCotizacionDetalle] ASC,
	[idEstatus] ASC,
	[idElemento] ASC
)
INCLUDE ( 	[idTipoElemento],
	[precio],
	[cantidad]) WITH (SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF) ON [PRIMARY]

CREATE STATISTICS [_dta_stat_462624691_11_1] ON [dbo].[Item]([idNivelAutorizacion], [idItem])

CREATE STATISTICS [_dta_stat_1054626800_7_1] ON [dbo].[Unidad]([numTAR], [idUnidad])

CREATE NONCLUSTERED INDEX [_dta_index_UsuarioNivel_7_1269579561__K3_2] ON [dbo].[UsuarioNivel]
(
	[idNivelAutorizacion] ASC
)
INCLUDE ( 	[idUsuario]) WITH (SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF) ON [PRIMARY]
