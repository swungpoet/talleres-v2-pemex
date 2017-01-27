---Optimización sel SP [SEL_NOTIFICACION_TRABAJORECHAZADO_SP] 27/01/2017

CREATE STATISTICS [_dta_stat_631673298_20_1] ON [dbo].[Taller]([PER_CODPOS], [idTaller])

CREATE STATISTICS [_dta_stat_590625147_10_9] ON [dbo].[Usuario]([idSubtipoUsuario], [idTipoUsuario])


CREATE STATISTICS [_dta_stat_590625147_1_9_10] ON [dbo].[Usuario]([idUsuario], [idTipoUsuario], [idSubtipoUsuario])

SET ANSI_PADDING ON

CREATE NONCLUSTERED INDEX [_dta_index_Usuario_7_590625147__K9_K1_K10_2] ON [dbo].[Usuario]
(
	[idTipoUsuario] ASC,
	[idUsuario] ASC,
	[idSubtipoUsuario] ASC
)
INCLUDE ( 	[email]) WITH (SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF) ON [PRIMARY]

CREATE NONCLUSTERED INDEX [_dta_index_UsuarioTar_7_302624121__K3_K2] ON [dbo].[UsuarioTar]
(
	[idTAR] ASC,
	[idUsuario] ASC
)WITH (SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF) ON [PRIMARY]



