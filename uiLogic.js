// ----------------------------------------------------------
// ----------------------------------------------------------
// ----------------------------------------------------------
// this will be the main object that will hold the UI parameters
let uiValuesHolder = {
  mainCirclePos: {
    x: 0,
    y: 0,
  },
  mainCircleRadius: 70,
  smallestRadiusAllowed: 20,
  radiusReductionValue: 15,
  randomPieces: true,
  randomMaxPieces: 2,
  fixedPieces: 2,
  connectLineColor: "rgb(255,255,255)",
  connectLineWidth: 3,
  fillTangentCircles: false,
  fillTangentPointCircles: false,
};

// ----------------------------------------------------------
// ----------------------------------------------------------
// ----------------------------------------------------------
//drag and drop logic for UI div
// taken from https://www.youtube.com/watch?v=ymDjvycjgUM
//  (appWrite channel, video : Drag & Drop with Javascript in 4 minutes)

let newX = 0,
  newY = 0,
  startX = 0,
  startY = 0;

//get main ui element
const mainUIDiv = document.getElementById("main-ui-div");

mainUIDiv.addEventListener("mousedown", mouseDown);

function mouseDown(e) {
  if (e.target.id === "main-ui-div") {
    startX = e.clientX;
    startY = e.clientY;

    document.addEventListener("mousemove", mouseMove);
    document.addEventListener("mouseup", mouseUp);
  }
}

function mouseMove(e) {
  newX = startX - e.clientX;
  newY = startY - e.clientY;

  startX = e.clientX;
  startY = e.clientY;

  mainUIDiv.style.top = mainUIDiv.offsetTop - newY + "px";
  mainUIDiv.style.left = mainUIDiv.offsetLeft - newX + "px";
}

function mouseUp(e) {
  document.removeEventListener("mousemove", mouseMove);
}
// ----------------------------------------------------------
// ----------------------------------------------------------
// ----------------------------------------------------------
//hide / show menu logic
let showUI = true;
document.addEventListener("keypress", (e) => {
  if (e.key === "q" || e.key === "Q") {
    showUI = !showUI;
    mainUIDiv.style.visibility = showUI ? "visible" : "hidden";
  }
});
// ----------------------------------------------------------
// ----------------------------------------------------------
// ----------------------------------------------------------
//logic for main circle start pos sliders
const startPosSliderX = document.getElementById("main-circle-slide-pos-x");
const startPosSliderY = document.getElementById("main-circle-slide-pos-y");

const getSliderValue = (e, inputElem) => {
  let sliderResEl = null;

  console.log("QQQ test ui values ", uiValuesHolder);

  switch (inputElem) {
    case "startPosSliderX":
      sliderResEl = document.getElementById("main-circle-pos-x-result");
      sliderResEl.innerText = e.target.value;
      uiValuesHolder.mainCirclePos.x = parseInt(e.target.value);
      break;
    case "startPosSliderY":
      sliderResEl = document.getElementById("main-circle-pos-y-result");
      sliderResEl.innerText = e.target.value;
      uiValuesHolder.mainCirclePos.y = parseInt(e.target.value);
      break;
    case "mainCircleRadiusSlider":
      sliderResEl = document.getElementById("main-circle-radius-result");
      sliderResEl.innerText = e.target.value;
      uiValuesHolder.mainCircleRadius = parseInt(e.target.value);
      break;
    case "smallestRadiusSlider":
      sliderResEl = document.getElementById("smallest-radius-allowed-result");
      sliderResEl.innerText = e.target.value;
      uiValuesHolder.smallestRadiusAllowed = parseInt(e.target.value);
      break;
    case "circlePiecesSlider":
      sliderResEl = document.getElementById("circle-pieces-slider-result");
      sliderResEl.innerText = e.target.value;
      uiValuesHolder.fixedPieces = parseInt(e.target.value);
      break;
    case "randomCirclePiecesSlider":
      sliderResEl = document.getElementById(
        "random-circle-pieces-slider-result"
      );
      sliderResEl.innerText = e.target.value;
      uiValuesHolder.randomMaxPieces = parseInt(e.target.value);
      break;
    case "radiusReductionSlider":
      sliderResEl = document.getElementById("radius-reduction-slider-result");
      sliderResEl.innerText = e.target.value;
      uiValuesHolder.radiusReductionValue = parseInt(e.target.value);
      break;
    case "lineWidthSlider":
      sliderResEl = document.getElementById("line-width-slider-result");
      sliderResEl.innerText = e.target.value;
      uiValuesHolder.connectLineWidth = parseInt(e.target.value);
      break;

    default:
      break;
  }
};
startPosSliderX.addEventListener("change", (e) => {
  getSliderValue(e, "startPosSliderX");
});
startPosSliderX.addEventListener("input", (e) => {
  getSliderValue(e, "startPosSliderX");
});

startPosSliderY.addEventListener("change", (e) => {
  getSliderValue(e, "startPosSliderY");
});
startPosSliderY.addEventListener("input", (e) => {
  getSliderValue(e, "startPosSliderY");
});

// ----------------------------------------------------------
// ----------------------------------------------------------
// ----------------------------------------------------------
// main circle radius slider
const mainCircleRadiusSliderEl = document.getElementById(
  "main-circle-radius-slider"
);

mainCircleRadiusSliderEl.addEventListener("change", (e) => {
  getSliderValue(e, "mainCircleRadiusSlider");
});
mainCircleRadiusSliderEl.addEventListener("input", (e) => {
  getSliderValue(e, "mainCircleRadiusSlider");
});
// ----------------------------------------------------------
// ----------------------------------------------------------
// ----------------------------------------------------------
// smallest radius allowed slider
const smallestRadiusEl = document.getElementById("smallest-radius-allowed");

smallestRadiusEl.addEventListener("change", (e) => {
  getSliderValue(e, "smallestRadiusSlider");
});
smallestRadiusEl.addEventListener("input", (e) => {
  getSliderValue(e, "smallestRadiusSlider");
});
// ----------------------------------------------------------
// ----------------------------------------------------------
// ----------------------------------------------------------
// circle pieces slider
const circlePiecesEl = document.getElementById("circle-pieces-slider");

circlePiecesEl.addEventListener("change", (e) => {
  getSliderValue(e, "circlePiecesSlider");
});
circlePiecesEl.addEventListener("input", (e) => {
  getSliderValue(e, "circlePiecesSlider");
});
// ----------------------------------------------------------
// ----------------------------------------------------------
// ----------------------------------------------------------
// circle pieces slider
const randomCirclePiecesEl = document.getElementById(
  "random-circle-pieces-slider"
);

randomCirclePiecesEl.addEventListener("change", (e) => {
  getSliderValue(e, "randomCirclePiecesSlider");
});
randomCirclePiecesEl.addEventListener("input", (e) => {
  getSliderValue(e, "randomCirclePiecesSlider");
});
// ----------------------------------------------------------
// ----------------------------------------------------------
// ----------------------------------------------------------
// radius reduction slider
const radiusReductionEl = document.getElementById("radius-reduction-slider");

radiusReductionEl.addEventListener("change", (e) => {
  getSliderValue(e, "radiusReductionSlider");
});
radiusReductionEl.addEventListener("input", (e) => {
  getSliderValue(e, "radiusReductionSlider");
});
// ----------------------------------------------------------
// ----------------------------------------------------------
// ----------------------------------------------------------
// divide in random parts checkbox
const divideInRandomEl = document.getElementById("divide-in-random-checkbox");

const onSelectCheckBox = (e, selectedCheckBox) => {
  //   console.log("QQQ test ui values ", uiValuesHolder);
  switch (selectedCheckBox) {
    case "divideInPartsCheckbox":
      uiValuesHolder.randomPieces = e.target.checked;
      break;
    case "fillTangentCirclesCheckbox":
      uiValuesHolder.fillTangentCircles = e.target.checked;
      break;
    case "fillTangentPointCirclesCheckbox":
      uiValuesHolder.fillTangentPointCircles = e.target.checked;
      break;

    default:
      break;
  }
};

divideInRandomEl.addEventListener("change", (e) => {
  onSelectCheckBox(e, "divideInPartsCheckbox");
});

// ----------------------------------------------------------
// ----------------------------------------------------------
// ----------------------------------------------------------
// connecting line color
const colorPicker = document.getElementById("line-color-picker");

const updateLineColor = (e) => {
  uiValuesHolder.connectLineColor = e.target.value;
};

colorPicker.addEventListener("input", updateLineColor, false);

// ----------------------------------------------------------
// ----------------------------------------------------------
// ----------------------------------------------------------
// line width
const lineWidthEl = document.getElementById("line-width-slider");

lineWidthEl.addEventListener("change", (e) => {
  getSliderValue(e, "lineWidthSlider");
});
lineWidthEl.addEventListener("input", (e) => {
  getSliderValue(e, "lineWidthSlider");
});
// ----------------------------------------------------------
// ----------------------------------------------------------
// ----------------------------------------------------------
// fill-tangent-circles-checkbox
const fillTangentCirclesEl = document.getElementById(
  "fill-tangent-circles-checkbox"
);
fillTangentCirclesEl.addEventListener("change", (e) => {
  onSelectCheckBox(e, "fillTangentCirclesCheckbox");
});
// ----------------------------------------------------------
// ----------------------------------------------------------
// ----------------------------------------------------------
// fill-tangent-point-circles-checkbox
const fillTangentPointCirclesEl = document.getElementById(
  "fill-tangent-point-circles-checkbox"
);
fillTangentPointCirclesEl.addEventListener("change", (e) => {
  onSelectCheckBox(e, "fillTangentPointCirclesCheckbox");
});

// ----------------------------------------------------------
// ----------------------------------------------------------
// ----------------------------------------------------------
// generate fractal button
const generateBtnEl = document.getElementById("generate-btn-id");
generateBtnEl.addEventListener("click", () => {
  // avoid infinite recursion by checking the smallest radius and the reduction value
  if (
    !(
      uiValuesHolder.smallestRadiusAllowed <=
      uiValuesHolder.radiusReductionValue
    ) ||
    !(
      uiValuesHolder.smallestRadiusAllowed > uiValuesHolder.radiusReductionValue
    )
  ) {
    //comes from drawCode.js
    clearScreen();
    drawOnScreen();
  }
});
