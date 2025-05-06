const { dbclient } = require('./client')
const { DeleteItemCommand } = require('@aws-sdk/client-dynamodb')

async function deleteContactById(id) {
    try {
        const res = await dbclient.send(new DeleteItemCommand({
            TableName: 'contacts',
            Key: { id: { S: id }}, // or simply marshal({ id }) 
        }));
        console.log('response ', res)
    }
    catch(ex) {
        console.log(ex)
    }
}

function deleteById(table) {
    if (table == 'contacts') {
        const id = process.argv[4];
        deleteContactById(id);
    }
}

module.exports = { deleteById }