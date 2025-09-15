const { S3Client, ListObjectsV2Command } = require('@aws-sdk/client-s3')

const { S3_REGION, AWS_ID, AWS_SECRET, S3_BUCKET } = process.env

const client = new S3Client({
    region: S3_REGION,
    credentials: {
        accessKeyId: AWS_ID,
        secretAccessKey: AWS_SECRET
    }
})


async function listObjectWithPrefix(prefix) {
    const cmd = new ListObjectsV2Command({
        Bucket: "aws-lessons-nodejs",
        Prefix: prefix,
    })

    try {
        const res = await client.send(cmd)
        console.log("response of list", res)
    }
    catch(error) {
        console.log("error in list", error)
    }
}

(async () => {
    await listObjectWithPrefix("medias/dir1")
})()