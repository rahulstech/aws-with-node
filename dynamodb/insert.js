const { PutItemCommand } = require('@aws-sdk/client-dynamodb')
const { marshall } = require('@aws-sdk/util-dynamodb')
const { dbclient } = require('./client.js')

async function insertContact(data) {
    try {
        const res = await dbclient.send(new PutItemCommand(data));
        console.log(`contact added successfully `, res)
    }
    catch(ex) {
        console.log(ex);
    }
}


const contact1 = {
    TableName: 'contacts',
    Item: marshall({
        id: Date.now().toString(),
       name: 'John Doe',
       phone: '+915623112244', 
    }),
}

insertContact(contact1)