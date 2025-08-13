const { DeleteObjectCommand, DeleteObjectsCommand } = require('@aws-sdk/client-s3');
const { s3Client } = require('./s3client');
const s3client = require('./s3client');

const BUCKET_NAME = "aws-lessons-nodejs"

// delete single object 
async function deleteObject(Key) {
	const cmd = new DeleteObjectCommand({
		Bucket: BUCKET_NAME,
		Key, // key must points to an exact object not a folder, otherwise nothing will be delete but 204 will be returned
	});

	/**
	 * NOTE even if any object with the given does not exists the delete command success
	 * example response like;
	 * {
		'$metadata': {
				httpStatusCode: 204,
				requestId: '8JM20APYHW9Z3K0D',
				extendedRequestId: 'hICvdlaQxa8tC44+y5QvmKY+1uAe+SMQKEcpdNRCUChIyj4DQBH63AKkcTbV94BpwIYTUFeMQeaFMvkpZnL02w==',
				cfId: undefined,
				attempts: 1,
				totalRetryDelay: 0
			}
		}
	 */

	const res = await s3Client.send(cmd);
	console.log(res);
}

// delete multiple objects
async function deleteMultipleObjects(keys) {
	const cmd = new DeleteObjectsCommand({
		Bucket: BUCKET_NAME, 
		Delete: {
			Objects: keys.map( Key => ({ Key })) // here also the key must be exact
		}
	})

	const res = await s3Client.send(cmd);
	console.log(res);
}

// delete existing object; upload the object first in the s3 bucket manually
deleteMultipleObjects(
	[
		"medias/GUEST/1755053892875/7ef357fa-acb6-415f-aa3a-c5af714db956",
		"medias/GUEST/1755053892875/cbb50697-fd6b-4c69-8a87-3f730ff791c1",
		"medias/GUEST/1755053892875/" // delete the directory also
	]
);

// delete non-existing object
// deleteObject('non-existing.jpg');
