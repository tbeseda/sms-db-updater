@app
sms-dynamo-vonage

@aws
runtime nodejs16.x
architecture arm64

@events
inbound-sms
outbound-sms

@http
get /
post /sms

@tables
things
  thingID *String
