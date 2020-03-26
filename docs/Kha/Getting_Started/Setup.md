Setting up kha is relatively easy. Kha comes with its own haxe version, so no need to worry about installing haxe. Kha have different workflow, i.e., Kode Studio, Git and Haxelib. You can find about them [here](https://github.com/Kode/Kha/wiki/Getting-Started). We are going to VSCode + Git workflow, that almost everyone uses.

1. Download and install:
	* [git](https://git-scm.com/).
	* [nodejs](https://nodejs.org/en/). (To use kha from command line)
	* [VSCode](https://code.visualstudio.com/).
2. Git clone kha recursively, wherever you want.
```
git clone --recursive https://github.com/Kode/Kha.git
```

3. In `VSCode - extension`, install [Kha extension pack](https://marketplace.visualstudio.com/items?itemName=kodetech.kha-extension-pack) and [Haxe extension pack](https://marketplace.visualstudio.com/items?itemName=vshaxe.haxe-extension-pack).
4. Go to setting, and navigate to `Extensions - Kha - Kha Path` and enter your `path/to/Kha` that you just cloned.
5. Open an empty folder and press `F1` (`fn`+`F1` on macOS) and enter `Kha: Init Project`. New starter Kha project should be created.
6. Go to `Run` panel, select `Kha: HTML5` from dropdown and press triangle next to it to start debugging.

You should get something like this:

![](../../../docassets/kha_1.png =50%x50%)

---

### Extra: Eliminating cache building issues

Kha cache code to improve build times. But sometime Kha doesn't detect changes made in code (this usually happen with small code changes such as typo fixes, variable changes, etc) and uses cached code and so the changes made doesn't appear. This can make programmer scratch their heads or even possible make them throw their laptop/pc out of window. You will have to delete build folder every time before running to avoid this issue. This can be solved with VSCode's tasks.

1. Press `F1` (`fn` + `F1` on macOS) and enter `Tasks: Configure Task` and select `Kha: Build for Debug HTML5`.
2. Paste:
```json
{
    "version": "2.0.0",
    "tasks": [
        {
            "label": "Clean Build",
            "type": "shell",
			// "command": "rm -r \"${workspaceRoot}/build\"" 
			// Uncomment above line if you are on unix (Linux/macOS)
			// "command": "rmdir /Q /S \"${workspaceRoot}/build\"" 
			// Uncomment above line if you are on windows
        },
        {
            "type": "Kha",
            "target": "Debug HTML5",
            "problemMatcher": [
                "$haxe-absolute",
                "$haxe"
            ],
            "dependsOn": [
                "Clean Build"
            ],
            "group": {
                "kind": "build",
                "isDefault": true
            }
        }
    ]
}  
```
It just delete your `build` folder before the build process start.

---

### Extra: Removing that `Allow incoming connection blah blah blah` on macOS, every time you use Krom.

To get around this [annoying thing](https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.kym-cdn.com%2Fphotos%2Fimages%2Fnewsfeed%2F000%2F968%2F291%2F682.gif&f=1&nofb=1), VSCode's tasks comes to rescue once again.

1. Open `task.json`
2. Add below object to `tasks` array:
```json
{
	"label": "Build Krom",
	"type": "shell",
	"command": "node path/to/Kha/make krom"
},
{
	"label": "Krom",
	"type": "shell",
	"command": "path/to/Krom.app/Contents/MacOS/Krom ${workspaceRoot}/build/krom ${workspaceRoot}/build/krom-resources",
	"dependsOn": [
		"Clean Build",
		"Build Krom"
	],
	"dependsOrder": "sequence",
	"problemMatcher": []
}
```