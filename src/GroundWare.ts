import { Color3, CubeTexture, Mesh, MeshBuilder, PointerEventTypes, Scene, StandardMaterial, Texture, Vector3 } from "@babylonjs/core";

export class GroundWare {
    public scene: Scene
    public ground: Mesh
    constructor(scene: Scene) {
        this.scene = scene
        this.createMesh()
    }
    public createMesh() {
        const ground = MeshBuilder.CreateGroundFromHeightMap("largeGround", "./ground/villageheightmap.png", { width: 150, height: 150, subdivisions: 20, minHeight: 0, maxHeight: 10 });
        const groundMaterial = new StandardMaterial("groundMaterial", this.scene);
        ground.position = new Vector3(0, 0, 0)
        ground.material = groundMaterial;
        const uvScale = 2;
        const textArray: Texture[] = []

        const diffuseText = new Texture("./ground/grass.png", this.scene);
        groundMaterial.diffuseTexture = diffuseText
        textArray.push(diffuseText)

        const aoText = new Texture("./ground/grass.png", this.scene); // trang 
        groundMaterial.ambientTexture = aoText
        textArray.push(aoText)

        const pecText = new Texture("./ground/grass.png", this.scene); //  den 
        groundMaterial.specularTexture = pecText;
        groundMaterial.specularPower = 20;
        textArray.push(pecText)

        textArray.forEach((text) => {
            text.uScale = uvScale;
            text.vScale = uvScale;
        });
        const skybox = MeshBuilder.CreateBox("skyBox", { size: 150 }, this.scene);
        const skyboxMaterial = new StandardMaterial("skyBox", this.scene);
        skyboxMaterial.backFaceCulling = false;
        skyboxMaterial.reflectionTexture = new CubeTexture("sky/skybox", this.scene);
        skyboxMaterial.reflectionTexture.coordinatesMode = Texture.SKYBOX_MODE;
        skyboxMaterial.diffuseColor = new Color3(0, 0, 0);
        skyboxMaterial.specularColor = new Color3(0, 0, 0);
        skybox.material = skyboxMaterial;

    }

}