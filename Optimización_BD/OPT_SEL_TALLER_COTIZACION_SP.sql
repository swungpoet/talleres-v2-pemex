---Optimización sel SP [SEL_TALLER_COTIZACION_SP] 25/01/2017

CREATE STATISTICS [_dta_stat_631673298_28_23_5] ON [dbo].[Taller]([idTAR], [PER_STATUS], [razonSocial])

SET ANSI_PADDING ON

CREATE NONCLUSTERED INDEX [_dta_index_Taller_7_631673298__K23_K5_1_6_28] ON [dbo].[Taller]
(
	[PER_STATUS] ASC,
	[razonSocial] ASC
)
INCLUDE ( 	[idTaller],
	[direccion],
	[idTAR]) WITH (SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF) ON [PRIMARY]

