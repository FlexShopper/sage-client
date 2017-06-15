# Sage Gateway Client

## usage
```
const client = new SageClient({
    username: 'Username',
    password: 'Password',
    terminalId: '2310',
    identifier: 'A'
});

const customerData = {
    firstName: 'Doug',
    lastName: 'Fresh',
    addressOne: '22 West Way',
    addressTwo: '',
    city: 'Los Angls Afb',
    state: 'CA',
    zip: '90009',
    phone: '2073331234'
};

const purchaseParams = {
    transactionId: '6c46996dc95149ebaa4fcdcd5eb0ecf1',
    amount: 1.15,
    customerData,
    routingNumber: '490000018',
    accountNumber: '24413815',
    accountType: 'Checking'
};

client.purchaseWithACH(purchaseParams);
```