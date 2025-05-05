const {  CreateTableCommand, DeleteTableCommand } = require("@aws-sdk/client-dynamodb");
const { dbclient } = require('./client.js');

const params = {
    TableName: 'contacts',

    /**
     * attributes defined in KeySchema and AttributeDefinitions must be same
     */
    KeySchema: [
        { AttributeName: "id", KeyType: "HASH" }
    ],
    AttributeDefinitions: [
        { AttributeName: "id", AttributeType: "S" },

        /**
         * the table contains the following columns still these are not includede in the attribute definition because DynamoDb
         * needs attribute definitions for key attributes i.e. the primary key, sort key etc.
         */
        // { AttributeName: "name", AttributeType: "S" },
        // { AttributeName: "phone", AttributeType: "S" }
    ],
    BillingMode: "PAY_PER_REQUEST",
}

async function createContactsTable() {
    try {
        const res = await dbclient.send(new CreateTableCommand(params));
        console.log(`table created successfully ${res}`)
    }
    catch(ex) {
        console.log(`table create error ${ex}`)
    }
}

async function createTable(name) {
    if (name == 'contacts') {
        createContactsTable()
    }
}

async function dropTable(name) {
    try {
        const res = await dbclient.send(new DeleteTableCommand({
            TableName: name
        }))
        console.log('response: ',res)
    }
    catch(ex) {
        console.log(ex)
    } 
}

const args = process.argv
const command = args[2]
const param = args[3]
if (command == 'drop') {
    dropTable(param)
}
else {
    createTable(param)
}

