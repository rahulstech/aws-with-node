const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");

const client = new DynamoDBClient({
    region: 'ap-south-1',
    endpoint: 'http://localhost:8000'
})

module.exports = { dbclient: client }