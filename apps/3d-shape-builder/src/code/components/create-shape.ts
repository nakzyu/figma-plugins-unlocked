import * as THREE from "three";

export const createShape = () => {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
  camera.position.set(2, 2, 3);
  camera.lookAt(new THREE.Vector3(0, 0, 0));
  camera.updateMatrixWorld();

  const geometry = new THREE.BoxGeometry(1, 1, 1);

  const positions = geometry.attributes.position;
  const indices = geometry.index;
  const groups = geometry.groups;

  type FaceData = { pathData: string; distance: number; normal: THREE.Vector3 };
  const faceDataArray: FaceData[] = [];

  for (let faceIndex = 0; faceIndex < groups.length; faceIndex++) {
    const group = groups[faceIndex];

    const vertexMap = new Map<string, THREE.Vector3>();
    for (let i = group.start; i < group.start + group.count; i++) {
      const idx = indices.getX(i);
      const x = positions.getX(idx);
      const y = positions.getY(idx);
      const z = positions.getZ(idx);
      const key = `${x},${y},${z}`;
      if (!vertexMap.has(key)) {
        vertexMap.set(key, new THREE.Vector3(x, y, z));
      }
    }
    const vertices = Array.from(vertexMap.values());

    const centroid = new THREE.Vector3(0, 0, 0);
    vertices.forEach((v) => centroid.add(v));
    centroid.divideScalar(vertices.length);

    const distance = camera.position.distanceTo(centroid);

    let normal = new THREE.Vector3(0, 0, 1);
    if (vertices.length >= 3) {
      const edge1 = new THREE.Vector3().subVectors(vertices[1], vertices[0]);
      const edge2 = new THREE.Vector3().subVectors(vertices[2], vertices[0]);
      normal = new THREE.Vector3().crossVectors(edge1, edge2).normalize();
    }

    let u = new THREE.Vector3(1, 0, 0);
    if (Math.abs(normal.dot(u)) > 0.99) u.set(0, 1, 0);
    const tangent = new THREE.Vector3().crossVectors(normal, u).normalize();
    const bitangent = new THREE.Vector3()
      .crossVectors(normal, tangent)
      .normalize();

    const points2D = vertices.map((v) => {
      const diff = new THREE.Vector3().subVectors(v, centroid);
      return new THREE.Vector2(diff.dot(tangent), diff.dot(bitangent));
    });

    const sortedIndices = points2D
      .map((p, i) => ({ angle: Math.atan2(p.y, p.x), index: i }))
      .sort((a, b) => a.angle - b.angle)
      .map((item) => item.index);
    const sortedVertices = sortedIndices.map((i) => vertices[i]);

    const canvasWidth = 512;
    const canvasHeight = 512;
    const projectedPoints = sortedVertices.map((v) => {
      const vWorld = v.clone();
      vWorld.project(camera);
      const x = ((vWorld.x + 1) / 2) * canvasWidth;
      const y = (1 - (vWorld.y + 1) / 2) * canvasHeight;
      return { x, y };
    });

    let pathData = "";
    if (projectedPoints.length > 0) {
      pathData += `M ${projectedPoints[0].x} ${projectedPoints[0].y}`;
      for (let i = 1; i < projectedPoints.length; i++) {
        pathData += ` L ${projectedPoints[i].x} ${projectedPoints[i].y}`;
      }
      pathData += " Z";
    }
    console.log(
      `Face ${faceIndex} SVG Path Data:`,
      pathData,
      "distance:",
      distance
    );

    faceDataArray.push({ pathData, distance, normal });
  }

  const sortedFaceData = faceDataArray.sort((a, b) => b.distance - a.distance);

  const createdVectorNodes: SceneNode[] = [];
  sortedFaceData.forEach((faceData, index) => {
    const vectorNode = figma.createVector();
    vectorNode.vectorPaths = [
      {
        data: faceData.pathData,
        windingRule: "NONZERO",
      },
    ];

    const lightDirection = new THREE.Vector3(0, 1, 1).normalize();
    const dot = faceData.normal.dot(lightDirection);

    const ambient = 0.3;
    const shade = ambient + (1 - ambient) * Math.max(0, dot);

    vectorNode.fills = [
      {
        type: "SOLID",
        color: { r: shade, g: shade, b: shade },
      },
    ];

    vectorNode.setPluginData("materialIndex", index.toString());
    createdVectorNodes.push(vectorNode);
  });

  const groupNode = figma.group(createdVectorNodes, figma.currentPage);
  groupNode.name = "Cube";
  figma.currentPage.selection = [groupNode];
  figma.viewport.scrollAndZoomIntoView([groupNode]);
};
