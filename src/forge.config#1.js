// If you have set config.forge to a JavaScript file path in package.json:
// Only showing the relevant configuration for brevity
module.exports = {
	makers: [
		{
			name: "@electron-forge/maker-squirrel",
			config: {
				name: "Swahili_Bible",
				setupExe: "Swahili Bible.exe",
				setupIcon: "src/icons/swahili_bible.ico",
				author: "FEMAG",
				noMsi: false,
				setupMsi: "Swahili Bible",
			},
		},
		{
			name: "@electron-forge/maker-zip",
			platforms: ["darwin", "linux"],
			config: {
				// Config here
			},
		},
		{
			name: "@electron-forge/maker-deb",
			config: {},
		},
		{
			name: "@electron-forge/maker-rpm",
			config: {},
		},
	],
};
