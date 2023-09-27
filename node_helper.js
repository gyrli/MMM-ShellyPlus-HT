var NodeHelper = require("node_helper");
const request = require('request');
module.exports = NodeHelper.create({


	start:  function() {

	},
// Frontend module pings the node helper to fetch data from Shelly HT
	socketNotificationReceived:  function (notification, payload) {
		if (notification == "GetShelly_temp"){
			//Parameters: notification can be anything (not used), payload must be the URL of the Shelly HT status api
			self = this;
			request(payload, {json: true }, (err, res, body) => {
				if (err) { return console.log(err); }
				currentdate = new Date();
				var options = { month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
				var printed_date = new Intl.DateTimeFormat('de', options).format(currentdate);
				payload= {
					tmp: body.tC,
					updated: printed_date
				}
				console.log("Sending Shelly data to FE module", payload);
				//Only sending back temperature in Celsius and Humidity %.
				//Also, since Shelly HT is mostly asleep (see Shelly documentation),
				//Adding a "last updated" timestamp as well for displaying
				//TODO: add battery percentage maybe as well
				self.sendSocketNotification('ShellyHTData_temp',payload)
			});
		}
		if (notification == "GetShelly_hum"){
			//Parameters: notification can be anything (not used), payload must be the URL of the Shelly HT status api
			self = this;
			request(payload, {json: true }, (err, res, body) => {
				if (err) { return console.log(err); }
				currentdate = new Date();
				var options = { month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
				var printed_date = new Intl.DateTimeFormat('de', options).format(currentdate);
				payload= {
					hum: body.rh,
					updated: printed_date
				}
				console.log("Sending Shelly data to FE module", payload);
				//Only sending back temperature in Celsius and Humidity %.
				//Also, since Shelly HT is mostly asleep (see Shelly documentation),
				//Adding a "last updated" timestamp as well for displaying
				//TODO: add battery percentage maybe as well
				self.sendSocketNotification('ShellyHTData_hum',payload)
			});
		}
		if (notification == "GetShelly_pow"){
			//Parameters: notification can be anything (not used), payload must be the URL of the Shelly HT status api
			self = this;
			request(payload, {json: true }, (err, res, body) => {
				if (err) { return console.log(err); }
				currentdate = new Date();
				var options = { month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
				var printed_date = new Intl.DateTimeFormat('de', options).format(currentdate);
				payload= {
					bat: body.battery.percent + "%(" + body.battery.V + " V)",
					updated: printed_date
				}
				console.log("Sending Shelly data to FE module", payload);
				//Only sending back temperature in Celsius and Humidity %.
				//Also, since Shelly HT is mostly asleep (see Shelly documentation),
				//Adding a "last updated" timestamp as well for displaying
				//TODO: add battery percentage maybe as well
				self.sendSocketNotification('ShellyHTData_pow',payload)
			});
		}

	}
});
