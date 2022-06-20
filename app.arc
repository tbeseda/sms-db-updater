@app
sms-dynamo-vonage

@events
inbound-sms
outbound-sms

@http
get /
post /sms

@tables
things
  thingID *String
