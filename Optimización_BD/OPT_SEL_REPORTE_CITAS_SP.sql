---Optimización sel SP [SEL_REPORTE_CITAS_SP] 27/01/2017


CREATE NONCLUSTERED INDEX [_dta_index_Cita_7_1646628909__K9_K1_K2] ON [dbo].[Cita]
(
	[idEstatus] ASC,
	[idCita] ASC,
	[idUnidad] ASC
)WITH (SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF) ON [PRIMARY]


CREATE NONCLUSTERED INDEX [_dta_index_Cita_7_1646628909__K9_1_2] ON [dbo].[Cita]
(
	[idEstatus] ASC
)
INCLUDE ( 	[idCita],
	[idUnidad]) WITH (SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF) ON [PRIMARY]


CREATE NONCLUSTERED INDEX [_dta_index_HistorialProceso_7_357576312__K5_K2_K4_1_3] ON [dbo].[HistorialProceso]
(
	[idTipoProceso] ASC,
	[idEstatus] ASC,
	[idProceso] ASC
)
INCLUDE ( 	[idHistorial],
	[fecha]) WITH (SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF) ON [PRIMARY]


CREATE NONCLUSTERED INDEX [_dta_index_Tar_7_789577851__K8_K1] ON [dbo].[Tar]
(
	[idZona] ASC,
	[idTAR] ASC
)WITH (SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF) ON [PRIMARY]


CREATE NONCLUSTERED INDEX [_dta_index_Unidad_7_1054626800__K16_K1] ON [dbo].[Unidad]
(
	[idTar] ASC,
	[idUnidad] ASC
)WITH (SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF) ON [PRIMARY]

