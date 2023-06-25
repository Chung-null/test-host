import { Engine, Scene, Vector3, HemisphericLight, ArcFollowCamera, Camera, Light, ArcRotateCamera, Color3, PointerEventTypes, ActionManager, PointerDragBehavior, StandardMaterial, Mesh, AbstractMesh } from "@babylonjs/core";
import { AdvancedDynamicTexture, StackPanel, Button } from "@babylonjs/gui";
import { GroundWare } from "./GroundWare";
import { Warehouse } from "./Warehouse";
import { ShelfWare } from "./ShelfWare";
//BLACK CATCH WHITE
export class MainWare {
    private canvas: HTMLCanvasElement
    private engine: Engine
    private scene: Scene
    private light1: Light
    private light2: Light
    private light3: Light
    private light4: Light
    public groundWare: GroundWare
    private warehouse: Warehouse
    private shelf: ShelfWare
    private event: Event
    private rotation
    private camera: Camera;



    constructor() {
        this.init();
        var camera = new ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 15, new Vector3(0, 0, 0))
        camera.attachControl(this.canvas, true)
        camera.upperBetaLimit = Math.PI / 2.3
        camera.inputs.removeByType("ArcRotateCameraKeyboardMoveInput")
        this.rotation = camera.absoluteRotation.clone()
        console.log(camera.position)
        this.engine.runRenderLoop(() => {
            this.scene.render()
            if (this.rotation != camera.absoluteRotation) {
                console.log(camera.position)
                this.rotation = camera.absoluteRotation.clone()
            }
        })
    }
    private init() {
        this.createCanvas();
        this.engine = new Engine(this.canvas, true)
        this.scene = new Scene(this.engine);
        this.game()
        this.shelfware()
        this.light1 = new HemisphericLight("light1", new Vector3(0, 200, -100), this.scene); // light at bottom
        this.light2 = new HemisphericLight("light2", new Vector3(0, 200, 100), this.scene);// light at top
        this.light3 = new HemisphericLight("light3", new Vector3(-100, 200, 0), this.scene); // light at left
        this.light4 = new HemisphericLight("light4", new Vector3(100, 200, 0), this.scene);  // light at right

    }
    private createCanvas() {
        document.documentElement.style["overflow"] = "hidden";
        document.documentElement.style.overflow = "hidden";
        document.documentElement.style.width = "100%";
        document.documentElement.style.height = "100%";
        document.documentElement.style.margin = "0";
        document.documentElement.style.padding = "0";
        document.body.style.overflow = "hidden";
        document.body.style.width = "100%";
        document.body.style.height = "100%";
        document.body.style.margin = "0";
        document.body.style.padding = "0";

        //create the canvas html element and attach it to the webpage
        this.canvas = document.createElement("canvas");
        this.canvas.style.width = "100%";
        this.canvas.style.height = "100%";
        this.canvas.id = "gameCanvas";
        document.body.appendChild(this.canvas);
    }
    private game() {
        this.groundWare = new GroundWare(this.scene)
        // this.warehouse = new Warehouse(this.scene)


    }
    private shelfware() {
        this.shelf = new ShelfWare(this.scene)
    }
}