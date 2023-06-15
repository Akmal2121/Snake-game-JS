const canvas = document.getElementById("snake_game");
const ctx = canvas.getContext("2d");
const new_game=document.getElementById("new_game")
const change_color=document.getElementById("change_color")
const change_field=document.getElementById("change_field")
let count_color=0

// Начальные координаты яблока
let apple = {
  x: 400,
  y: 400,
};

// Размер одной клеточки на поле - 16 пикселей
const size_block = 16;

// Временная переменная для повышения скорости
let temp_speed = 0;

// Змейка и её свойства
let snake = {
  // начальные координаты
  x: 160,
  y: 160,
  // Скорость змейки
  // В каждом кадре смещается по оси X или Y
  // Изначально по горизонтали.
  dx: size_block,
  dy: 0,
  // Хвост змейки. Изначально пустой
  cells: [],
  // Минимальная длина змейки - 3 ячейки
  minCells: 3,
};

// Функция для рандомного числа для появления яблок
function get_random_apple(min, max) {
  const number = Math.floor(Math.random() * (max - min)) + min;
  return number;
}

// Анимация игры Змейка
function animation_game() {
  requestAnimationFrame(animation_game);

  if (++temp_speed < 4) {
    return;
  }
  // Обнуляем перекменную для скорости
  temp_speed = 0;

  // Очищаем поле
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Двигаем змейку
  snake.x += snake.dx;
  snake.y += snake.dy;

  // Если змейка достигла края поля
  if (snake.x < 0) {
    // snake.x = canvas.width - size_block;
    // когда столкнулась в стенку края
    newgame()
  }
  if (snake.x >= canvas.width) {
    // snake.x = 0;
    newgame()
  }

  if (snake.y < 0) {
    // snake.y = canvas.height - size_block;
    newgame()
  }
  if (snake.y >= canvas.height) {
    // snake.y = 0;
    newgame()
  }

  // Логика для движения
  snake.cells.unshift({ x: snake.x, y: snake.y });
  if (snake.cells.length > snake.minCells) {
    snake.cells.pop();
  }

  // Отображение яблока
  ctx.fillStyle = "green";
  ctx.fillRect(apple.x, apple.y, size_block - 1, size_block - 1);

  // Движение змейки
  // Проверять не столкнулась ли змея сама с собой
  
  // добавил цвет
  ctx.fillStyle = colors[count_color];
  // ctx.fillStyle = "gold";
  


  snake.cells.forEach(function (cell, index) {
    ctx.fillRect(cell.x, cell.y, size_block - 1, size_block - 1);
    // Если змейка добралась до яблока
    if (cell.x === apple.x && cell.y === apple.y) {
      snake.minCells++;
      // Рисуем новое яблоко
      apple.x = get_random_apple(0, 50) * size_block;
      apple.y = get_random_apple(0, 50) * size_block;
    }

    // Проверяем не столкнулась ли змейка сама с собой
    for (let i = index + 1; i < snake.cells.length; i++) {
      // Если змейка столкнулась
      if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
        // первоначальные координаты для змейки
        // snake.x = 160;
        // snake.y = 160;
        // snake.cells = [];
        // snake.minCells = 3;
        // snake.dx = size_block;
        // snake.dy = 0;

        // // Случайное место для яблока
        // apple.x = get_random_apple(0, 50) * size_block;
        // apple.y = get_random_apple(0, 50) * size_block;
        newgame()
      }
    }
  });
}

// Слушатель событий на нажатие клавиш (передвижение змейки)
document.addEventListener("keydown", (event) => {
  // Проверяем какая клавиша нажата
  // На лево
  if (event.which === 65 && snake.dx === 0) {
    snake.dx = -size_block;
    snake.dy = 0;
  }
  // На право
  if (event.which === 68 && snake.dx === 0) {
    snake.dx = size_block;
    snake.dy = 0;
  }
  // Вверх
  if (event.which === 87 && snake.dy === 0) {
    snake.dx = 0;
    snake.dy = -size_block;
  }
  // Вниз
  if (event.which === 83 && snake.dy === 0) {
    snake.dx = 0;
    snake.dy = size_block;
  }
});

requestAnimationFrame(animation_game);

function newgame() {
  // первоначальные координаты для змейки
  snake.x = 160;
  snake.y = 160;
  snake.cells = [];
  snake.minCells = 3;
  snake.dx = size_block;
  snake.dy = 0;

  // Случайное место для яблока
  apple.x = get_random_apple(0, 50) * size_block;
  apple.y = get_random_apple(0, 50) * size_block;
}

// кнопки для настроек
new_game.addEventListener("click",()=>{
  newgame()
})

// кнопка для смены скина
const colors=["white","purple","gold"]
change_color.addEventListener("click",()=>{
  // console.log(count_color);
  count_color++
  if (count_color==3) {
    count_color=0
  }
})

let j=0
const color_field=["black","brown","grey"]
change_field.addEventListener("click",()=>{
  canvas.style.background=color_field[j]
  j++
  if (j==3) {
    j=0
  }
})

// изменения: 92-63-123 строка