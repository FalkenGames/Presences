const presence = new Presence({
		clientId: "630790482804473857"
	}),
	crossover: unknown[] = [],
	tags = [
		"/anime/",
		"/book/",
		"/cartoon/",
		"/comic/",
		"/game/",
		"/misc/",
		"/movie/",
		"/play/",
		"tv"
	],
	browsingTimetsamp = Math.floor(Date.now() / 1000);
let anime;
for (let i = 0; i < tags.length; i++) crossover.push([`/crossovers${tags[i]}`]);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "banner",
		startTimestamp: browsingTimetsamp
	};

	if (document.location.pathname === "/") {
		presenceData.details = "Browing fanfics";
		presenceData.state = "at Homepage";
		presenceData.smallImageKey = "logo";
		presenceData.smallImageText = "browsing";
	} else if (tags.includes(document.location.pathname)) {
		presenceData.details = "Exploring Fanfics";
		presenceData.state = `Catagory: ${document.location.pathname.replace(
			"/",
			" "
		)} `;
		presenceData.smallImageKey = "logo";
		presenceData.smallImageText = document.location.href;
	} else if (document.location.pathname.startsWith("/s/")) {
		presenceData.details = "Reading Fanfiction..";
		presenceData.state = `title: ${document.location.pathname
			.replace("/s/", "")
			.split("/")
			.join("")
			.replace(/\d+/, "")
			.replace("crossovers", "")
			.split("-")
			.join(" ")} `;
		presenceData.smallImageKey = "logo";
		presenceData.smallImageText = document.location.href;
		presence.setActivity(presenceData);
	} else if (crossover.includes(document.location.pathname)) {
		presenceData.details = "Exploring Fanfics";
		presenceData.state = `Catagory: ${document.location.pathname
			.replace("crossovers", "")
			.replace("/", " ")} (Crossover) `;
		presenceData.smallImageKey = "logo";
		presenceData.smallImageText = document.location.href;
	} else if (/\d/.test(document.location.pathname)) {
		anime = document.location.pathname
			.split("/")
			.join("")
			.replace(/\d+/, "")
			.replace("crossovers", "");

		presenceData.details = "Exploring Fanfics";
		presenceData.state = `Looking for ${anime} `;
		presenceData.smallImageKey = "logo";
		presenceData.smallImageText = document.location.href;
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
