
---Optimización sel SP [SEL_COPADES_SP] 25/01/2017

SET ANSI_PADDING ON

CREATE NONCLUSTERED INDEX [_dta_index_DatosCopade_7_224719853__K1_2_3_16_17_22_24_25_26] ON [dbo].[DatosCopade]
(
	[idDatosCopade] ASC
)
INCLUDE ( 	[subTotal],
	[total],
	[ordenSurtimiento],
	[numeroEstimacion],
	[numeroCopade],
	[fechaCarga],
	[fechaRecepcionCopade],
	[xmlCopade]) WITH (SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF) ON [PRIMARY]


CREATE NONCLUSTERED INDEX [_dta_index_DatosCopadeOrden_7_507148852__K2] ON [dbo].[DatosCopadeOrden]
(
	[idDatosCopade] ASC
)WITH (SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF) ON [PRIMARY]
