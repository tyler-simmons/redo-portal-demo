import {useState} from 'react';

import {db} from 'app/data';

// return [
//     paymentMethods,
//     methodsDoneLoading,
//     operationLoading,
//     getPaymentMethods,
//     addBankAcct,
//     addCard,
//     deleteMethod,
// ];

export const useFundingSources = () : [
    paymentMethods: Array<any>,
    methodsDoneLoading: boolean,
    operationLoading: boolean,
    getPaymentMethods: () => Promise<void>,
    addBankAcct: (bankForm: any) => Promise<void>,
    addCard: (cardForm: any) => Promise<void>,
    deleteMethod: (methodId: any) => Promise<void>
] => {
	const [paymentMethods, setPaymentMethods] = useState<Array<any>>([]);
	const [methodsDoneLoading, setMethodsDoneLoading] = useState<boolean>(false);
	const [operationLoading, setOperationLoading] = useState<boolean>(false);

	const getPaymentMethods = async () => {
		let tempMethods: Array<any> = [];
		let methods = await db
			.collection("paymentMethods")
			.get()
			.then((docs) => {
				docs.forEach((doc) => {
					console.log(doc);
					tempMethods.push({ ...doc.data(), id: doc.id });
				});
			})
			.finally(() => {
				setPaymentMethods(tempMethods);
				setMethodsDoneLoading(true);
			});
	};

	const addBankAcct = async (bankForm: any) => {
		setOperationLoading(true);
		db.collection("paymentMethods")
			.add({
				AccountHolder: bankForm.accountHolder,
				AccountNumber: bankForm.accountNumber.substr(
					bankForm.accountNumber.length - 4
				),
				AccountType: bankForm.accountType,
				MethodType: "Bank",
				NickName: bankForm.nickName,
				RoutingNumber: bankForm.routingNumber,
			})
			.then((docRef) => {
				console.log("Added a bank account");
			})
			.catch((err) => {
				console.log(err);
			})
			.finally(() => {
				setOperationLoading(false);
				getPaymentMethods();
			});
	};

	const addCard = async (cardForm: any) => {
		setOperationLoading(true);
		db.collection("paymentMethods")
			.add({
				CardHolder: cardForm.cardHolder,
				CardNumber: cardForm.cardNumber.substr(cardForm.cardNumber.length - 4),
				CardType: cardForm.cardType,
				MethodType: "Card",
				NickName: cardForm.nickName,
				Expiration: cardForm.expiration,
			})
			.then((docRef) => {
				console.log("created new card");
			})
			.catch((err) => {
				console.log(err);
			})
			.finally(() => {
				setOperationLoading(false);
				getPaymentMethods();
			});
	};

	const deleteMethod = async (methodId: any) => {
		setOperationLoading(true);
		db.collection("paymentMethods")
			.doc(methodId)
			.delete()
			.then(() => {
				console.log("Deleted");
			})
			.catch((err) => {
				console.log(err);
			})
			.finally(() => {
				setOperationLoading(false);
				getPaymentMethods();
			});
	};

	return [
		paymentMethods,
		methodsDoneLoading,
		operationLoading,
		getPaymentMethods,
		addBankAcct,
		addCard,
		deleteMethod,
	];
};