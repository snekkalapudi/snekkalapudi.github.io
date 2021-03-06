(function dotGame() {

    let width = 800,
        height = 1000,
        bubblesQueue = [],
        bubbleCount = 10,
        defaultSpeed = 6,
        currentSpeed = defaultSpeed,
        score = 0;

    /**
     *  This will be the count of bubbles at any point in time.
     *  Relies on "bubbleCount"
     */
    function addInitialBubbles() {
        for (let i = 1; i <= bubbleCount; i++) {
            addNewBubbleWithDelay(i * 1000);
        }
    }

    function getBubble() {
        function getRandomSize() {
            return getRandomInt(10, 101);
        }

        function getRandomLeft(width) {
            return getRandomInt(10, width - 101);
        }

        function getRandomColor() {
            return '#' + Math.floor(Math.random() * 16777215).toString(16);
        }

        return {
            size: getRandomSize(),
            color: getRandomColor(),
            color1: getRandomColor(),
            left: getRandomLeft(width),
            animationDuration: defaultSpeed, // getRandomInt(3, 20),
            animationDelay: getRandomLeft(1, 5)
        };
    }

    function addBubblesFromQueue(bubblesQueue, container = 'bubbleContainer') {
        let bubbleContainer = document.getElementById(container);

        while (bubblesQueue.length > 0) {
            let bubble = bubblesQueue.shift();

            addBubble(bubbleContainer, bubble);
        }
    }

    function addBubble(bubbleContainer, bubble) {
        var divElem = document.createElement("div");
        divElem.setAttribute("style", `
            width: ${bubble.size}px;
            height: ${bubble.size}px;
            background-color: ${bubble.color};
            background-image: linear-gradient(${bubble.color}, ${bubble.color1});
            left: ${bubble.left}px;
            position: absolute;
            --drop-animation-duration: ${currentSpeed}s;
            animation-delay: 0s;`);
        divElem.classList.add("ball");
        divElem.addEventListener('click', pop);
        divElem.addEventListener('touchstart', pop);
        divElem.addEventListener("animationend", removeBubble);
        bubbleContainer.appendChild(divElem);
    }

    function updateHeight() {
        let gameControls = document.getElementById('gameControls');

        height = document.documentElement.clientHeight - gameControls.clientHeight;
        width = document.documentElement.clientWidth;
        let root = document.documentElement,
            bubbleScreenHeight = height - 40;
        root.style.setProperty('--drop-animation-height', `${bubbleScreenHeight}px`);
    }

    function disableTouchMove() {
        document.getElementById('bubbleContainer').addEventListener("touchmove", function (event) {
            event.preventDefault();
            event.stopPropagation();
        }, false);
    }

    function updateSpeed(speed) {
        console.log(speed, currentSpeed);
        currentSpeed = defaultSpeed / Number(speed);
        let bubblesInFlight = document.querySelectorAll('.ball');

        bubblesInFlight.forEach(input => input.style.setProperty('--drop-animation-duration', `${currentSpeed}s`));
    }

    function addNewBubble() {
        bubblesQueue.push(getBubble());
        addBubblesFromQueue(bubblesQueue);
    }

    function addNewBubbleWithDelay(delay = 1000) {
        setTimeout(() => addNewBubble(), delay);
    }

    function setupSliderEvents() {
        let slider = document.getElementById("myRange");

        // Update the current slider value (each time you drag the slider handle)
        slider.oninput = function () {
            updateSpeed(this.value);
        };
    }

    function updateScore(_score) {
        score += _score;
        let scoreContiner = document.getElementById('score');
        scoreContiner.innerText = score;
    }

    function pop(event) {
        event.preventDefault();
        let elem = event.target,
            elemWidth = elem.clientWidth,
            newScore = Math.floor(100 / Number(elemWidth));
        updateScore(newScore);
        elem.parentNode.removeChild(elem);
        addNewBubbleWithDelay();
    }

    function removeBubble(event) {
        let elem = event.target;
        elem.parentNode.removeChild(elem);
        addNewBubbleWithDelay();
    }

    function listenToScreenSizeChagnes() {
        // Listen for resize changes
        window.onresize = () => updateHeight();

        // Listen for orientation changes
        window.onorientationchange = () => updateHeight();
    }

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
    }

    document.addEventListener('DOMContentLoaded', (event) => {
        updateHeight();
        // Calculates duration based on height
        defaultSpeed = Math.floor(height / 10);

        addInitialBubbles();
        disableTouchMove();
        setupSliderEvents();
        addBubblesFromQueue(bubblesQueue);
        listenToScreenSizeChagnes();
    });
})();
