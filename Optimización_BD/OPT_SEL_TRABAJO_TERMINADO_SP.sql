---Optimización sel SP [SEL_TRABAJO_TERMINADO_SP] 27/01/2017


CREATE NONCLUSTERED INDEX [_dta_index_CotizacionMaestro_7_229575856__K5_K7] ON [dbo].[CotizacionMaestro]
(
	[idTrabajo] ASC,
	[idEstatus] ASC
)WITH (SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF) ON [PRIMARY]


CREATE STATISTICS [_dta_stat_1054626800_1_2_16] ON [dbo].[Unidad]([idUnidad], [idLicitacion], [idTar])
