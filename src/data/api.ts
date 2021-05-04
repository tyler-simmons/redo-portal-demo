import {auth, db} from './firestore';

export const getAccountNumbers = async (email: string) => {
    const accounts: any[] = [];
    
    try {
        let snapshot = await db.collection('userAccounts').where('Email', '==', email).get();
        snapshot.forEach((doc) => accounts.push(doc.data()));
    } catch {}
    
    
    return accounts;  
}



export const getAccounts = async (email: string) => {
    let accounts: any[] = [];
    const userAccounts = await getAccountNumbers(email);
    const accNums = userAccounts.map((val) => val?.AccountNumber);

    let snap = await db.collection('loanAccounts').get();
    snap.forEach((doc) => accounts.push(doc.data()));

    console.log('in method', accounts.filter((ac) => accNums.includes(ac?.AccountNumber)));

    return accounts.filter((ac) => accNums.includes(ac?.AccountNumber));
    
}

export const getPayments = async (email: string) => {
    let payments: any[] = [];
    
    let snap = await db.collection('loanPayments')
        .where('Email', '==', email)
        .get();

    snap.forEach((doc) => payments.push(doc.data()));


    payments.forEach(async (pmt) => {
        var method = await pmt.PaymentMethod.get();
        pmt.PaymentMethod = method.data();
    });

    return payments;
}

export const linkAccount = async (email: string, accountNumber: string) => {
    await db.collection('userAccounts').add({
        Email: email,
        accountNumber: accountNumber
    });
}

export const searchAccount = async (accountNumber: string, zipCode: string) => {
    let accs = await db.collection('loanAccounts').where('AccountNumber', '==', accountNumber).where('ZipCode', '==', zipCode).get();
    if (accs.size > 0) {
        return accs.docs[0].data();
    }
    return null;

}