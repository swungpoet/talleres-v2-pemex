

---Optimización del SP SEL_TRABAJOS_COBRADOS_ORDEN_SP 26/01/2017

CREATE STATISTICS [_dta_stat_1646628909_7_1_2] ON [dbo].[Cita]([idUsuario], [idCita], [idUnidad])

CREATE STATISTICS [_dta_stat_1646628909_3_1_7_2] ON [dbo].[Cita]([idTaller], [idCita], [idUsuario], [idUnidad])

CREATE NONCLUSTERED INDEX [_dta_index_ConsecutivoZona_7_820197972__K6_K3] ON [dbo].[ConsecutivoZona]
(
	[idTrabajo] ASC,
	[idOsur] ASC
)WITH (SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF) ON [PRIMARY]

CREATE STATISTICS [_dta_stat_507148852_3_1] ON [dbo].[DatosCopadeOrden]([idTrabajo], [idDatosCopadeOrden])

CREATE NONCLUSTERED INDEX [_dta_index_DatosCopadeOrden_7_507148852__K2_K1_K3] ON [dbo].[DatosCopadeOrden]
(
	[idDatosCopade] ASC,
	[idDatosCopadeOrden] ASC,
	[idTrabajo] ASC
)WITH (SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF) ON [PRIMARY]

CREATE STATISTICS [_dta_stat_462624691_13_1] ON [dbo].[Item]([refaccion], [idItem])

CREATE NONCLUSTERED INDEX [_dta_index_ItemPrecioCliente_7_453576654__K5_3] ON [dbo].[ItemPrecioCliente]
(
	[idItemCliente] ASC
)
INCLUDE ( 	[precioCliente]) WITH (SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF) ON [PRIMARY]
