const { dbclient } = require('./client.js')
const { UpdateItemCommand } = require('@aws-sdk/client-dynamodb')
const { marshall } = require('@aws-sdk/util-dynamodb')

async function updateContact(id, { name, phone }) {
    try {
        // Note: how i mashalled the Key and ExpressionAttributeValue
        const res = await dbclient.send(new UpdateItemCommand({
            TableName: 'contacts',
            Key: marshall({ id }),
            UpdateExpression: "SET phone = :phone, #name = :name",
            ExpressionAttributeNames: {
                // name is a reserved keyword in dynamodb therefore i can not use name = :name
                // so i used named expression #name and set its value to the field name 'name'
                // during command execution this #name expression will be replace with 'name' (without quotes)
                // Note: # is used the denote an expression
                "#name": "name", 
            },
            ExpressionAttributeValues: marshall({
                ':name': name,
                ':phone': phone,
            }),
        }));
        console.log('response ', res);
    }
    catch(ex) {
        console.log(ex);
    }
}

function update(table) {
    if (table == 'contacts') {
        const params = process.argv.slice(4);
        const [id,name,phone] = params;
        const newValues = {}
        if (name) {
            newValues['name'] = name;
        }
        if (phone) {
            newValues['phone'] = phone;
        }
        updateContact(id, newValues);
    }
}

module.exports = { update }