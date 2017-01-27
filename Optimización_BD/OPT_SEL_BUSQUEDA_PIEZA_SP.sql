---Optimización sel SP [SEL_BUSQUEDA_PIEZA_SP] 26/01/2017

CREATE STATISTICS [_dta_stat_462624691_2_1_14] ON [dbo].[Item]([consecutivo], [idItem], [idCliente])

CREATE STATISTICS [_dta_stat_462624691_3_1_14_2] ON [dbo].[Item]([numeroPartida], [idItem], [idCliente], [consecutivo])

CREATE STATISTICS [_dta_stat_462624691_14_3] ON [dbo].[Item]([idCliente], [numeroPartida])

SET ANSI_PADDING ON

CREATE NONCLUSTERED INDEX [_dta_index_Item_7_462624691__K1_K14_K3_K2_4_5_11_13] ON [dbo].[Item]
(
	[idItem] ASC,
	[idCliente] ASC,
	[numeroPartida] ASC,
	[consecutivo] ASC
)
INCLUDE ( 	[item],
	[numeroParte],
	[idNivelAutorizacion],
	[refaccion]) WITH (SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF) ON [PRIMARY]

CREATE STATISTICS [_dta_stat_462624691_14_2_3] ON [dbo].[Item]([idCliente], [consecutivo], [numeroPartida])
