const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: "#000000",
  scene: {
    preload: preload,
    create: create,
  },
};

const game = new Phaser.Game(config);

function preload() {
  this.load.image("image1", "assets/image1.png");
  this.load.image("image2", "assets/image2.png");
}

function create() {
  const image1 = this.add.image(400, 200, "image1");

  const text = this.add
    .text(400, 200, "Play the game", {
      font: "36px Arial Black",
      fill: "#ffffff",
      stroke: "#000000",
      strokeThickness: 4,
    })
    .setOrigin(0.5);
  text.setShadow(2, 2, "#333333", 2, true, true);

  // Add the second image
  const image2 = this.add.image(300, 300, "image2").setDepth(-1).setScale(0.1);
  this.tweens.add({
    targets: image2,
    scale: 0.3,
    duration: 1500,
    ease: "Bounce.easeOut",
  });

  const container = this.add.container(0, 0, [image1, text]);

  // Add interactivity: on hover, make the container rotate slightly
  container.setInteractive(
    new Phaser.Geom.Rectangle(0, 0, 800, 600),
    Phaser.Geom.Rectangle.Contains
  );
  container.on("pointerover", () => {
    this.tweens.add({
      targets: container,
      angle: 5,
      duration: 200,
      yoyo: true,
      ease: "Sine.easeInOut",
    });
  });

  // Destroy the container on mouse click with a scale-down effect
  this.input.on("pointerdown", () => {
    this.tweens.add({
      targets: container,
      scale: 1,
      duration: 500,
      ease: "Power2",
      onComplete: () => {
        container.destroy();
      },
    });
  });
}
