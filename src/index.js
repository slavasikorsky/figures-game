addEventListener('load', () => {
    const container = document.querySelector('.container');
    const buttonStart = container.querySelector('.btn-start');
    const buttonStop = container.querySelector('.btn-stop');
    const buttonPlus = container.querySelector('.btn-plus');
    const buttonMinus = container.querySelector('.btn-minus');
    const count = container.querySelector('.count');
    const gameContent = container.querySelector('.game-content');

    //currentCount = current images count
    //imageCount = number of add/remove image
    let currentCount = 0;
    let imageCount = 0;

    const data = {
        colors: [
            'Red',
            'Blue',
            'Green',
            'Cyan',
            'Orange',
            'DarkRed',
            'DarkSlateGray',
            'BurlyWood',
            'Lavender',
            'LightGray',
            'PaleGreen',
            'SeaGreen',
            'Purple',
            'Sienna',
            'RoyalBlue',
            'SlateGrey',
            'Teal',
            'Yellow'
        ],
        size: [
            0.5,
            1,
            2
        ]
    };

    const images = [
        {
            id: 0,
            type: 'rectangle',
            width: 100,
        },
        {
            id: 1,
            type: 'rectangle',
            width: 50,
        },
        {
            id: 3,
            type: 'rectangle',
            width: 25,
        },
        {
            id: 4,
            type: 'star',
            width: 25,
        },
        {
            id: 5,
            type: 'star',
            width: 35,
        },
        {
            id: 6,
            type: 'star',
            width: 40,
        },
        {
            id: 7,
            type: 'circle',
            width: 15,
        },
        {
            id: 8,
            type: 'circle',
            width: 30,
        },
        {
            id: 9,
            type: 'triangle',
            width: 30,
        },
        {
            id: 10,
            type: 'triangle',
            width: 20,
        },
    ];

    const random = (max) => {
        return Math.floor(Math.random() * max);
    }


    const setPosition = (elementWidth, coordinate, container) => {
        const parentRect = container.getBoundingClientRect();
        let maxCoord;
        coordinate == 'left'
            ? maxCoord = parentRect.width
            : coordinate == 'top'
                ? maxCoord = parentRect.height
                : null
        const max = maxCoord - elementWidth
        return random(max);
    }

    const renderCircle = (data, container) => {
        container.innerHTML += `<svg class="image" data-count="${imageCount}" xmlns="http://www.w3.org/2000/svg" width="${data.width}" height="${data.width}" viewBox="0 0 46 46" ${data.style}'>
        <circle cx="23" cy="23" r="23" fill="${data.color}"/>
        </svg>`;
    }

    const renderStar = (data, container) => {
        container.innerHTML += `\n
            <svg xmlns='http://www.w3.org/2000/svg' data-count="${imageCount}" width='${data.width}' height='${data.width}'\n
            class='image' viewBox='0 0 69 57' ${data.style}>\n
            <path d='M34.5 0L42.4702 21.766H68.2625L47.3961 35.2181L55.3664 56.984L34.5 43.5319L13.6336 56.984L21.6039 35.2181L0.737495 21.766H26.5298L34.5 0Z'\n
            fill='${data.color}'/></svg>`
            ;
    }

    const renderRectangle = (data, container) => {
        container.innerHTML += `<svg class="image" data-count="${imageCount}" xmlns="http://www.w3.org/2000/svg" width="${data.width}" height="${data.width}" viewBox="0 0 50 45" ${data.style}'>
        <rect width="50" height="45" fill="${data.color}"/>
        </svg>`;
    }

    const renderTriangle = (data, container) => {
        container.innerHTML += `<svg class="image" data-count="${imageCount}" xmlns="http://www.w3.org/2000/svg" width="${data.width}" height="${data.width}" viewBox="0 0 33 28" fill="none" ${data.style}'>
        <path d="M16.5 0L32.5215 27.75H0.478531L16.5 0Z" fill="${data.color}"/>
        </svg>`
    }

    const changeCount = (num, count) => {
        currentCount = num;
        count.innerHTML = currentCount;
    }

    const clean = (container) => {
        container.querySelectorAll('.image').forEach(e => e.remove());
    }

    const removeImage = (container, number) => {
        imageCount--;
        console.log(number);
        const image = container.querySelector(`[data-count="${number}"]`);
        image.remove();
    }

    const getCoords = (container, width) => {
        let elementTop, elementLeft, test, i = 0;
        //get all images
        const allImages = container?.querySelectorAll('.image');

        //100 times check if random position doesn't overlap other figures
        for (i = 0; i<=100; i++) {
            test = false
            elementTop = setPosition(width, 'top', container);
            elementLeft = setPosition(width, 'left', container);
            test = [...allImages].every(image => checkOverlap(image, elementTop, elementLeft, width) == true);
            console.log(test);
            if(test == true && i <= 100) {
                return {elementTop, elementLeft}
            }
        }
        if (!test) {
            console.error('game stop');
            disableButtons(true, buttonPlus, buttonMinus);
            return {elementTop, elementLeft}
        }

    };

    const render = async (element, container) => {
        const elementSize = data.size[random(data.size.length)];
        const elementWidth = elementSize * element.width;
        const color = data.colors[random(data.colors.length)];
        const {elementTop, elementLeft} = await getCoords(container, elementWidth);
        let style = `style="top: ${elementTop}px; left: ${elementLeft}px"`;

        const elementData = {
            width: elementWidth,
            color: color,
            style: style,
        }

        switch (element.type) {
            case 'triangle': {
                renderTriangle(elementData, container);
                break;
            }
            case 'rectangle': {
                renderRectangle(elementData, container);
                break;
            }
            case 'circle': {
                renderCircle(elementData, container);
                break;
            }
            case 'star': {
                renderStar(elementData, container);
                break;
            }
        }
    }

    const disableButtons = (status, ...buttons) => {
        buttons.forEach(e => e.disabled = status)
    }

    const getLastImage = (container) => {
        const images = container.querySelectorAll('[data-count]');
        const imagesArray = [];
        images.forEach(image => {
            imagesArray.push(image.dataset.count);
        });
        return Math.max(...imagesArray);
    }

    const checkOverlap = (el1, elTop, elLeft, elWidth) => {
        const figure1 = el1.getBoundingClientRect();

        return (
            figure1.top > (elTop + elWidth) ||
            figure1.right < elLeft ||
            figure1.bottom < elTop ||
            figure1.left > (elLeft + elWidth)
        );
    }

    //load
    container.addEventListener('click', (e) => {
        if (e.target.parentNode.classList.contains('image')) {
            //e.target.parentNode.classList.add('hide');
            e.target.parentNode.remove();
            changeCount(currentCount - 1, count);
        }
    });

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
        clean(gameContent);
        changeCount(0, count);
    })

    buttonPlus.addEventListener('click', (e) => {
        e.preventDefault();
        changeCount(currentCount + 1, count);
        imageCount++;
        render(images[random(images.length)], gameContent);
    });

    buttonMinus.addEventListener('click', (e) => {
        e.preventDefault();
        if (currentCount > 0) {
            changeCount(currentCount - 1, count);
            removeImage(gameContent, getLastImage(gameContent));
        } else {
            changeCount(0, count);
        }
    });
});
