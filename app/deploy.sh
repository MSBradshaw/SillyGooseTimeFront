#! /bin/bash

npm run-script build
aws s3 cp ./build s3://silly-goose-time-front --recursive --acl public-read --profile sillygoose
