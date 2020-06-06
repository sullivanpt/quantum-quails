'use strict'

// CONCEPTS

// chamber phase is quail rotation (angle)

// chamber probablity mapping
// TBD -- suggest size pulse:
// small in all entangled chambers
// pulse larger in all entangled chamber based on probability

// entanglement to quail color and chamber mapping
// bits are RYB (arranged R=T/L, Y=B/L, B=T/R)
// options:
//   xxx - nothing entangled: red/2, yellow/2, blue/2
//   ryx - red & yellow entangled: none, orange/4, blue/2
//   rxb - red & blue entangled: purple/4, yellow/2, none
//   ryb - red, yellow & blue entangled: none, white/8, none
//   xyb - yellow & blue entangled: red/2, green/4, none

// FUTURE -- decoherence probability as glitches
// intention for one mode is a race against decoherence time


// from https://phaser.io/tutorials/getting-started-phaser3/part5

var config = {
  type: Phaser.AUTO,
  width: 1920,
  height: 1080,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 200 }
    }
  },
  scene: {
    preload: preload,
    create: create
  }
}

var game = new Phaser.Game(config)

function preload () {
  this.load.image('quail-rxx', 'assets/quail-red-0.png')
  this.load.image('quail-xyx', 'assets/quail-yellow-0.png')
  this.load.image('quail-xxb', 'assets/quail-blue-0.png')
  this.load.image('chamber', 'assets/chamber.png')
  this.load.image('light-red', 'assets/light-red.png')
  this.load.image('light-blue', 'assets/light-blue.png')
  this.load.image('light-yellow', 'assets/light-yellow.png')
  this.load.image('control', 'assets/control.png')
}

function range (n) {
  return [...Array(n).keys()]
}

function makeChamber (c, r, co) {
  const x = 240 * (c + co) + (240 / 2)
  const y = 270 * r + (270 / 2)
  return {
    c,
    r,
    x,
    y,
    red: { x: x - 90, y: y - 110 },
    blue: { x: x + 90, y: y - 109 },
    yellow: { x: x - 91, y: y + 105 },
    label: { x: x + 68, y: y + 86 }
  }
}

const chambers = [
  range(4).map(n => makeChamber(n, 0, 1)),
  range(8).map(n => makeChamber(n, 1, 0)),
  range(2).map(n => makeChamber(n, 2, 3))
]

const controls = [4, 5, 6].map(c => ({
  x: 240 * c + (240 / 2),
  y: 270 * 3 + (270 / 2) // r=3
}))

function quailColor (r) {
  return [
    'quail-rxx',
    'quail-xyx',
    'quail-xxb'
  ][r]
}

const colorBackground = '#92938C'

const labelFont = {
  fontFamily: 'arial',
  fontStyle: 'bold',
  fontSize: 28,
  color: colorBackground
}

function create () {
  this.cameras.main.setBackgroundColor(colorBackground)

  controls.forEach(c => {
    this.add.image(c.x, c.y, 'control')
  })

  chambers.forEach(r => r.forEach(
    c => {
      this.add.image(c.x, c.y, 'chamber')
      this.add.text(c.label.x, c.label.y, `|${c.c}>`, labelFont)
      this.add.image(c.red.x, c.red.y, 'light-red')
      this.add.image(c.blue.x, c.blue.y, 'light-blue')
      this.add.image(c.yellow.x, c.yellow.y, 'light-yellow')
      const img = this.add.image(c.x, c.y, quailColor(c.r))
      img.angle = (1920 - c.x) / 1920 * 360
    }
  ))

  var logo = this.physics.add.image(400, 100, 'quail-xxb')

  logo.setVelocity(100, 200)
  logo.setBounce(1, 1)
  logo.setCollideWorldBounds(true)
}
