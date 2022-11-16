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
    const figures = [
        {
            id: 0,
            name: 'rectangle',
            colour: '#05EFFF',
            width: 50,
            height: 30,
            top: 20,
            left: 15
        },
        {
            id: 1,
            name: 'arc',
            colour: '#d45',
            width: 50,
            radius: 20,
            top: 120,
            left: 250
        },
        {
            id: 2,
            name: 'arc',
            colour: '#d40',
            radius: 20,
            top: 10,
            left: 110
        },
        {
            id: 3,
            name: 'arc',
            colour: '#d44',
            radius: 12,
            top: 60,
            left: 100
        },
        {
            id: 4,
            name: 'arc',
            colour: '#d56',
            radius: 16,
            top: 30,
            left: 110
        },
        {
            id: 5,
            name: 'triangle',
            colour: '#d31',
            width: 20,
            top: 60,
            left: 100
        },
        {
            id: 6,
            name: 'rectangle',
            colour: '#c2c3c4',
            width: 70,
            height: 20,
            top: 100,
            left: 150
        },
        {
            id: 7,
            name: 'triangle',
            colour: '#fd3',
            width: 25,
            top: 80,
            left: 20
        },
        {
            id: 8,
            name: 'rectangle',
            colour: '#f04',
            width: 25,
            height: 20,
            top: 40,
            left: 120
        },
        {
            id: 9,
            name: 'rectangle',
            colour: '#fd2',
            width: 30,
            height: 40,
            top: 10,
            left: 220
        }
    ];
    //result array
    let renderArray = [];

    const changeCount = (num, count) => {
        currentCount = num;
        count.innerHTML = currentCount;
    }

    const clean = (canvas, ctx) => {
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
        clean(canvas, ctx);
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

    const random = (max) => {
        return Math.floor(Math.random() * max);
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
        clean(canvas, ctx);
        changeCount(0, count);
        renderArray = [];
    })

    buttonPlus.addEventListener('click', (e) => {
        e.preventDefault();
        changeCount(currentCount+1, count);
        //push random figute into the renderArray
        renderArray.push(figures[random(figures.length)]);
        render(currentCount, renderArray, canvas);
    });

    buttonMinus.addEventListener('click', (e) => {
        e.preventDefault();
        if (currentCount > 0) {
            changeCount(currentCount-1, count);
            //remove las element of new array
            renderArray.pop();
            render(currentCount, renderArray, canvas);
        } else {
            changeCount(0, count);
            clean(canvas, ctx);
            renderArray = [];
        }
    });
});
