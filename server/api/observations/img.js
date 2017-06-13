var s3Stream = require('s3-upload-stream')(new AWS.S3());

var AWS = require('aws-sdk');
AWS.config.update({ region: 'us-west-2' });

var upload = s3Stream.upload({
    Bucket: UPLOADS_BUCKET,
    Key: key,
    ContentType: part.type,
    ACL: 'private',
});

var UPLOADS_BUCKET = process.env.UPLOADS_BUCKET || 'ac-user-uploads-qa';

function streamUpload(img_stream) {
    var upload = s3Stream.upload({
        Bucket: UPLOADS_BUCKET,
        Key: key,
        ContentType: part.type,
        ACL: 'private',
    });

    part.pipe(orienter).pipe(upload);

    upload.on('error', function(error) {
        logger.info('Error uploading object to S3 : %s', error);
        callback('Error uploading object to S3 ' + error);
        isDone.resolve();
    });

    upload.on('uploaded', function(details) {
        logger.info('Uploaded object to S3 : %s', JSON.stringify(details));
        isDone.resolve();
    });
}
