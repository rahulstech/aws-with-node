const { SQSClient, SendMessageCommand, DeleteMessageCommand, ReceiveMessageCommand } = require('@aws-sdk/client-sqs')

// this url is avaialble in AWS Console under the queue details 
const QUEUE_URL = process.env.SQS_QUEUE_URL;

const client = new SQSClient({
    region: process.env.SQS_REGION,
    credentials: {
        secretAccessKey: process.env.AWS_SECRET,
        accessKeyId: process.env.AWS_ID
    }
})

async function sendMessage(message) {
    const cmd = new SendMessageCommand({
        QueueUrl: QUEUE_URL,
        MessageBody: JSON.stringify(message)
    })

    try {
        const result = await client.send(cmd)
        console.log(result)
    }
    catch(err) {
        console.log("send message error ", err)
    }
}

async function getMessage(poll=20) {
    const cmd = new ReceiveMessageCommand({
        QueueUrl: QUEUE_URL,
        WaitTimeSeconds: poll,
        MaxNumberOfMessages: 1
    })
    try {
        // this response object contains '$metadata' object
        // '$metadata'.httpStatusCode contains the http response code for the request
        const result = await client.send(cmd)
        console.log(result)
        // Messages is a list of Message objects. Each Message object contains the following
        // Body: the actual message content
        // MD5OfBody: md5 encrypted same message content
        // MessageId: the SQS generated unique if of the message 
        // ReceiptHandle: used to delete this perticual message from queue
        return result.Messages;
    }
    catch(err) {
        console.log("send message error ", err)
    }
}

async function deleteMessage(handle) {
    const cmd = new DeleteMessageCommand({
        QueueUrl: QUEUE_URL,
        ReceiptHandle: handle
    })

    try {
        // this response contains only '$metadata' nothing else
        // if there is an error then Error object is also avaialble with
        // Type
        // Code
        // message
        const result = await client.send(cmd)
        console.log(result)
    }
    catch(err) {
        console.log("delete message error ", err)
    }
}

(async () => {
    console.log("========= send message ==========")
    await sendMessage({
        user_id: "USER#1",
        note_id: "NOTE#1",
        media_key: "medias/USER#1/NOTE#1/media1.png"
    })

    console.log("========= get message ==========")
    const messages = await getMessage()

    console.log("========= delete message ==========")
    await deleteMessage(messages[0].ReceiptHandle )
})()