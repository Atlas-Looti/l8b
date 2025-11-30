/**
 * API error messages index - combines all API message categories
 */

import type { MessageTemplate } from "../../types";
import { assetMessages } from "./asset-messages";
import { audioMessages } from "./audio-messages";
import { drawMessages } from "./draw-messages";
import { inputMessages } from "./input-messages";
import { mapMessages } from "./map-messages";
import { paletteMessages } from "./palette-messages";
import { screenMessages } from "./screen-messages";
import { spriteMessages } from "./sprite-messages";
import { storageMessages } from "./storage-messages";
import { timeMessages } from "./time-messages";
import { validationMessages } from "./validation-messages";

/**
 * All API error message templates combined
 */
export const apiMessages: Record<string, MessageTemplate> = {
	...screenMessages,
	...audioMessages,
	...spriteMessages,
	...mapMessages,
	...assetMessages,
	...inputMessages,
	...storageMessages,
	...paletteMessages,
	...timeMessages,
	...drawMessages,
	...validationMessages,
};
