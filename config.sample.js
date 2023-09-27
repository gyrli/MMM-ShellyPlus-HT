//Include this into your config.js file

		{
			module: "Shelly-HT",
			header: "Shelly-HT",
			position: "bottom_left",
			config: {
				//Your Shelly HT needs to have a fixed IP (or your LAN must be supporting mDNS)
				ShellyHTApiPath_t: "http://192.168.178.126/rpc/Temperature.GetStatus?id=0",
				ShellyHTApiPath_h: "http://192.168.178.126/rpc/Humidity.GetStatus?id=0",
				ShellyHTApiPath_b: "http://192.168.178.126/rpc/DevicePower.GetStatus?id=0",
				RefreshInterval: "5000", //milliseconds
				displayUpdated: "true",
				horizontalView: "false"

			}
		},
