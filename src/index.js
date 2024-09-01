"use strict";
class Fruit {
    constructor(name, imagePath) {
        this.name = name;
        this.imagePath = imagePath;
    }
    getName() {
        return this.name;
    }
    getImagePath() {
        return this.imagePath;
    }
}
const fruitTypes = [
    new Fruit("Cherry", "../assets/cherry.png"),
    new Fruit("Lemon", "../assets/lemon.png"),
    new Fruit("Orange", "../assets/orange.png"),
];
class Reel {
    constructor() {
        this.fruits = [
            this.getRandomFruit(),
            this.getRandomFruit(),
            this.getRandomFruit(),
        ];
    }
    getRandomFruit() {
        return fruitTypes[Math.floor(Math.random() * fruitTypes.length)];
    }
    spin() {
        this.fruits.pop();
        this.fruits.unshift(this.getRandomFruit());
    }
    getFruits() {
        return this.fruits;
    }
}
class SlotMachine {
    constructor() {
        this.reels = [];
        while (this.reels.length < 3) {
            this.reels.push(new Reel());
        }
        this.spinDuration = 2000;
        this.balance = 100;
        this.payoutAmount = 50;
    }
    displayReels() {
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
    checkWin() {
        const topRowWin = this.reels[0].getFruits()[0].getName() ===
            this.reels[1].getFruits()[0].getName() &&
            this.reels[0].getFruits()[0].getName() ===
                this.reels[2].getFruits()[0].getName();
        const middleRowWin = this.reels[0].getFruits()[1].getName() ===
            this.reels[1].getFruits()[1].getName() &&
            this.reels[0].getFruits()[1].getName() ===
                this.reels[2].getFruits()[1].getName();
        const bottomRowWin = this.reels[0].getFruits()[2].getName() ===
            this.reels[1].getFruits()[2].getName() &&
            this.reels[0].getFruits()[2].getName() ===
                this.reels[2].getFruits()[2].getName();
        return topRowWin || middleRowWin || bottomRowWin;
    }
    updateBalance(win) {
        const messageElement = document.getElementById("message");
        if (win) {
            this.balance += this.payoutAmount;
            if (messageElement)
                messageElement.textContent = `You win! Balance $${this.balance}`;
        }
        else {
            this.balance -= 10;
            if (messageElement)
                messageElement.textContent = `You lose! Balance $${this.balance}`;
        }
    }
    animateReels() {
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
    play() {
        this.animateReels();
    }
}
const game = new SlotMachine();
const spinButton = document.getElementById("spin-button");
spinButton === null || spinButton === void 0 ? void 0 : spinButton.addEventListener("click", () => {
    game.play();
});
