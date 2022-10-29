let spinButton
let data
let inputWheel, outputWheel
let clickSound, endSound, gameShow
let isSpinning = false
let resourcesAvailable = false
const fireworks = []
let gravity
let switcher
const btn = document.querySelector('.btn')
btn.addEventListener('click', startSpin)
function preload() {
	data = loadJSON('data/generator.json')
	//sounds are public domain
	clickSound = loadSound('sound/faded_sine.mp3')
	endSound = loadSound('sound/Electronic_Chime-KevanGC-495939803.mp3')
	// maybe not this sound?
	gameShow = loadSound('sound/gameshow_short.mp3')
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight)
}

function setup() {
	const myCanvas = createCanvas(window.innerWidth, window.innerHeight)
	myCanvas.parent('canvas-container')

	colorMode(HSB)
	gravity = createVector(0, 0.2)
	stroke(255)
	strokeWeight(4)
	switcher = false
	frameRate(60)

	clickSound.setVolume(0.4)
	gameShow.setVolume(0.5)

	inputWheel = new Wheel('#inputs', data.input)
	outputWheel = new Wheel('#outputs', data.output)

	// spinButton = select('button')
	// spinButton.mouseClicked(startSpin)
}

function draw() {
	colorMode(RGB)
	clear()
	background(0, 0, 0, 15)
	if (switcher) {
	}

	// workaround, see line 69
	if (inputWheel.spin) {
		inputWheel.move()
	}
	if (outputWheel.spin) {
		outputWheel.move()
	}

	if (isSpinning) {
		if (inputWheel.difference == 0 && outputWheel.difference == 0) {
			endSound.play()
			setTimeout(() => {
				gameShow.play()
			}, 100)
			isSpinning = false
		}
	}
	if (gameShow.isPlaying()) {
		explode()
	}
}

function mousePressed() {
	switcher = true
}

function mouseReleased() {
	switcher = false
}

function explode() {
	if (random(1) < 0.04) {
		fireworks.push(new Firework())
	}

	for (let i = fireworks.length - 1; i >= 0; i--) {
		fireworks[i].update()
		fireworks[i].show()

		if (fireworks[i].done()) {
			fireworks.splice(i, 1)
		}
	}
}

// function mouseMoved() {
// 	noStroke()
// 	fill(255, 255, 255, 20)
// 	ellipse(mouseX, mouseY, 70, 70)
// }

function startSpin(
	clickEvent,
	targetInput = floor(random(data.input.length)),
	targetOutput = floor(random(data.output.length))
) {
	isSpinning = true

	// inputWheel.target = targetInput // not the target that displays!!
	// inputWheel.spin = true
	inputWheel.update(targetInput)
	// inputWheel.resetAriaHidden();

	outputWheel.target = targetOutput
	outputWheel.spin = true
	outputWheel.resetAriaHidden()

	// console.log(
	//   'make a something where the input is ' +
	//     data.input[targetInput] +
	//     ' and an output is ' +
	//     data.output[targetOutput]
	// );

	// remove data from array here
	console.log(targetInput)
	// console.log(data.input[targetInput])
	data.input.splice(targetInput, 1)
	console.log(data.input)
}
