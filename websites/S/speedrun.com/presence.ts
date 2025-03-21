const presence = new Presence({
		clientId: "639603634451120138"
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);
let title: HTMLElement;

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "run"
	};

	if (document.location.hostname === "www.speedrun.com") {
		if (document.location.pathname === "/") {
			presenceData.startTimestamp = browsingTimestamp;
			presenceData.details = "Viewing home page";
		} else if (document.location.pathname.includes("/games")) {
			presenceData.startTimestamp = browsingTimestamp;
			presenceData.details = "Viewing all games";
		} else if (document.location.pathname.includes("/streams")) {
			presenceData.startTimestamp = browsingTimestamp;
			presenceData.details = "Viewing all streams";
		} else if (document.location.pathname.includes("/thread/")) {
			title = document.querySelector(
				"#centerbar > div > div:nth-child(1) > span"
			);
			presenceData.smallImageKey = "reading";
			presenceData.startTimestamp = browsingTimestamp;
			presenceData.details = "Viewing forum post:";
			if (title.textContent.length > 128)
				presenceData.state = `${title.textContent.substring(0, 125)}...`;
			else presenceData.state = title.textContent;
		} else if (document.location.pathname.includes("/forum")) {
			presenceData.startTimestamp = browsingTimestamp;
			presenceData.details = "Browsing the forums...";
		}
	}

	if (!presenceData.details) {
		title = document.querySelector("head > title");
		presenceData.state = title.textContent.replace(" - speedrun.com", "");
		presenceData.details = "Viewing:";
		presenceData.startTimestamp = browsingTimestamp;
		presence.setActivity(presenceData);
	} else presence.setActivity(presenceData);
});
