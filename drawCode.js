/*

----- step 1 :
    draw a circle

----- step 2 :
    divide the circle in P parts of equal angles

----- step 3 :
    draw circles around it, following certain rules

----- step 4 :
    for each new circle around the previous one
        do step 1 (draw)
        do step 2 (divide)
        do step 3 (draw around)
        do step 4 (recursive)
*/

const mainCanvas = document.getElementById("mainCanvas");

var ctx = mainCanvas.getContext("2d");

const canvasWidth = mainCanvas.getBoundingClientRect().width;
const canvasHeight = mainCanvas.getBoundingClientRect().height;

// ----------------------------------------------------------
// ----------------------------------------------------------
// ----------------------------------------------------------
const getRandomRadius = (previousRadius = null) => {
  let maxValue = previousRadius - 20;
  return Math.floor(Math.random() * previousRadius);
};
// ----------------------------------------------------------
// ----------------------------------------------------------
// ----------------------------------------------------------
const getRandomCirclePieces = () => {
  if (uiValuesHolder.randomPieces) {
    return Math.floor(1 + Math.random() * uiValuesHolder.randomMaxPieces);
  } else {
    return uiValuesHolder.fixedPieces;
  }
};

// ----------------------------------------------------------
// ----------------------------------------------------------
// ----------------------------------------------------------
const getRandomColor = () => {
  // ctx.fillStyle = "rgb(255 165 0)";
  const randomBetween = (min, max) =>
    min + Math.floor(Math.random() * (max - min + 1));
  const r = randomBetween(0, 255);
  const g = randomBetween(0, 255);
  const b = randomBetween(0, 255);
  const rgb = `rgb(${r},${g},${b})`;
  return rgb;
};

// ----------------------------------------------------------
// ----------------------------------------------------------
// ----------------------------------------------------------
const drawCircle = (
  x,
  y,
  radius,
  startAngle,
  endAngle,
  drawFullCircle,
  fillColor = null
) => {
  if (!drawFullCircle) {
    ctx.strokeStyle = uiValuesHolder.connectLineColor;
    ctx.lineWidth = uiValuesHolder.connectLineWidth;
    ctx.beginPath();
    ctx.arc(x, y, radius, startAngle, endAngle);
    ctx.stroke();
  } else {
    ctx.beginPath();
    ctx.arc(x, y, radius, startAngle, endAngle);
    ctx.fillStyle = fillColor;
    ctx.fill();
    ctx.fillStyle = "white";
  }
};

// ----------------------------------------------------------
// ----------------------------------------------------------
// ----------------------------------------------------------
const clearScreen = () => {
  ctx.clearRect(0, 0, 900, 600);
  ctx.fillStyle = "black";
  ctx.strokeStyle = "white";
  ctx.fillRect(0, 0, 900, 600);
};

// ----------------------------------------------------------
// ----------------------------------------------------------
// ----------------------------------------------------------
const drawLine = (beginX, beginY, endX, endY) => {
  // start a new path
  ctx.beginPath();

  // place the cursor from the point the line should be started
  ctx.moveTo(beginX, beginY);

  // draw a line from current cursor position to the provided x,y coordinate
  ctx.lineTo(endX, endY);

  // set strokecolor
  ctx.strokeStyle = uiValuesHolder.connectLineColor;

  // set lineWidht
  ctx.lineWidth = uiValuesHolder.connectLineWidth;

  // add stroke to the line
  ctx.stroke();
};

// ----------------------------------------------------------
// ----------------------------------------------------------
// ----------------------------------------------------------
let graphPoints = [];
const drawCircleParts = (
  currentCenterXPos,
  currentCenterYPos,
  currentRadius
) => {
  // end of recursion condition, return when the circle radius has been reduced to the maximum value allowed

  if (currentRadius === uiValuesHolder.smallestRadiusAllowed) return;

  // ------------------------------------------
  // ------------------------------------------
  // divide the circle (and mark the points)
  // we need to divide 360 , or 2 pi into N pieces
  let circlePieces = getRandomCirclePieces();

  let circleSection = (2 * Math.PI) / circlePieces; //test in 3 parts for now

  // set smaller radius size and get new coordinates
  let radiusReductionValue = uiValuesHolder.radiusReductionValue;

  let currentSectionAngle = null;
  let partX = null;
  let partY = null;

  let newCircleRadius = null;

  let newCenterPosX = null;
  let newCenterPosY = null;

  let currentCirclesList = [];

  for (let i = 0; i < circlePieces; i++) {
    currentSectionAngle = circleSection * i;

    newCircleRadius = currentRadius - radiusReductionValue;

    partX = (currentRadius + newCircleRadius) * Math.cos(currentSectionAngle);
    partY = (currentRadius + newCircleRadius) * Math.sin(currentSectionAngle);

    newCenterPosX = currentCenterXPos + partX;
    newCenterPosY = currentCenterYPos + partY;

    let colorOne = "";
    let colorTwo = "";

    colorOne = getRandomColor();
    colorTwo = getRandomColor();

    //TODO add "collision detection"
    // that is if the circle to be drawn is inside another circle
    if (!(newCenterPosX >= canvasWidth || newCenterPosY >= canvasHeight)) {
      //draws the circle tangent to the parent circle
      drawCircle(
        newCenterPosX,
        newCenterPosY,
        newCircleRadius,
        0,
        2 * Math.PI,
        uiValuesHolder.fillTangentCircles,
        colorOne
      );

      //draws the point that is the center of one of the new circles
      drawCircle(
        newCenterPosX,
        newCenterPosY,
        5,
        0,
        2 * Math.PI,
        uiValuesHolder.fillTangentPointCircles,
        colorTwo
      );

      //draw the line that connects the centers of the circles
      drawLine(
        currentCenterXPos,
        currentCenterYPos,
        newCenterPosX,
        newCenterPosY
      );

      let currentCircle = {
        fromX: currentCenterXPos,
        fromY: currentCenterYPos,
        x: newCenterPosX,
        y: newCenterPosY,
        radius: newCircleRadius,
      };

      currentCirclesList.push(currentCircle);
      graphPoints.push(currentCircle);
    }
  }

  for (let j = 0; j < currentCirclesList.length; j++) {
    let currentCircle = currentCirclesList[j];
    drawCircleParts(currentCircle.x, currentCircle.y, currentCircle.radius);
  }

  // ------------------------------------------
  // ------------------------------------------
};

// ----------------------------------------------------------
// ----------------------------------------------------------
// ----------------------------------------------------------
const drawOnScreen = () => {
  drawCircle(
    uiValuesHolder.mainCirclePos.x,
    uiValuesHolder.mainCirclePos.y,
    uiValuesHolder.mainCircleRadius,
    0,
    2 * Math.PI,
    true,
    "orange"
  );

  drawCircleParts(
    uiValuesHolder.mainCirclePos.x,
    uiValuesHolder.mainCirclePos.y,
    uiValuesHolder.mainCircleRadius
  );
};

// ----------------------------------------------------------
// ----------------------------------------------------------
// ----------------------------------------------------------
// ----------------------------------------------------------
// ----------------------------------------------------------
// ----------------------------------------------------------
