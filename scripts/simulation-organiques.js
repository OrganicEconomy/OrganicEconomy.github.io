let simulationHandler = new economicSimulator.SimulationHandler();

simulationHandler.add("simulationOrgaBase",
	new economicSimulator.OrganicSimulation("simulationOrgaBase")
	.addBorders()
	.addPeople(8,4)
	.setPeopleCapital(0)
	.setPeopleColor()
	.setPeopleSpeed(5)
	.setPeopleTransactionsOn(1)
	.init());

simulationHandler.add("simulationOrgaInegal",
	new economicSimulator.OrganicSimulation("simulationOrgaInegal")
	.addBorders()
	.addPeople(8,4)
	.setPeopleCapital(500, true)
	.setPeopleColor()
	.setPeopleSpeed(5)
	.setPeopleTransactionsOn(1)
	.init());

simulationHandler.add("simulationOrgaCompanies",
	 	new economicSimulator.OrganicSimulation("simulationOrgaCompanies")
	 	.addBorders()
	 	.addPeople(7, 5)
	 	.setPeopleColor("#4d8b31")
	 	.setPeopleSpeed(5)
	 	.addCompanies(10)
	 	.setCompaniesColor()
	 	.setCompaniesSpeed(3)
	 	.setCompaniesTransactionOn(1, 1)
	 	.setCompaniesInvestsOn()
	 	.init());
