# Chapter-2

In chapter-1 we got marching cubes working and we were able to check its different configurations.

We will create 32x32 volume (basically our terrain chunk), and apply marching cubes to it.

Create new Haxe script `Volume.hx`

```haxe
package;

import kha.arrays.Float32Array;

class Volume {

    // Width of volume
    public static var width = 32;
    // Height of volume
    public static var height = 32;
    // Offset of noise
    public static var offset = 1.5;

    public static function makeTerrainVolume(done:(Float32Array)->Void) {

        // Float32Array of size of volume
        var volume = new Float32Array(width * height * width);
        // Init perlin noise
        var perlin = new Perlin();

        // Iterate through volume
        for (x in 0...width){
            for(z in 0...width){
                for (y in 0...height){
                    // Create density from perlin noise, this is terribly basic terrain generation code.
                    //      height of terrain * perlin noise that is useable.
                    var density = 10 * perlin.perlin(x/ 16 + offset, y/ 16 + offset, z/ 16 + offset);
                    // Location of cube
                    var l = (x) + (y * width) + (z * height * width);
                    // Set density in volume
                    volume[l] = y-density;
                }
            }
        }
        done(volume);
    }
}
```
Perlin noise code is taken from [here](https://github.com/whuop/hxNoise/blob/master/hxnoise/Perlin.hx).

With that our volume generation is done. Now we will march over the volume and apply the algorithm to it.

```haxe
package;

import kha.FastFloat;
import kha.arrays.Float32Array;
import kha.math.FastVector3;

class MarchingCubes {

    var idxV = 0;
    var idxI = 0;
    // Surface density
    var surface = 0.5;
    // Density of cube's corner.
    var cube:Array<FastFloat> = [0,0,0,0,0,0,0,0];
    // Volume
    public static var vol:Float32Array;

    public function new() {
        // Create terrain volume
        Volume.makeTerrainVolume((volume)->{
            vol = volume;
        });
        generate();
    }

    public function clean() {...}

    public function generate() {
        // Iterate over the volume
        for(x in 0...Volume.width-1){
            for(y in 0...Volume.height-1){
                for (z in 0...Volume.width-1){
                    for (i in 0...8){
                        // Sample density for cube
                        cube[i] = getDensityFromVolume(
                            x + MCData.cornerTable[i].x,
                            y + MCData.cornerTable[i].y,
                            z + MCData.cornerTable[i].z
                        );
                    }
                    // Apply algorithm on cube
                    polygonize(new FastVector3(x,y,z), cube);
                }
            }
        }
        calculateVertexNormal();
    }

    function polygonize(position:FastVector3, cube:Array<FastFloat>) {

        // Get configuration index based on cube's density
        var configIndex = getConfigIndex(cube);

        // Return if it is above or below the surface.
        if(configIndex == 0 || configIndex == 255) return;

        var edgeIndex = 0;

        for (i in 0...15){...}
    }

    inline function getConfigIndex(cube:Array<FastFloat>) {
        var configIndex = 0;
        // If the density is above surface than do bitwise operation to determine the configuration index.
        // If you were to try https://try.haxe.org/#7390D, you will see that it will give us all configuration index possible.
        if(cube[0] > surface) configIndex |= 1;
        if(cube[1] > surface) configIndex |= 2;
        if(cube[2] > surface) configIndex |= 4;
        if(cube[3] > surface) configIndex |= 8;
        if(cube[4] > surface) configIndex |= 16;
        if(cube[5] > surface) configIndex |= 32;
        if(cube[6] > surface) configIndex |= 64;
        if(cube[7] > surface) configIndex |= 128;

        return configIndex;
    }

    inline public function getDensityFromVolume(x:Float, y:Float, z:Float) {
        // Get density from volume at position
        return vol[Std.int(x) + Std.int(y) * Volume.width + Std.int(z) * Volume.width * Volume.height];
    }

    public static function calculateVertexNormal() {...}
}
```

We will have to update our vertex buffer to hold more pipeline.

```haxe
// Mesh.hx
// In load()
vertexBuffer = new VertexBuffer(Std.int(vertices.length / 3)*2, structure, Usage.StaticUsage);
```

To offset terrain on run.

```haxe
// App.hx
// In update()
if(kb.started(Up)){
    Volume.offset += 1;
    Volume.makeTerrainVolume((vol)->{
        MarchingCubes.vol = vol;
    });
    mc.clean();
    mc.generate();
    App.mesh.remesh();
}
```

And you should have blocky terrain which you can change with keyboard.

<iframe width="560" height="400" src="https://blackgoku36.github.io/BG36-tutorials/Kha/src/mc2.mp4" frameborder="0" allowfullscreen></iframe>

Unlike me, if you are not fan of blocky terrain, you can sample it vertices position and lerp it.

```haxe
package;

import kha.FastFloat;
import kha.arrays.Float32Array;
import kha.math.FastVector3;

class MarchingCubes {

    var idxV = 0;
    ~
    public static var vol:Float32Array;

    var smooth = true;

    public function new() {...}
    public function clean() {...}
    public function generate() {...}

    function polygonize(position:FastVector3, cube:Array<FastFloat>) {

        ~

        for (i in 0...15){
            var indice = MCData.triangleTable[configIndex][edgeIndex];
            if(indice == -1) return;

            var vert1 = position.add(MCData.cornerTable[MCData.edgeIndexes[indice][0]]);
            var vert2 = position.add(MCData.cornerTable[MCData.edgeIndexes[indice][1]]);

            var vertPosition = new FastVector3();

            if(smooth){
                // Get density of edge index.
                var vert1Sample = cube[MCData.edgeIndexes[indice][0]];
                var vert2Sample = cube[MCData.edgeIndexes[indice][1]];

                // Get difference of it
                var difference = vert2Sample - vert1Sample;

                // If difference is zero, set surface as difference.
                if (difference == 0) difference = surface;
                else difference = (surface - vert1Sample) / difference;
                // Else lerp it.

                vertPosition = vert1.add(vert2.sub(vert1).mult(difference));

            }else {
                vertPosition = vert1.add(vert2).mult(0.5);
            }

            App.mesh.vertices[idxV] = vertPosition.x;
            ~
            edgeIndex++;
        }
    }

    inline function getConfigIndex(cube:Array<FastFloat>) {...}
    inline public function getDensityFromVolume(x:Float, y:Float, z:Float) {...}
    public static function calculateVertexNormal() {...}
}

```

You should finally get dunes that you probably wants.

<iframe width="560" height="400" src="https://blackgoku36.github.io/BG36-tutorials/Kha/src/mc3.mp4" frameborder="0" allowfullscreen></iframe>

---

[Source code](https://github.com/BlackGoku36/KhaMCTut/commit/d4c556624d7d38c5e4629560ce918d3d5126b693) for this chapter.
