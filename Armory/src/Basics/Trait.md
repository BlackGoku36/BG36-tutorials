# Traits

---

`Trait` is a concept in `Iron` which means a piece of logic code that is attached to object(s) or scene(s).

There are 4 different types of traits:
1. **Haxe Trait**: [Haxe](https://haxe.org/) text-based scripting trait that can be used to write game-play logic in.

2. **Logic Nodes Trait**: Visual scripting trait for writing game-play logic in. It is similar to [UE4's Blueprints](https://docs.unrealengine.com/en-US/Engine/Blueprints/index.html).

3. **Canvas Trait**: Trait for UI, it is [Zui](https://github.com/armory3d/zui)'s canvas under the hood. And it uses [Armory2D](https://github.com/armory3d/armory2d) as WYSIWYG editor.

4. **WebAssembly (WASM)**: [WebAssembly](https://webassembly.org/) can also be used as scripting trait, It can be written in [Rust](https://www.rust-lang.org/)/[C](https://en.wikipedia.org/wiki/C_%28programming_language%29)/[C++](https://en.wikipedia.org/wiki/C%2B%2B) and than complied to WASM to use it in Armory *(WASM will only work with Krom target)*.
WASM is very useful when it comes to plugins, you can use Libraries made in Rust/C/C++ and compile it to WASM and then use it in Armory and Kha. Two examples that are used in ArmorPaint: [Texture-synthesis(Rust)](https://twitter.com/luboslenco/status/1173942414966439938), [Chips(C)](https://twitter.com/luboslenco/status/1172536139573538816).

---

## Haxe
Create a cube, name it `Haxe` and place it wherever you want. Select it and go to `Scene - Armory Scene Trait`.

1. Click `+`, select Haxe and click `OK`, Haxe trait placeholder should appear.
2. Click `New Script` and name the script of your choice, just make sure the first letter is capital (`HaxeScript` for me).
3. Finally hit `Edit Script`, your system default IDE should now open up with the project.

```haxe
// In HaxeScript.hx
package arm;

//Imports
import iron.object.Object;
import iron.math.Vec4;
import iron.Scene;

class HaxeScript extends iron.Trait {
    // Initialise haxeCube as Object
    var haxeCube:Object;

    public function new() {
        super();
        //NotifyOnInit function get executed when the 'trait' is initiated.
        notifyOnInit(function() {
            //Get haxeCube Object from active Scene.
            haxeCube = Scene.active.getChild("Haxe");
        });

        //NotifyOnUpdate function get executed every frame.
        notifyOnUpdate(function() {
            //Rotate haxeCube with Vec4(x, y, z) and speed.
            haxeCube.transform.rotate(new Vec4(0.0, 0.0, 1.0), 0.01);
        });
    }
}
```

Now, if you were to play it, you should see Haxe cube rotating!.

---

## Logic Node
Create a cube, name it `Nodes` and place it wherever you want. Select it and go to `Scene - Armory Scene Trait`.

1. Click `+`, select Nodes and click `OK`, Nodes trait placeholder should appear.
2. Change your editor type to `Logic Node Editor` and click `+New`.
3. A node tree should be created, you can rename it by editing the text field (`LogicNodes` for me).
4. Go back to `Scene - Armory Scene trait`, select the logic nodes place holder and click `Tree`, select `LogicNodes` in dropdown.

and now add following nodes (`Shift + A`):

![**Some Image**](../traits_1.png)

1. On Update: It is triggered every tick.
2. Rotate object on axis, speed is set directly in vector.

Now if you play it, Nodes cube should start spinning.

---

## Wasm
Create a cube, name it `Wasm` and place it wherever you want. Select it and go to `Scene - Armory Scene Trait`.

1. Click `+`, select `Wasm` and click `OK`, Wasm trait placeholder should appear.
2. Click `New Module`, and it should re-direct you to [WebAssembly Studio](https://webassembly.studio/), select `Empty Rust Project` (you can select c/c++ too) and click `Create`.
3. Enter `Rust`/`C`/`C++` code and click `Build` and there should be `main.wasm` in `out` folder, right-click and download it.
4. Put outputted `main.wasm` in `Bundled` folder (create one, if there is none).
5. Go back to `Scene - Armory Scene Trait`, select previously created `Wasm` placeholder, click `Refresh` and select `main` in `Module` dropdown.

```rs
// Rust example of rotating cube
// main.rs
extern {
    fn notify_on_update(f: extern fn() -> ()) -> ();
    fn get_object(name: *const i8) -> i32;
    fn set_transform(object: i32, x: f32, y: f32, z: f32, rx: f32, ry: f32, rz: f32, sx: f32, sy: f32, sz: f32) -> ();
}

#[no_mangle]
pub extern "C" fn update() -> () {
    unsafe {
        let name = std::ffi::CString::new("Wasm").unwrap();
        let object = get_object(name.as_ptr());
        static mut rot: f32 = 0.1;
        rot += 0.01;
        set_transform(object, 0.0, 0.0, 0.0, 0.0, 0.0, rot, 0.5, 0.5, 0.5);
    }
}

#[no_mangle]
pub extern "C" fn main() -> i32 {
    unsafe {
        notify_on_update(update);
    }
    return 0;
}
```

Now if you play it then you should have spinny rusty wasm cube.

---

## Canvas
1. Click `+`, select `UI` and click `OK`, `Canvas` trait placeholder should appear.
2. Click `New Canvas` and enter the name and click `Edit Canvas`.
3. Add `Text` element and set text as `Hello World from Canvas!` and save it.

If you play it now, you should see `Hello World from Canvas`.

Check [Canvas tutorial](docs/Basics/Canvas.md) for more!

You should finally get this:
<iframe width="560" height="400" src="https://blackgoku36.github.io/BG36-tutorials/Armory/src/trait_final.mp4" frameborder="0" allowfullscreen></iframe>

**🎉 There we go! We covered the basics of Traits! 🎉**

---

If anything goes wrong, don't forget to check [source code](https://github.com/BlackGoku36/armory-tutorial-sourcecode/tree/master/Traits)
