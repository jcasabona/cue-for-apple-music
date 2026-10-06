import { action, SingletonAction, type KeyDownEvent } from "@elgato/streamdeck";

import { getCurrentPlaylist } from "../music/applescript.js";

/** How long the playlist name stays on the key. */
const DISPLAY_MS = 4_000;

/** Shows the name of the playlist that is playing. */
@action({ UUID: "org.casabona.musiccontrols.current-playlist" })
export class CurrentPlaylist extends SingletonAction {
	/**
	 * Shows the current playlist's name on the key for a few seconds.
	 * @param ev Event, including the action that was pressed.
	 */
	override async onKeyDown(ev: KeyDownEvent): Promise<void> {
		const name = await getCurrentPlaylist();
		if (name === undefined) {
			await ev.action.showAlert();
			return;
		}

		await ev.action.setTitle(name);
		setTimeout(() => void ev.action.setTitle(""), DISPLAY_MS);
	}
}
