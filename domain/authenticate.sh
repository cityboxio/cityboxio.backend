#!/bin/sh
# ref: Exploring The JSON Web Token (JWT) http://ras-software-blog.com/?p=107

header={"typ":"JWT","alg":"HS256"}
payload={"FirstName":"Rob","LastName":"Stanfield","Occupation":"Software Developer"}
secret_key=ABC

# Base64 encode the header
header=`echo -n $header | base64`
payload=`echo -n $payload | base64` #NOTE reflink used a custom base64url.sh
secret_key=`echo -n "$header.$payload" | openssl sha256 -hmac $secret_key`

echo $header
echo $payload
echo $secret_key
