---Optimización sel SP [SEL_REPORTE_CERTIFICADO_CONFORMIDAD_SP] 26/01/2017

CREATE NONCLUSTERED INDEX [_dta_index_Cita_7_1646628909__K13_K3_K2_K1] ON [dbo].[Cita]
(
	[idCliente] ASC,
	[idTaller] ASC,
	[idUnidad] ASC,
	[idCita] ASC
)WITH (SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF) ON [PRIMARY]


CREATE NONCLUSTERED INDEX [_dta_index_ConsecutivoZona_7_820197972__K3_K6_4_5] ON [dbo].[ConsecutivoZona]
(
	[idOsur] ASC,
	[idTrabajo] ASC
)
INCLUDE ( 	[numeroConsecutivo],
	[fechaGeneracion]) WITH (SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF) ON [PRIMARY]


	CREATE NONCLUSTERED INDEX [_dta_index_CotizacionMaestro_7_229575856__K5_8066] ON [dbo].[CotizacionMaestro]
(
	[idTrabajo] ASC
)WITH (SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF) ON [PRIMARY]

CREATE NONCLUSTERED INDEX [_dta_index_Trabajo_7_1109578991__K3D_1_2_5_8] ON [dbo].[Trabajo]
(
	[fechaInicio] DESC
)
INCLUDE ( 	[idTrabajo],
	[numeroTrabajo],
	[idCita],
	[idEstatus]) WITH (SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF) ON [PRIMARY]

