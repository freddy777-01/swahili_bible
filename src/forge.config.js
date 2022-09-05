module.exports = {
	packagerConfig: {
		extecutableName: "Swahili Bible",
		overwrite: true,
		asar: false,
		icon: "src\\icons\\swahili_bible.ico",
	},
	publishers: {
		name: "@electron-forge/publisher-github",
		config: {
			repository: {
				owner: "freddy777-01",
				name: "swahili_bible",
			},
			prerelease: false,
		},
	},
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
	],
};
