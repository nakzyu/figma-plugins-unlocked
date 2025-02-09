export const centerNodeOnScreen = (group: GroupNode) => {
  const {
    x: vpX,
    y: vpY,
    width: vpWidth,
    height: vpHeight,
  } = figma.viewport.bounds;

  const viewportCenterX = vpX + vpWidth / 2;
  const viewportCenterY = vpY + vpHeight / 2;

  const groupCenterX = group.x + group.width / 2;
  const groupCenterY = group.y + group.height / 2;

  group.x += viewportCenterX - groupCenterX;
  group.y += viewportCenterY - groupCenterY;
};
