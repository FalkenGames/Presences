const presence = new Presence({
		clientId: "904072771900948570"
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "teamseas"
		},
		currentCount = await presence.getSetting<boolean>("count");

	if (currentCount) {
		presenceData.details = `$${
			document.querySelector("#liveCounter")?.textContent
		}`;
		presenceData.state = "Currently Donated";
	} else {
		presenceData.details = "Helping #TeamSeas clean";
		presenceData.state = "30million pounds by 2022";
	}
	presenceData.startTimestamp = browsingTimestamp;
	presenceData.buttons = [
		{ label: "Visit #TeamTrees", url: "https://teamtrees.org" }
	];

	presence.setActivity(presenceData);
});
