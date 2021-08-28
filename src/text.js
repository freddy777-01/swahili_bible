    /*{
          "name": "@electron-forge/maker-squirrel",
          "config": {
            "name": "Swahili_Bible",
            "setupExe": "Swahili_Bible.exe",
            "setupIcon": "src\\icons\\swahili_bible.ico",
            "author": "Freddy Makaranga",
            "noMsi": false,
            "setupMsi": "Swahili_Bible"
          }
        },*/
        let mix = 
         {
            "name": "@electron-forge/maker-wix",
            "config": {
              "description": "Holly Bible in swahili Language",
              "exe": "Swahili Bible",
              "name": "Swahili Bible",
              "manufacturer": "FEMAG",
              "version": "1.0.0",
              "shortName": "SWB",
              "ui": {
                "chooseDirectory": true,
                "images": {
                  "background": "\\src\\icons\\swahili_bible_bg.png",
                  "banner": "src\\icons\\swahili_bible_banner.png"
                }
              }
            }
          }