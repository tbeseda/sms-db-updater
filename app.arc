@app
sms-db-updater # the project name

@events
new-sms # a pub/sub event to do background work

@http
get / # root route handler
post /sms # inbound SMS webhook

@tables
data
  scopeID *String
  dataID **String
  ttl TTL
