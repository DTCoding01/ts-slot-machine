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

const fruitTypes: Fruit[] = [
  new Fruit("Cherry", "../assets/cherry.png"),
  new Fruit("Lemon", "../assets/lemon.png"),
  new Fruit("Orange", "../assets/orange.png"),
];

class Reel {
  fruits: Fruit[];

  constructor() {
    this.fruits = [
      this.getRandomFruit(),
      this.getRandomFruit(),
      this.getRandomFruit(),
    ];
  }

  getRandomFruit(): Fruit {
    return fruitTypes[Math.floor(Math.random() * fruitTypes.length)];
  }

  spin(): void {
    this.fruits.pop();
    this.fruits.unshift(this.getRandomFruit());
  }

  getFruits(): Fruit[] {
    return this.fruits;
  }
}

class SlotMachine {
  private reels: Reel[];
  private spinDuration: number;
  private balance: number;
  private payoutAmount: number;

  constructor() {
    this.reels = [];
    while (this.reels.length < 3) {
      this.reels.push(new Reel());
    }
    this.spinDuration = 2000;
    this.balance = 100;
    this.payoutAmount = 50;
  }

  displayReels(): void {
    this.reels.forEach((reel, index) => {
      const reelElement = document.getElementById(`reel${index + 1}`);
      if (reelElement) {
        reelElement.innerHTML = "";

        const reelImages = reel.getFruits().map((fruit) => {
          const imageElement = document.createElement("img");
          imageElement.src = fruit.getImagePath();
          imageElement.alt = fruit.getName();
          imageElement.style.width = "100px";
          return imageElement;
        });

        reelImages.forEach((img) => reelElement.appendChild(img));
      }
    });
  }

  checkWin(): boolean {
    const topRowWin =
      this.reels[0].getFruits()[0].getName() ===
        this.reels[1].getFruits()[0].getName() &&
      this.reels[0].getFruits()[0].getName() ===
        this.reels[2].getFruits()[0].getName();

    const middleRowWin =
      this.reels[0].getFruits()[1].getName() ===
        this.reels[1].getFruits()[1].getName() &&
      this.reels[0].getFruits()[1].getName() ===
        this.reels[2].getFruits()[1].getName();

    const bottomRowWin =
      this.reels[0].getFruits()[2].getName() ===
        this.reels[1].getFruits()[2].getName() &&
      this.reels[0].getFruits()[2].getName() ===
        this.reels[2].getFruits()[2].getName();

    return topRowWin || middleRowWin || bottomRowWin;
  }

  updateBalance(win: boolean): void {
    const messageElement = document.getElementById("message");
    if (win) {
      this.balance += this.payoutAmount;
      if (messageElement)
        messageElement.textContent = `You win! Balance $${this.balance}`;
    } else {
      this.balance -= 10;
      if (messageElement)
        messageElement.textContent = `You lose! Balance $${this.balance}`;
    }
  }

  animateReels(): void {
    let spins = 0;
    const spinInterval = 200;

    const spinAnimation = setInterval(() => {
      this.reels.forEach((reel) => {
        reel.spin();
      });
      this.displayReels();

      spins += spinInterval;
      if (spins >= this.spinDuration) {
        clearInterval(spinAnimation);
        this.updateBalance(this.checkWin());
      }
    }, spinInterval);
  }

  play(): void {
    this.animateReels();
  }
}

const game = new SlotMachine();

const spinButton = document.getElementById("spin-button");
spinButton?.addEventListener("click", () => {
  game.play();
});
