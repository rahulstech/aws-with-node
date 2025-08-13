const { S3Client, PutObjectCommand, CreateMultipartUploadCommand, UploadPartCommand } = require('@aws-sdk/client-s3')
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner')
const { createPresignedPost: getSignedPostUrl } = require('@aws-sdk/s3-presigned-post')

const { S3_REGION, AWS_ID, AWS_SECRET, S3_BUCKET } = process.env;

const client = new S3Client({
    region: S3_REGION,
    credentials: {
        accessKeyId: AWS_ID,
        secretAccessKey: AWS_SECRET,
    }
})

async function getPresignedPutUrl() {
    const cmd = new PutObjectCommand({
        Bucket: S3_BUCKET,
        Key: `file_${Date.now()}`,
        ContentLength: 3000, // 3000 bytes
    })
    const url = await getSignedUrl(client, cmd, {
        expiresIn: 60, // 60 seconds
    })
    return url
}

async function getPresignedPostUrl() {
    const Key = `file_${Date.now()}`
    // const cmd = new CreateMultipartUploadCommand({
    //     Bucket: S3_BUCKET,
    //     Key,
    // })

    // const { UploadId, Error } = await client.send(cmd)
    
    // console.log(`upload id = ${UploadId}`)

    // const partCmd = new UploadPartCommand({
    //     Bucket: S3_BUCKET,
    //     Key,
    //     UploadId,
    //     PartNumber: 1,
    // })

    // const url = await getSignedUrl(client, partCmd)
    // return url

    return await getSignedPostUrl(client, {
        Bucket: S3_BUCKET,
        Key,

    })
}

(async ()=> {
    // const url = await getPresignedPutUrl()
    const url = await getPresignedPostUrl()
    console.log(url)
})()