@app
sms-db-updater # the project name

@events
new-sms # a pub/sub event to do background work

@http
get / # root route handler
post /sms # inbound SMS webhook

@tables
things # a super generic table to stash stuff
  thingID *String

@aws
runtime nodejs16.x
architecture arm64
