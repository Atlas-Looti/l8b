export const BLENDING_MODES: Record<string, GlobalCompositeOperation> = {
	normal: "source-over",
	additive: "lighter",
};

const MODES = [
	"source-over",
	"source-in",
	"source-out",
	"source-atop",
	"destination-over",
	"destination-in",
	"destination-out",
	"destination-atop",
	"lighter",
	"copy",
	"xor",
	"multiply",
	"screen",
	"overlay",
	"darken",
	"lighten",
	"color-dodge",
	"color-burn",
	"hard-light",
	"soft-light",
	"difference",
	"exclusion",
	"hue",
	"saturation",
	"color",
	"luminosity",
];

for (const mode of MODES) {
	BLENDING_MODES[mode] = mode as GlobalCompositeOperation;
}
