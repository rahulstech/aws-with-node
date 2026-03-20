const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");

const client = new DynamoDBClient({
    region: 'ap-south-1',
    endpoint: 'http://localhost:9000'
})

module.exports = { 
    dbclient: client,
    DDB_TABLE_NAME: "aws_with_node_demo",
 }