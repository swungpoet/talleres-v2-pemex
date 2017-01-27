
---Optimización del SP SEL_APROBACION_PROVISION_SP 26/01/2017

CREATE STATISTICS [_dta_stat_820197972_2_6] ON [dbo].[ConsecutivoZona]([idZona], [idTrabajo])

CREATE NONCLUSTERED INDEX [_dta_index_CotizacionDetalle_7_197575742__K2_K4_K1_5_6] ON [dbo].[CotizacionDetalle]
(
	[idCotizacion] ASC,
	[idElemento] ASC,
	[idCotizacionDetalle] ASC
)
INCLUDE ( 	[precio],
	[cantidad]) WITH (SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF) ON [PRIMARY]


CREATE STATISTICS [_dta_stat_789577851_3_1] ON [dbo].[Tar]([TAR], [idTAR])
