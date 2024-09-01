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
class Reel {
    constructor() {
        this.fruits = [
            new Fruit("Cherry", "../assets/cherry.png"),
            new Fruit("Lemon", "../assets/lemon.png"),
            new Fruit("Orange", "../assets/orange.png"),
        ];
    }
    spin() {
        const randomFruit = this.fruits[Math.floor(Math.random() * this.fruits.length)];
        return randomFruit;
    }
}
class SlotMachine {
    constructor() {
        this.reels = [];
        while (this.reels.length < 3) {
            this.reels.push(new Reel());
        }
        this.spinDuration = 2000;
    }
    spinReels() {
        const spinResult = [];
        for (let reel of this.reels) {
            spinResult.push(reel.spin());
        }
        return spinResult;
    }
    displayResult(result) {
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
    displayRandomFruits() {
        let i = 0;
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
    play() {
        const finalResult = this.spinReels();
        let spins = 0;
        const spinInterval = 100;
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
spinButton === null || spinButton === void 0 ? void 0 : spinButton.addEventListener("click", () => {
    game.play();
});
