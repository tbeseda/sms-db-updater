@app
sms-dynamo-vonage

@events
new-sms

@http
get /
post /sms

@tables
data
  scopeID *String
  dataID **String
  ttl TTL
