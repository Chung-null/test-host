import { AbstractMesh, ActionEvent, ActionManager, Color3, ExecuteCodeAction, GizmoManager, Mesh, MeshBuilder, PointerDragBehavior, PointerEventTypes, PositionGizmo, Scene, SceneLoader, SixDofDragBehavior, StandardMaterial, UtilityLayerRenderer, Vector3, VertexBuffer } from "@babylonjs/core";
import "@babylonjs/loaders"
import { GroundWare } from "./GroundWare";
import { AdvancedDynamicTexture, Button, Control, TextBlock, InputText, Rectangle, StackPanel, RadioGroup, SelectionPanel } from "@babylonjs/gui"

export class ShelfWare {
  private _scene: Scene
  constructor(scene: Scene) {
    this._scene = scene
    this.createShelf()
  }

  private async createShelf() {
    // Create a variable to store the selected object
    //this.ground = new GroundWare(this.scene)
    // var selectedObject = null;

    // // Listen for clicks on objects
    // this.scene.onPointerObservable.add(function (evt) {
    //   if (evt.pickInfo.hit && evt.pickInfo.pickedMesh) {
    //     // Store the selected object

    //     selectedObject = evt.pickInfo.pickedMesh;
    //   }
    // }, PointerEventTypes.POINTERDOWN)

    const advancedTexture = AdvancedDynamicTexture.CreateFullscreenUI("UI");

    const rectshelf = new Rectangle();
    rectshelf.width = 0.15;
    rectshelf.height = "200px";
    rectshelf.cornerRadius = 20;
    rectshelf.color = "Orange";
    rectshelf.thickness = 4;
    rectshelf.background = "green";
    advancedTexture.addControl(rectshelf);
    rectshelf.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
    rectshelf.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;

    const panel = new StackPanel();
    panel.isVertical = true;
    rectshelf.addControl(panel);

    const buttonAdd = Button.CreateSimpleButton("but1", "Add shelf");
    buttonAdd.width = 0.14;
    buttonAdd.height = "40px";
    buttonAdd.color = "white";
    buttonAdd.cornerRadius = 20;
    buttonAdd.background = "green";
    buttonAdd.paddingTop = "10px"
    buttonAdd.paddingLeft = "10px"
    panel.addControl(buttonAdd);
    buttonAdd.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;

    const buttonDelete = Button.CreateSimpleButton("but2", "Delete");
    buttonDelete.width = 0.14;
    buttonDelete.height = "40px";
    buttonDelete.color = "white";
    buttonDelete.cornerRadius = 20;
    buttonDelete.background = "green";
    buttonDelete.paddingTop = "10px"
    buttonDelete.paddingLeft = "10px"
    panel.addControl(buttonDelete);
    buttonDelete.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;


    var lastInstance;
    var ShelfMesh;
    buttonAdd.onPointerUpObservable.add(function () {
      // Load model kệ hàng
      SceneLoader.ImportMesh('', './shelf/', 'shelfware.babylon', this._scene, (meshes) => {
        meshes[0].scaling = new Vector3(0.03, 0.05, 0.03)
        meshes[0].position.y = (6)
        ShelfMesh = meshes[0] as Mesh
      });
      if (ShelfMesh) {
        let newInstance = ShelfMesh.createInstance("instance");
        if (lastInstance) {
          newInstance.position.x = lastInstance.position.x + 4;
        }
        lastInstance = newInstance;
      }
    });
    advancedTexture.addControl(buttonAdd);
    // Listen for clicks on the button delete
    buttonDelete.onPointerClickObservable.add(function () {
      // // Delete the selected object
      // if (selectedObject) {
      //   selectedObject.dispose();
      //   selectedObject = null;
      // }
    });
    advancedTexture.addControl(buttonDelete);
    // Add a GizmoManager to the scene
    var gizmoManager = new GizmoManager(this._scene);
    gizmoManager.positionGizmoEnabled = true;

    // Attach the position gizmo to the box
    gizmoManager.attachToMesh(ShelfMesh);


    // // Create utility layer the gizmo will be rendered on
    // var utilLayer = new UtilityLayerRenderer(this.scene);

    // // Create the gizmo and attach to the sphere
    // var gizmo = new PositionGizmo(utilLayer);
    // gizmo.attachedMesh = ShelfMesh;

    // // Keep the gizmo fixed to world rotation
    // gizmo.updateGizmoRotationToMatchAttachedMesh = false;
    // gizmo.updateGizmoPositionToMatchAttachedMesh = true;

    // // Toggle gizmo on keypress
    // document.onkeydown = ()=>{
    //     gizmo.attachedMesh = !gizmo.attachedMesh ? ShelfMesh : null
    // }
  }
}



