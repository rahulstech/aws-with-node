const { SQSClient, DeleteMessageBatchCommand, SendMessageBatchCommand, ReceiveMessageCommand } = require('@aws-sdk/client-sqs')

const messages = Array.from({ length: 5}, (_,index) => `this is message ${index}`)

const { AWS_ID, AWS_SECRET, SQS_REGION, SQS_QUEUE_URL } = process.env

const client = new SQSClient({
    region: SQS_REGION,
    credentials: {
        accessKeyId: AWS_ID,
        secretAccessKey: AWS_SECRET
    }
})

async function enqueueMultipleMessages() {
    const cmd = new SendMessageBatchCommand({
        QueueUrl: SQS_QUEUE_URL,
        Entries: messages.map((message, index) => {
            return {
                Id: `message_${index}`,
                MessageBody: message,
                MessageAttributes: {
                    SourceType: {
                        DataType: "String",
                        StringValue: "aws-with-node"
                    }
                }
            }
        })
    })

    try {
        const response = await client.send(cmd)
        console.log("response of send batch message", response)
    }
    catch(error){
        console.log("error during send batch message", error)
    }
}

async function dequeueMultipleMessages() {
    const cmd = new ReceiveMessageCommand({
        QueueUrl: SQS_QUEUE_URL,
        WaitTimeSeconds: 20,
        MaxNumberOfMessages: 10
    })

    try { 
        const { Messages } = await client.send(cmd)
        console.log("received messages ", JSON.stringify(Messages, null, 2))

        removeMessages(Messages.map(msg => msg.ReceiptHandle))
    }
    catch(error) {
        console.log("error on message receive", error)
    }
}

async function removeMessages(receiptHandles) {
    const cmd = new DeleteMessageBatchCommand({
        QueueUrl: SQS_QUEUE_URL,
        Entries: receiptHandles.map((value, index) => {
            return {
                Id: `message_${index}`,
                ReceiptHandle: value
            }
        })
    })

    try {
        const response = await client.send(cmd)
        console.log("response from delete multiple messages ", response)
    }
    catch(error) {
        console.log("error during delete batch message", error)
    }
}

(async () => {
    // await enqueueMultipleMessages()

    await dequeueMultipleMessages()
})()