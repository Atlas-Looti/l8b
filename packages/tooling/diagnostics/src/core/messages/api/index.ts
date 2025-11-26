/**
 * API error messages index - combines all API message categories
 */

import { screenMessages } from "./screen-messages";
import { audioMessages } from "./audio-messages";
import { spriteMessages } from "./sprite-messages";
import { mapMessages } from "./map-messages";
import { assetMessages } from "./asset-messages";
import { inputMessages } from "./input-messages";
import { storageMessages } from "./storage-messages";
import { paletteMessages } from "./palette-messages";
import { timeMessages } from "./time-messages";
import { drawMessages } from "./draw-messages";
import { validationMessages } from "./validation-messages";
import type { MessageTemplate } from "../../types";

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
