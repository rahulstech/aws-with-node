const { dbclient } = require('./client.js');
const { ScanCommand } = require('@aws-sdk/client-dynamodb')
const { unmarshall } = require('@aws-sdk/util-dynamodb')

async function readAll() {
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

readAll()