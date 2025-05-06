const { dbclient } = require('./client.js');
const { ScanCommand, GetItemCommand } = require('@aws-sdk/client-dynamodb')
const { unmarshall, marshall } = require('@aws-sdk/util-dynamodb')

async function readAllContacts() {
    try {
        const res = await dbclient.send(new ScanCommand({ 
            TableName: 'contacts',
            // AttributesToGet: ['id', 'name'], // projection
        }));
        console.log('response ', res)
        const items = res.Items.map( item => unmarshall(item))
        console.log('items: ', items)
    }
    catch(ex) {
        console.log(ex)
    }
}

async function readContactById(id) {
    try {
        const res = await dbclient.send(new GetItemCommand({
            TableName: 'contacts',
            Key: marshall({ id })
        }));
        console.log('response ', res)
        if (res.Item) {
            console.log(`contact by id ${id} `, unmarshall(res.Item))
        }
    }
    catch(ex) {
        console.log(ex);
    }
}

function readAll(table) {
    if (table == 'contacts') {
        readAllContacts()
    }
}

function readById(table) {
    if (table == 'contacts') {
        const id = process.argv[4]
        readContactById(id)
    }
}

module.exports = { readAll, readById }