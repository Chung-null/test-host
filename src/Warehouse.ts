import { Color3, Mesh, MeshBuilder, Scene, SceneLoader, StandardMaterial, Texture, Vector3, AbstractMesh, AssetContainer, BoundingBoxGizmo, UtilityLayerRenderer, ScaleGizmo, GizmoManager, SixDofDragBehavior, MultiPointerScaleBehavior, PositionGizmo, Tools, BoundingBox } from "@babylonjs/core";
import "@babylonjs/loaders"




export class Warehouse {
    private scene: Scene
    private mesh: Mesh
    constructor(scene: Scene) {
        this.scene = scene
        this.createWarehouse()
    }

    private createWarehouse() {
        // Create gizmo
        var gizmo = new BoundingBoxGizmo(Color3.FromHexString("#0984e3"))
        gizmo.ignoreChildren = true;

        // Import gltf model

        SceneLoader.ImportMesh('', "./warehouse/eton1.glb", "", this.scene, function (container) {
            container[0].position = new Vector3(0, 0.5, 0)
            container[0].scaling.scaleInPlace(0.5)
            var gltfMesh = container[0] as Mesh
            var bb = BoundingBoxGizmo.MakeNotPickableAndWrapInBoundingBox(gltfMesh)
            gizmo.attachedMesh = bb
        })
        // Dragging events
        gizmo.onScaleBoxDragObservable.add(() => {
            console.log("scaleDrag")
        })
        gizmo.onScaleBoxDragEndObservable.add(() => {
            console.log("scaleEnd")
        })
        gizmo.onRotationSphereDragObservable.add(() => {
            console.log("rotDrag")
        })
        gizmo.onRotationSphereDragEndObservable.add(() => {
            console.log("rotEnd")
        })

    }
}


