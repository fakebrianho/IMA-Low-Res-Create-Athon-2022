let spinButton;
let data;
let inputWheel, outputWheel;
let clickSound, endSound, gameShow;
let isSpinning = false;
let resourcesAvailable = false;

function preload() {
  data = loadJSON('data/generator.json');
  //sounds are public domain
  clickSound = loadSound('sound/faded_sine.mp3');
  endSound = loadSound('sound/Electronic_Chime-KevanGC-495939803.mp3');
  // maybe not this sound?
  gameShow = loadSound('sound/gameshow_short.mp3'); 
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}

function setup() {
  frameRate(60);
 
  clickSound.setVolume(0.4);
  gameShow.setVolume(0.5);

  inputWheel = new Wheel(
    '#inputs',
    data.input
  );
  outputWheel = new Wheel(
    '#outputs',
    data.output
  );

  spinButton = select('button');
  spinButton.mouseClicked(startSpin);
}

function draw() {

  // workaround, see line 69
  // if (inputWheel.spin) {
  //   // inputWheel.move();
  // }
  if (outputWheel.spin) {
    outputWheel.move();
  }

  if(isSpinning){
    if(inputWheel.difference == 0 && outputWheel.difference == 0){
      endSound.play();
      setTimeout(() => {  gameShow.play(); }, 100);
      isSpinning = false;
    }
  }

}

function startSpin(

  clickEvent,
  targetInput = floor(random(data.input.length)),
  targetOutput = floor(random(data.output.length)),

) {
  isSpinning = true;

  // inputWheel.target = targetInput; // not the target that displays!!
  // inputWheel.spin = true;
  inputWheel.update(targetInput);
  // inputWheel.resetAriaHidden();

  outputWheel.target = targetOutput;
  outputWheel.spin = true;
  outputWheel.resetAriaHidden();

  // console.log(
  //   'make a something where the input is ' +
  //     data.input[targetInput] +
  //     ' and an output is ' +
  //     data.output[targetOutput]
  // );

  // remove data from array here
  console.log(data.input[targetInput]);
  data.input.splice(targetInput, 1);
  console.log(data.input);
}
