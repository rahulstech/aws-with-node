const { QueryCommand } = require("@aws-sdk/client-dynamodb");
const { dbclient, DDB_TABLE_NAME,  } = require("./client");
const { marshall, unmarshall } = require("@aws-sdk/util-dynamodb");

async function getItems() {
    const { Items } = await dbclient.send(new QueryCommand({
        TableName: DDB_TABLE_NAME,
        KeyConditionExpression: "PK = :pk AND SK = :sk",
        ExpressionAttributeValues: marshall({
            ":pk": "GUEST",
            ":sk": "note1",
        }),
        ProjectionExpression: "#amedias.#kmgid1.#astatus, #amedias.#kmgid2.#astatus",
        ExpressionAttributeNames: {
            "#amedias": "medias",
            "#astatus": "status",
            "#kmgid1": "enc_global_id_1",
            "#kmgid2": "enc_global_id_3"
        },
        Limit: 1
    }));

    if (Items && Items.length > 0) {
        const item = unmarshall(Items[0]);
        console.log(item);
    }
    else {
        console.log('no item found')
    }
}

(async () => {
    await getItems()
})()