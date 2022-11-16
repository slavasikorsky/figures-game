addEventListener('load', () => {
    const container = document.querySelector('.container');
    const buttonStart = container.querySelector('.btn-start');
    const buttonStop = container.querySelector('.btn-stop');
    const buttonPlus = container.querySelector('.btn-plus');
    const buttonMinus = container.querySelector('.btn-minus');
    const count = container.querySelector('.count');
    const canvas = container.querySelector('canvas');
    const ctx = canvas.getContext('2d');
    let currentCount = 0;
    //array of figures
    figures = [
        {
            name: 'rectangle',
            colour: '#05EFFF',
            width: 50,
            height: 30,
            top: 20,
            left: 15
        },
        {
            name: 'arc',
            colour: '#d45',
            width: 50,
            radius: 20,
            top: 120,
            left: 250
        },
        {
            name: 'triangle',
            colour: '#d31',
            width: 20,
            top: 60,
            left: 100
        },
        {
            name: 'rectangle',
            colour: '#c2c3c4',
            width: 70,
            height: 20,
            top: 100,
            left: 150
        },
        {
            name: 'triangle',
            colour: '#fd3',
            width: 25,
            top: 80,
            left: 20
        },
        {
            name: 'rectangle',
            colour: '#f04',
            width: 25,
            height: 20,
            top: 40,
            left: 120
        },
        {
            name: 'rectangle',
            colour: '#fd2',
            width: 30,
            height: 40,
            top: 10,
            left: 220
        }
    ];

    const clean = (canvas) => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    const drawRectangle = (element, ctx) => {
        ctx.fillStyle = element.colour;
        ctx.fillRect(element.left, element.top, element.width, element.height);
    }

    const drawTriangle = (element, ctx) => {
        ctx.fillStyle = element.colour;
        ctx.beginPath();
        ctx.moveTo(element.left, element.top);
        ctx.lineTo(element.left + element.width, element.top);
        ctx.lineTo(element.left, element.top + element.width);
        ctx.closePath();
        ctx.fill();
    }

    const drawArc = (element, ctx) => {
        ctx.fillStyle = element.colour;
        ctx.beginPath();
        ctx.arc(element.left, element.top, element.radius, 0, 2 * Math.PI);
        ctx.fill();
    }

    const render = (number, array, canvas) => {
        clean(canvas);
        array.slice(0, number).forEach(element => {
            switch (element.name) {
                case 'arc': {
                    drawArc(element, ctx);
                    break;
                }
                case 'rectangle': {
                    drawRectangle(element, ctx);
                    break;
                }
                case 'triangle': {
                    drawTriangle(element, ctx);
                    break;
                }
            }
        });
    }

    const disableButtons = (status, ...buttons) => {
        buttons.forEach(e => e.disabled = status)
    }

    //load
    disableButtons(true, buttonPlus, buttonMinus);

    buttonStart.addEventListener('click', (e) => {
        e.preventDefault;
        //active +- buttons
        disableButtons(false, buttonPlus, buttonMinus);
    })

    buttonStop.addEventListener('click', (e) => {
        e.preventDefault;
        //disabled +-buttons
        disableButtons(true, buttonPlus, buttonMinus);
    })

    buttonPlus.addEventListener('click', (e) => {
        e.preventDefault();
        currentCount += 1
        count.innerHTML = currentCount;
        render(currentCount, figures, canvas);
    });

    buttonMinus.addEventListener('click', (e) => {
        e.preventDefault();
        if (currentCount > 0) {
            currentCount -= 1;
            count.innerHTML = currentCount;
            render(currentCount, figures, canvas);
        } else {
            count.innerHTML = 0;
            clean(canvas);
        }
    });
});
