// Массив с URL изображений
const imagesUrls = [
    "https://www.free-pictures-photos.com/wp-content/uploads/photo-gallery/tree-flowers-b5aq.jpg",
    "https://www.free-pictures-photos.com/wp-content/uploads/photo-gallery/black-white-tulips-v6h3.jpg",
    "https://www.free-pictures-photos.com/wp-content/uploads/photo-gallery/pic-orchid-z5ea.jpg",
    "https://www.free-pictures-photos.com/wp-content/uploads/photo-gallery/free-photo-pc3e.jpg",
    "https://www.free-pictures-photos.com/wp-content/uploads/photo-gallery/flower-photo-9hey.jpg",
    "https://www.free-pictures-photos.com/wp-content/uploads/photo-gallery/flowers-image-6dy3.jpg",
    "https://www.free-pictures-photos.com/wp-content/uploads/photo-gallery/exotic-flowers-z9vw.jpg",
    "https://www.free-pictures-photos.com/wp-content/uploads/photo-gallery/bush-flowers-vc44.jpg",
    "https://www.free-pictures-photos.com/wp-content/uploads/photo-gallery/photo-flowers-ua3b.jpg",
    "https://www.free-pictures-photos.com/wp-content/uploads/photo-gallery/garden-flowers-cu3y.jpg",
    "https://www.free-pictures-photos.com/wp-content/uploads/photo-gallery/flowers-ane8.jpg",
];

// индекс для отслеживания текущей картинки
let currentIndex = 0;

// Устанавливаем начальное изображение
const imageElement = document.querySelector("#image");
console.log(imageElement)
imageElement.src = imagesUrls[currentIndex];

// Функция, отвечающая за переход к следующему изображению
function nextImageHandler() {
    // Увеличиваем индекс текущего изображения
    currentIndex++;

    // Если текущий индекс больше длины массива изображений, устанавливаем его обратно в 0
    if (currentIndex >= imagesUrls.length) {
        currentIndex = 0;
    }

    // Показываем следующее изображение
    const src_change_delay = 500; // задержка перед сменой картинки
    imageElement.className = "change";
    setTimeout(function () {
            imageElement.src = imagesUrls[currentIndex];
        }
        , src_change_delay
    );
    setTimeout(function () {
            imageElement.className = "stable";
        },
        2 * src_change_delay
    );

}

//  Функция, отвечающая за переход к предыдущему изображению
function previousImageHandler() {
    // Уменьшаем индекс
    currentIndex--;
    // Если текущий индекс меньше 0, устанавливаем его на последний индекс массива изображений
    if (currentIndex < 0) {
        currentIndex = imagesUrls.length - 1;
    }
    // Показываем предыдущее изображение
    const src_change_delay = 500; // задержка перед сменой картинки
    imageElement.className = "change";
    setTimeout(function () {
            imageElement.src = imagesUrls[currentIndex];
        }
        , src_change_delay
    );
    setTimeout(function () {
            imageElement.className = "stable";
        },
        2 * src_change_delay
    );
}

// Устанавливаем обработчики изображений на кнопки
const nextButton = document.querySelector("#next");
nextButton.addEventListener("click", nextImageHandler);

const previousButton = document.querySelector("#previous");
previousButton.addEventListener("click", previousImageHandler);
