class Fruit {
  private name: string;
  private imagePath: string;
  constructor(name: string, imagePath: string) {
    this.name = name;
    this.imagePath = imagePath;
  }

  getName(): string {
    return this.name;
  }

  getImagePath(): string {
    return this.imagePath;
  }
}

class Reel {
  fruits: Fruit[] = [
    new Fruit("Cherry", "../assets/cherry.png"),
    new Fruit("Lemon", "../assets/lemon.png"),
    new Fruit("Orange", "../assets/orange.png"),
  ];

  spin(): Fruit {
    const randomFruit: Fruit =
      this.fruits[Math.floor(Math.random() * this.fruits.length)];
    return randomFruit;
  }
}

class SlotMachine {
  private reels: Reel[];
  private spinDuration: number;

  constructor() {
    this.reels = [];
    while (this.reels.length < 3) {
      this.reels.push(new Reel());
    }
    this.spinDuration = 2000;
  }

  spinReels(): Fruit[] {
    const spinResult: Fruit[] = [];
    for (let reel of this.reels) {
      spinResult.push(reel.spin());
    }
    return spinResult;
  }

  displayResult(result: Fruit[]): void {
    result.forEach((fruit, index) => {
      const reelElement = document.getElementById(`reel${index + 1}`);
      if (reelElement) {
        reelElement.innerHTML = "";

        const imageElement = document.createElement("img");
        imageElement.src = fruit.getImagePath();
        imageElement.alt = fruit.getName();
        imageElement.style.width = "100px";

        reelElement.appendChild(imageElement);
      }
    });
  }

  displayRandomFruits(): void {
    let i: number = 0;
    while (i < 3) {
      const reelElement = document.getElementById(`reel${i + 1}`);
      if (reelElement) {
        const randomFruit = this.reels[i].spin();
        reelElement.innerHTML = "";

        const imageElement = document.createElement("img");
        imageElement.src = randomFruit.getImagePath();
        imageElement.alt = randomFruit.getName();
        imageElement.style.width = "100px";

        reelElement.appendChild(imageElement);
        i++;
      }
    }
  }

  play(): void {
    const finalResult = this.spinReels();

    let spins = 0;
    const spinInterval = 200;

    const spinAnimation = setInterval(() => {
      this.displayRandomFruits();
      spins += spinInterval;

      if (spins >= this.spinDuration) {
        clearInterval(spinAnimation);
        this.displayResult(finalResult);
      }
    }, spinInterval);
  }
}

const game = new SlotMachine();

const spinButton = document.getElementById("spin-button");
spinButton?.addEventListener("click", () => {
  game.play();
});
