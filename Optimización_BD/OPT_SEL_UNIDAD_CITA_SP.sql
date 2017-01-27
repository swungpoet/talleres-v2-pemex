
---Optimización del SP SEL_UNIDAD_CITA_SP 26/01/2017

-- tipoUsuario = 1

SET ANSI_PADDING ON

CREATE NONCLUSTERED INDEX [_dta_index_Cita_7_1646628909__K2_K1_K7_K3_4_5] ON [dbo].[Cita]
(
	[idUnidad] ASC,
	[idCita] ASC,
	[idUsuario] ASC,
	[idTaller] ASC
)
INCLUDE ( 	[fecha],
	[trabajo]) WITH (SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF) ON [PRIMARY]

SET ANSI_PADDING ON

CREATE NONCLUSTERED INDEX [_dta_index_Taller_7_631673298__K1_2_3_4_5_6_7] ON [dbo].[Taller]
(
	[idTaller] ASC
)
INCLUDE ( 	[GAR],
	[TAD],
	[ciudad],
	[razonSocial],
	[direccion],
	[encargado]) WITH (SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF) ON [PRIMARY]

CREATE NONCLUSTERED INDEX [_dta_index_Trabajo_7_1109578991__K5_K8_K1_3_4] ON [dbo].[Trabajo]
(
	[idCita] ASC,
	[idEstatus] ASC,
	[idTrabajo] ASC
)
INCLUDE ( 	[fechaInicio],
	[fechaFin]) WITH (SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF) ON [PRIMARY]


CREATE STATISTICS [_dta_stat_1054626800_1_2] ON [dbo].[Unidad]([idUnidad], [idLicitacion])

SET ANSI_PADDING ON

CREATE NONCLUSTERED INDEX [_dta_index_Usuario_7_590625147__K1_3_4] ON [dbo].[Usuario]
(
	[idUsuario] ASC
)
INCLUDE ( 	[compania],
	[nombreCompleto]) WITH (SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF) ON [PRIMARY]


-- tipoUsuario = 2


CREATE STATISTICS [_dta_stat_1646628909_7_2_3] ON [dbo].[Cita]([idUsuario], [idUnidad], [idTaller])


SET ANSI_PADDING ON

CREATE NONCLUSTERED INDEX [_dta_index_Cita_7_1646628909__K3_K2_K7_K1_4_5] ON [dbo].[Cita]
(
	[idTaller] ASC,
	[idUnidad] ASC,
	[idUsuario] ASC,
	[idCita] ASC
)
INCLUDE ( 	[fecha],
	[trabajo]) WITH (SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF) ON [PRIMARY]

CREATE NONCLUSTERED INDEX [_dta_index_Trabajo_7_1109578991__K5_K8_K1_3_4_9987] ON [dbo].[Trabajo]
(
	[idCita] ASC,
	[idEstatus] ASC,
	[idTrabajo] ASC
)
INCLUDE ( 	[fechaInicio],
	[fechaFin]) WITH (SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF) ON [PRIMARY]

CREATE NONCLUSTERED INDEX [_dta_index_Unidad_7_1054626800__K1_K2] ON [dbo].[Unidad]
(
	[idUnidad] ASC,
	[idLicitacion] ASC
)WITH (SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF) ON [PRIMARY]

