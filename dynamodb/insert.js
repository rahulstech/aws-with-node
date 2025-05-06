const { PutItemCommand, ReturnValue } = require('@aws-sdk/client-dynamodb')
const { marshall } = require('@aws-sdk/util-dynamodb')
const { dbclient } = require('./client.js')

async function insertContact({ name, phone, autoDeleteAt }) {
    const contact = {
        TableName: 'contacts',
        Item:  marshall({
            id: Date.now().toString(),
            name,
            phone,
            autoDeleteAt
        }),
    }
    
    try {
        const res = await dbclient.send(new PutItemCommand(contact));
        console.log(`contact added successfully `, res)
    }
    catch(ex) {
        console.log(ex);
    }
}

function insert(table) {
    if (table == 'contacts') {
        const params = process.argv.slice(4)
        const [name,phone,autoDeleteAfter] = params
        const autoDeleteAt = Math.floor(Date.now()/1000) + Number(autoDeleteAfter);
        insertContact({name,phone,autoDeleteAt})
    }
}

module.exports = { insert }