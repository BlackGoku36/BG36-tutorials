# Introduction

Save/load is one of the most important feature in game, whether it is single-player or multi-player game. In case of single-player, the game data can be saved to local drive, with encryption so that cheating is not made easy. On other hand, in multi-players game, game data is saved on the server hosted by the game development group.

Ever wondered how this is generally done? Well, Saving and loading mechanism can be done by simply writing data into file and reading from it. [Json](https://en.wikipedia.org/wiki/JSON) and [Xml](https://en.wikipedia.org/wiki/XML) file formats are popularly used for this purpose for small game. In commercial games, things such as file size, encryption, etc. need to be taken care of, but for this tutorial we will just be exporting and reading from json. I will leave other stuffs up to you.

This tutorial is divided into 3 parts:
1. We will look into writing and reading file in-game.
2. Add saving and loading cube's properties.
3. UI for saving and loading the game.

At the end, we get:
<iframe width="640" height="480" src="https://blackgoku36.github.io/armory-tutorials/Armory/src/save_load_final.mp4" frameborder="0" allowfullscreen> </iframe>

If anything goes wrong, then you can check the [source code](https://github.com/BlackGoku36/armory-tutorial-download/tree/master/SaveLoadMechanism)
