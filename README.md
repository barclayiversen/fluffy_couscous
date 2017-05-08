Node api with twilio 2fa. 

You'll need to create a .env for this.
There's an example .env included for reference. 

This example uses redis as a cache, the twilio api to send text messages and various other plugins that require you set up additional resources. Take a look at the .env example for an idea of what you will need to actually run this server. npm start will get everything installed and start the server for you but without a redis server available it will err. 

Already have all the things mentioned and a .env file ready to go?

$ npm start 

