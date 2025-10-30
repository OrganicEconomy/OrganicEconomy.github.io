new DataTable('#citizen-list');

/******************** GROUP CREATION ************************/

class Database {
	async get(key) {
		try {
			const value = await localforage.getItem(key)
			return value
		} catch (err) {
			alertError(err)
		}
		return null
	}

	async save(key, value) {
		try {
			await localforage.setItem(key, value)
		} catch (err) {
			alertError(err)
		}
	}

	async createCitizen(cryptedSk, pk, blockchain) {
		const value = await this.get(pk)
		if (value) {
			alertError("Citizen already exists")
			return
		}
		try {
			await localforage.setItem(pk, {
				bc: blockchain,
				sk: cryptedSk
			})
		} catch (err) {
			alertError(err);
		}
	}

	async updateCitizen(pk, blockchain) {
		const citizen = await this.get(pk)
		if (value === undefined) {
			alertError("Citizen does not exist")
			return
		}
		try {
			await localforage.setItem(pk, {
				bc: blockchain,
				sk: citizen.sk
			})
		} catch (err) {
			alertError(err);
		}
	}

	async createEcosystem(name, pk, blockchain) {
		const value = await this.get(pk)
		if (value) {
			alertError("Ecosystem already exists")
			return
		}
		try {
			await localforage.setItem(pk, {
				name: name,
				bc: blockchain
			})
		} catch (err) {
			alertError(err);
		}
	}
}

function alertError(err) {
	console.log(err)
}

const groupCreationInit = function() {

	$('#creation-valid').on('click', async function () {
		createOrganicInstance(
			$('#citizen-name').val(),
			$('#citizen-birthDate').val(),
			$('#money-name').val(),
			$('#input-password').val())
	})

	$('.input-creation').on('input', function() {
		updateInputs(
			$('#citizen-name').val(),
			$('#citizen-birthDate').val(),
			$('#money-name').val(),
			$('#input-password').val(),
			$('#input-password-validation').val())
	})

	function updateInputs(citizenName, birthDate, moneyName, pwd, pwdValidation) {
		if(moneyName.length >= 3 && pwd.length >= 6 && pwd === pwdValidation
		&& citizenName.length >= 3 && isValidDate(birthDate)){
			$('#creation-valid').removeClass('disabled');
		} else {
			$('#creation-valid').addClass('disabled');
		}
	}

	async function createOrganicInstance (citizenName, citizenBirthdate, moneyName, password) {
		let parts = citizenBirthdate.split("/");
		citizenBirthdate = new Date(parseInt(parts[2], 10),
                  parseInt(parts[1], 10) - 1,
                  parseInt(parts[0], 10));
		
		const random_sk = organicMoney.Blockchain.randomPrivateKey()
		await new Database().save('moneyName', moneyName)
		let citizen_pk = await createOriginCitizen(citizenName, citizenBirthdate, password, random_sk)
		let villageHeart = await createOriginEcosystem("Coeur du village - " + moneyName, random_sk, citizen_pk)
	}

	async function createOriginCitizen(name, birthdate, password, signerSk) {
		const bc = new organicMoney.CitizenBlockchain()
		const sk = bc.startBlockchain(name, birthdate, signerSk)

		let utf8Encode = new TextEncoder();
		const skBase64 = utf8Encode.encode(sk);
		const encryptedSk = await organicMoney.Blockchain.aesEncrypt(skBase64, password)
		const pk = bc.getMyPublicKey()

		await new Database().createCitizen(encryptedSk, pk, bc)

		return pk
	}

	async function createOriginEcosystem(name, signerSk, adminPk) {
		// TODO : Should store the ecosystem SK to be able to sign other Ecosystem and Citizens creation ?
		// Or maybe the admin of the ecosystem could be the answer.:wqa
		//
		const bc = new organicMoney.EcosystemBlockchain()
		const sk = bc.startBlockchain(name, signerSk, adminPk)
		const pk = bc.getMyPublicKey()

		await new Database().createEcosystem(name, pk, bc)
	}

	function isValidDate(stringDate) {
		const regex = /^\d{2}\/\d{2}\/\d{4}$/;
		return regex.test(stringDate);
	}
}()
