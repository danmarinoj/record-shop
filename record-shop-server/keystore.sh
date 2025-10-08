#!/bin/bash

# certbot renew

CERT_DIR=/etc/letsencrypt/live/doubledsrecords.com

# create a PKCS12/PFX file containing the new private key and certificates 
openssl pkcs12 -export \
	-in $CERT_DIR/fullchain.pem -inkey $CERT_DIR/privkey.pem \
	-out /tmp/server.p12 -name ddrecords

# convert the PKCS12 file into a JKS Java keystore
keytool -importkeystore -deststorepass $KEYSTORE_PASS -destkeypass $KEYSTORE_PASS \
	-destkeystore /tmp/keystore.jks \
	-srckeystore /tmp/server.p12 -srcstoretype PKCS12 -srcstorepass password -alias ddrecords

