'use strict'

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
  this.load.image('quail', 'assets/quail-standing-0.png')
  this.load.image('chamber', 'assets/chamber.png')
  this.load.image('light-red', 'assets/light-red.png')
  this.load.image('light-blue', 'assets/light-blue.png')
  this.load.image('light-yellow', 'assets/light-yellow.png')
  this.load.image('control', 'assets/control.png')
}

function makeChamber (r, c) {
  const x = 240 * r + (240 / 2)
  const y = 270 * c + (270 / 2)
  return {
    x,
    y,
    red: { x: x - 90, y: y - 110 },
    blue: { x: x + 90, y: y - 109 },
    yellow: { x: x - 91, y: y + 105 }
  }
}

const chambers = [
  [1, 2, 3, 4].map(n => makeChamber(n, 0)),
  [0, 1, 2, 3, 4, 5, 6, 7, 8].map(n => makeChamber(n, 1)),
  [3, 4].map(n => makeChamber(n, 2))
]

const controls = [4, 5, 6].map(r => ({
  x: 240 * r + (240 / 2),
  y: 270 * 3 + (270 / 2)
}))

function create () {
  this.cameras.main.setBackgroundColor('#92938C')

  controls.forEach(c => {
    this.add.image(c.x, c.y, 'control')
  })

  chambers.forEach(r => r.forEach(
    c => {
      this.add.image(c.x, c.y, 'chamber')
      this.add.image(c.red.x, c.red.y, 'light-red')
      this.add.image(c.blue.x, c.blue.y, 'light-blue')
      this.add.image(c.yellow.x, c.yellow.y, 'light-yellow')
      const img = this.add.image(c.x, c.y, 'quail')
      img.angle = (1920 - c.x) / 1920 * 360
    }
  ))

  var logo = this.physics.add.image(400, 100, 'quail')

  logo.setVelocity(100, 200)
  logo.setBounce(1, 1)
  logo.setCollideWorldBounds(true)
}
