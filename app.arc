@app
sms-dynamo-vonage

@aws
runtime nodejs16.x
architecture arm64

@events
new-sms

@http
get /
post /sms

@tables
things
  thingID *String
