Module.register("MMM-ShellyPlus-HT",{
	// Default module config.
	defaults: {
		//Just a mock API I used for development
		ShellyHTApiPath: "http://www.mocky.io/v2/5e9999183300003e267b2744",
		ShellyHTApiPath_t: "http://192.168.178.126/rpc/Temperature.GetStatus?id=0",
		ShellyHTApiPath_h: "http://192.168.178.126/rpc/Humidity.GetStatus?id=0",
		ShellyHTApiPath_b: "http://192.168.178.126/rpc/DevicePower.GetStatus?id=0",
		RefreshInterval: 3000,
		displayUpdated: true,
		horizontalView: false
	},
	//After startup, we don't have data and might not have it for a long time, until Shelly HT wakes up.
	ShellyHTData: {
		tmp: "--",
		hum: "--",
		bat: "--",
		updated: "--"
	},
	getStyles: function () {
		return ["MMM-ShellyPlus-HT.css", "font-awesome.css"];
	},
	start: function() {
		var self = this;

		// Schedule update timer.
		setInterval(function() {
			self.sendSocketNotification("GetShelly_temp", self.config.ShellyHTApiPath_t);
			self.sendSocketNotification("GetShelly_hum" , self.config.ShellyHTApiPath_h);
			self.sendSocketNotification("GetShelly_pow" , self.config.ShellyHTApiPath_b);
			self.updateDom();
		}, this.config.RefreshInterval ); //perform every 1000 milliseconds.


	},

	  socketNotificationReceived: function (notification, payload) {
		switch (notification) {
		case 'ShellyHTData_temp':
			Log.log(this.name + " received a socket notification: " + notification + " - Temp: " + payload.tmp +  "    Updated: " + payload.updated);
			this.ShellyHTData.tmp = payload.tmp
			this.ShellyHTData.updated = payload.updated
			break
		case 'ShellyHTData_pow':
			Log.log(this.name + " received a socket notification: " + notification + " - Battery: " + payload.bat  + "   Updated: " + payload.updated);
			this.ShellyHTData.bat = payload.bat
			this.ShellyHTData.updated = payload.updated
			break
		case 'ShellyHTData_hum':
			Log.log(this.name + " received a socket notification: " + notification + " - Hum: " + payload.hum + "    Updated: " + payload.updated);
			this.ShellyHTData.hum = payload.hum
			this.ShellyHTData.updated = payload.updated
			break
		}
	},


	// Override dom generator.
	getDom: function() {
		var wrapper = document.createElement("div");
		var tmp = this.translate("TEMPERATURE");
		var hum = this.translate("HUMIDITY");
		var bat = this.translate("BATTERY", {"bat": this.ShellyHTData.bat})
		var updated = this.translate("UPDATED", {"upd": this.ShellyHTData.updated})
		ihtml =  "<div class='container'>"
		if (this.config.horizontalView) {
			ihtml += "  <div class='right'><sup>" + hum + "</sup> " + this.ShellyHTData.hum + " %</div>"
			ihtml += "  <div class='right'><sup>" + tmp + "</sup> " + this.ShellyHTData.tmp + " ℃</div>"
		} else {
			ihtml += "  <div class='newline'><sup>" + hum + "</sup>" + this.ShellyHTData.hum + " %</div>"
			ihtml += "  <div class='newline'><sup>" + tmp + "</sup>" + this.ShellyHTData.tmp + " ℃</div>"
		}
		if (this.config.displayUpdated){
			ihtml += "  <p class='bottom'>" + bat + " " +  updated + "</p>"
		}
		ihtml += "</div>"
		wrapper.innerHTML = ihtml
		return wrapper
	},
	getTranslations: function() {
        return  {
			de:	'translations/de.json',
			nl:	'translations/nl.json',
			en: 'translations/en.json'
		};
	}
});
