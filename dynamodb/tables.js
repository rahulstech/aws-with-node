const {  CreateTableCommand, DeleteTableCommand, TimeToLiveStatus, UpdateTimeToLiveCommand } = require("@aws-sdk/client-dynamodb");
const { dbclient } = require('./client.js');

async function createContactsTable() {
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
    
        TimeToLiveStatus: 'ENABLED',
        
    }

    // ttl is enabled in table table after the table creation, no extra charges for auto delete
    // DynamoDB checks the expiration time in epoch seconds from the attibute name specified in the UpdateTimeToLiveCommand
    // i can use any attribute of type number to store the expiration second.
    // for example:here i will store the expiration second in autoDeleteAt attribute
    const ttlSpecs = {
        TableName: 'contacts',
        TimeToLiveSpecification: {
            Enabled: true,
            AttributeName: 'autoDeleteAt'
        }
    }


    try {

        // first  create the table
        const res = await dbclient.send(new CreateTableCommand(params));
        // then enable ttl
        const resTTL = await dbclient.send(new UpdateTimeToLiveCommand(ttlSpecs));
        console.log(`table created successfully`, res)
        console.log(`resTTL `, resTTL)
    }
    catch(ex) {
        console.log(`table create error ${ex}`)
    }
}

function createTable(name) {
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

module.exports = { createTable, dropTable }
