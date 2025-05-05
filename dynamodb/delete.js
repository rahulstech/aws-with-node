const { dbclient } = require('./client')
const { DeleteItemCommand } = require('@aws-sdk/client-dynamodb')

async function deleteContact(id) {
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

deleteContact('1746468556796')