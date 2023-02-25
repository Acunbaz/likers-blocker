import { storage } from "webextension-polyfill";
import Badge from "../Badge";
import { injectIcons } from "../icons";
import { localizeUI } from "../Localization";
import Messenger from "../Messages";
import Storage, { Key } from "../Storage";
import BlockSpeedSlider from "./BlockSpeedSlider";
import ImportExport from "./ImportExport";
import "./options.scss";
import ScrollSpeedSlider from "./ScrollSpeedSlider";

(function () {
	localizeUI();
	injectIcons();
	ImportExport.init();
	BlockSpeedSlider.init();
	ScrollSpeedSlider.init();

	Messenger.onQueueUpdate(async ({ queueLength }) => {
		console.debug("📫 Popup: QueueUpdate Message", "🤔💭");
		return Badge.updateBadgeCount(queueLength);
	});

	const resetButton = document.querySelector("#resetButton");
	const clearButton = document.querySelector("#clearButton");

	if (resetButton) {
		resetButton.addEventListener("click", async () => {
			await Storage.remove(Key.blocksPerMinute, false);
			await Storage.remove(Key.scrollsPerMinute, false);
			BlockSpeedSlider.init();
			ScrollSpeedSlider.init();
		});
	}

	if (clearButton) {
		clearButton.addEventListener("click", async () => {
			await storage.local.clear();
		});
	}
})();
