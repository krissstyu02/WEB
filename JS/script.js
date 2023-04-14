setInterval(showDateTime, 1000)
function toggleContent(id)
{
    var content = document.getElementById("content" + id);
    if (content.style.display === "none") {
        content.style.display = "block";
    } else {
        content.style.display = "none";
    }
    blocks()
}

function showDateTime(){
    let now = new Date();
    //год с незначащими нулями
    let year = now.getFullYear();
    let month = (now.getMonth() + 1).toString().padStart(2, '0');
    let day = now.getDate().toString().padStart(2, '0');
    let daysOfWeek = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
    let day_week = daysOfWeek[now.getDay()];
    let status_date = `${year}-${day}-${month},${day_week}`;
    //время с нулями
    let hours = now.getHours().toString().padStart(2, '0');
    let minutes = now.getMinutes().toString().padStart(2, '0');
    let seconds = now.getSeconds().toString().padStart(2, '0');
    let ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    let status_time = `${hours}/${minutes}/${seconds} ${ampm}`;
    let content1 = document.getElementById("content1");
    content1.innerHTML = status_time+"<br>"+ status_date ;
}


var Cal = function(divId) {
    //Сохраняем идентификатор div
    this.divId = divId;
    // Дни недели с понедельника
    this.DaysOfWeek = [
        'Пн',
        'Вт',
        'Ср',
        'Чт',
        'Пт',
        'Сб',
        'Вс'
    ];
    // Месяцы начиная с января
    this.Months =['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
    //Устанавливаем текущий месяц, год
    var d = new Date();
    this.currMonth = d.getMonth();
    this.currYear = d.getFullYear();
    this.currDay = d.getDate();
};
// Переход к следующему месяцу
Cal.prototype.nextMonth = function() {
    if ( this.currMonth == 11 ) {
        this.currMonth = 0;
        this.currYear = this.currYear + 1;
    }
    else {
        this.currMonth = this.currMonth + 1;
    }
    this.showcurr();
};
// Переход к предыдущему месяцу
Cal.prototype.previousMonth = function() {
    if ( this.currMonth == 0 ) {
        this.currMonth = 11;
        this.currYear = this.currYear - 1;
    }
    else {
        this.currMonth = this.currMonth - 1;
    }
    this.showcurr();
};
// Показать текущий месяц
Cal.prototype.showcurr = function() {
    this.showMonth(this.currYear, this.currMonth);
};
// Показать месяц (год, месяц)
Cal.prototype.showMonth = function(y, m) {
    var d = new Date()
        // Первый день недели в выбранном месяце
        , firstDayOfMonth = new Date(y, m, 7).getDay()
        // Последний день выбранного месяца
        , lastDateOfMonth =  new Date(y, m+1, 0).getDate()
        // Последний день предыдущего месяца
        , lastDayOfLastMonth = m == 0 ? new Date(y-1, 11, 0).getDate() : new Date(y, m, 0).getDate();
    var html = '<table>';
    // Запись выбранного месяца и года
    html += '<thead><tr>';
    html += '<td colspan="7">' + this.Months[m] + ' ' + y + '</td>';
    html += '</tr></thead>';
    // заголовок дней недели
    html += '<tr class="days">';
    for(var i=0; i < this.DaysOfWeek.length;i++) {

        html += '<td>' + this.DaysOfWeek[i] + '</td>';
    }
    html += '</tr>';
    // Записываем дни
    var i=1;
    do {
        var dow = new Date(y, m, i).getDay();
        // Начать новую строку в понедельник
        if ( dow == 1 ) {
            html += '<tr>';
        }
        // Если первый день недели не понедельник показать последние дни предыдущего месяца
        else if ( i == 1 ) {
            html += '<tr>';
            var k = lastDayOfLastMonth - firstDayOfMonth+1;
            for(var j=0; j < firstDayOfMonth; j++) {
                html += '<td class="not-current">' + k + '</td>';
                k++;
            }
        }
        // Записываем текущий день в цикл
        var chk = new Date();
        var chkY = chk.getFullYear();
        var chkM = chk.getMonth();
        if (chkY == this.currYear && chkM == this.currMonth && i == this.currDay) {
            html += '<td class="today">' + i + '</td>';
        }
        else if (dow == 0 || dow == 6) {
            html += '<td class="weekend">' + i + '</td>';
        }
        else {
            html += '<td class="normal">' + i + '</td>';
        }
        // закрыть строку в воскресенье
        if ( dow == 0 ) {
            html += '</tr>';
        }
        // Если последний день месяца не воскресенье, показать первые дни следующего месяца
        else if ( i == lastDateOfMonth ) {
            var k=1;
            for(dow; dow < 7; dow++) {
                html += '<td class="not-current">' + k + '</td>';
                k++;
            }
        }
        i++;
    }while(i <= lastDateOfMonth);
    // Конец таблицы
    html += '</table>';
    // Записываем HTML в div
    document.getElementById(this.divId).innerHTML = html;
};
// При загрузке окна загружать календарь
window.onload = function() {
    // Начать календарь
    var c = new Cal("divCal");
    c.showcurr();
    // Привязываем кнопки «Следующий» и «Предыдущий»
    getId('btnNext').onclick = function() {
        c.nextMonth();
    };
    getId('btnPrev').onclick = function() {
        c.previousMonth();
    };
}

function getId(id) {
    return document.getElementById(id);
}


function blocks(id) {
    // Получаем ссылку на родительский элемент
    const parentElement = document.getElementById('parent-element');
// Получаем массив всех блоков DOM-дерева внутри родительского элемента
    const blocks = parentElement.querySelectorAll('.block');
// Выводим количество элементов в блоке с заданным номером (например, блок с номером 2)
    const blockNumber = 2;
    const block = blocks[blockNumber - 1];
    const count = block.querySelectorAll('*').length;
    document.getElementById("divCount").innerHTML = `Количество элементов в блоке ${blockNumber}= ${count}`;
}

function task4() {
    const parentElement = document.getElementById('content4');
// Получаем все блоки и сохраняем их в массиве
    const blockss = parentElement.querySelectorAll('.quad');
// Задаем интервал для перекрашивания блока каждые 150 миллисекунд
    setInterval(function () {
        // Выбираем случайный блок из массива блоков
        var randomBlock = blockss[Math.floor(Math.random() * blockss.length)];
        // Выбираем случайный цвет в формате HEX
        var randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
        // Меняем фоновый цвет выбранного блока на выбранный цвет
        randomBlock.style.backgroundColor = randomColor;
    }, 150);
}

function task5() {
    const startBtn = document.querySelector('#start-btn');
    startBtn.addEventListener('click', () => {
        const list = document.querySelector('#list');
        for (let i = 0; ; i++) {
            const content = prompt('Введите содержимое элемента списка:');
            if (!content) break;
            const listItem = document.createElement('li');
            listItem.textContent = content;
            list.insertBefore(listItem, list.firstChild);
        }
    });
}

function task6(){
    let elem = document.getElementById('divEvent');
    // elem.mouseout=elem.classList.replace('task6_block','task6_block_new');
    elem.addEventListener("mouseout", ()=>{elem.classList.replace('task6_block','task6_block_new')});
    elem.addEventListener("mouseover", ()=>{elem.classList.replace('task6_block_new','task6_block')});

}