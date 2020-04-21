#! /bin/bash

npm run-script build
aws s3 cp ./build s3://silly-goose-time-front --recursive --acl public-read --profile sillygoose
aws cloudfront create-invalidation --distribution-id E3ATUT0WZ1Y4M6 --paths "/*" --profile sillygoose
