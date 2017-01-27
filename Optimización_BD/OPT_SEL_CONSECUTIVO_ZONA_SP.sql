
---Optimización del SP SEL_CONSECUTIVO_ZONA_SP 27/01/2017
CREATE NONCLUSTERED INDEX [_dta_index_ConsecutivoZona_7_820197972__K6_K1_2_3_4_5_7] ON [dbo].[ConsecutivoZona]
(
	[idTrabajo] ASC,
	[idConsecutivo] ASC
)
INCLUDE ( 	[idZona],
	[idOsur],
	[numeroConsecutivo],
	[fechaGeneracion],
	[idCliente]) WITH (SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF) ON [PRIMARY]
