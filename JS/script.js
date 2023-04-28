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

function task7(){
    const menuItems = document.querySelectorAll('.menu-item');
    const result = document.getElementById('result');

    function hideMenuItem(item, callback) {
        //  устанавливает переходную анимацию (transition) для свойства opacity элемента (item),
        //  которая будет длиться 1 секунду и будет происходить с плавным входом и выходом (ease-in-out)
        item.style.transition = 'opacity 1s ease-in-out';
        item.style.opacity = 0;
        setTimeout(() => {
            item.style.display = 'none';
            callback();
        }, 1000);
    }

    function startMenu() {
        for (let i = 0; i < menuItems.length; i++) {
            // проявляем
            menuItems[i].style.display = 'block';
            // обработчик события
            menuItems[i].addEventListener('click', () => {
                hideMenuItem(menuItems[i], () => {
                    // меняем стиль
                    const visibleItems = document.querySelectorAll('.menu-item[style*="display: block"]');
                    if (visibleItems.length === 0) {
                        result.textContent = "Что ты наделал?Сладости закончились :(";
                    }
                });
            });
        }
    }
    // при нажатии открывается меню
    const title = document.querySelector('.title');
    title.addEventListener('click', startMenu);
}

function task8(){
    const image = document.getElementById('image');
    const text = document.getElementById('text');

    function handleMouseOver() {
        text.style.opacity = 1;
        image.style.opacity=0;
    }

    function handleMouseOut() {
        text.style.opacity = 0;
        image.style.opacity=1;
    }

    image.addEventListener('mouseover', handleMouseOver);
    image.addEventListener('mouseout', handleMouseOut);

}


function task9() {
    const form = document.querySelector('.form');
    const emailInput = document.getElementById('email-input');
    const passwordInput = document.getElementById('password-input');
    const confirmPasswordInput = document.getElementById('confirm-password-input');
    const usernameInput = document.getElementById('username-input');
    const phoneInput = document.getElementById('phone-input');
    const nameInput = document.getElementById('name-input');
    const facultyInput = document.getElementById('faculty-input');
    const departmentInput = document.getElementById('department-input');

    function validateDepartment(department) {
        if (!(/^[A-Za-zА-Яа-яЁё\s-]{2,50}$/).test(department)) {
            departmentInput.classList.add('is-invalid');
            departmentInput.nextElementSibling.innerText = 'Введите корректное название кафедры, используя только буквы русского или латинского алфавита, пробелы и дефисы. Длина от 2 до 50 символов';
            return false;
        }
        else {
            departmentInput.classList.remove('is-invalid');
            departmentInput.nextElementSibling.innerText = '';
            return true;
        }
    }

    function validateFullName(name) {
        if (!(/^[A-Za-zА-Яа-яЁё\s-]{2,50}$/).test(name)) {
            nameInput.classList.add('is-invalid');
            nameInput.nextElementSibling.innerText = 'Введите корректное ФИО, используя только буквы русского или латинского алфавита, пробелы и дефисы. Длина от 2 до 50 символов';
            return false;
        }
        else {
            nameInput.classList.remove('is-invalid');
            nameInput.nextElementSibling.innerText = '';
            return true;
        }
    }
    function validateFaculty(faculty) {
        if (!(/^[A-Za-zА-Яа-яЁё\s-]{2,50}$/).test(faculty)) {
            facultyInput.classList.add('is-invalid');
            facultyInput.nextElementSibling.innerText = 'Введите корректное название факультета, используя только буквы русского или латинского алфавита, пробелы и дефисы. Длина от 2 до 50 символов';
            return false;
        }
        else {
            facultyInput.classList.remove('is-invalid');
            facultyInput.nextElementSibling.innerText = '';
            return true;
        }
    }
    function validateLogin(login) {
        if (!(/^[A-Za-z0-9_-]{3,16}$/).test(login)) {
            usernameInput.classList.add('is-invalid');
            usernameInput.nextElementSibling.innerText = 'Логин должен состоять из латинских букв, цифр, символов подчеркивания и дефисов, и иметь длину от 3 до 16 символов';
            return false;
        }
        else {
            usernameInput.classList.remove('is-invalid');
            usernameInput.nextElementSibling.innerText = '';
            return true;
        }
    }

    function validatePhone(phone) {
        if (!(/^8\d{10}$/).test(phone)) {
            phoneInput.classList.add('is-invalid');
            phoneInput.nextElementSibling.innerText = 'Введите корректный номер телефона в формате 8**********';
            return false;
        }
        else {
            phoneInput.classList.remove('is-invalid');
            phoneInput.nextElementSibling.innerText = '';
            return true;
        }
    }

    function validateEmail(email) {
        if (!(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/).test(email)) {
            emailInput.classList.remove('is-valid');
            emailInput.classList.add('is-invalid');
            emailInput.nextElementSibling.innerText = 'Введите корректный адрес электронной почты';
            return false;
        }
        emailInput.classList.remove('is-invalid');
        emailInput.classList.add('is-valid');
        emailInput.nextElementSibling.innerText = '';
        return true;
    }

    function validatePassword(password) {
        if (!(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/).test(password)) {
            passwordInput.classList.add('is-invalid');
            passwordInput.nextElementSibling.innerText = 'Пароль должен содержать хотя бы одну цифру, одну заглавную букву, одну строчную букву и быть от 6 до 20 символов';
            return false;
        }
        else {
            passwordInput.classList.remove('is-invalid');
            passwordInput.nextElementSibling.innerText = '';
            return true;
        }
    }

    function validateConfirmPassword(confirmPassword) {
        if (passwordInput.value !== confirmPassword) {
            confirmPasswordInput.classList.add('is-invalid');
            confirmPasswordInput.nextElementSibling.innerText = 'Пароли не совпадают';
            return false;
        }
        else {
            confirmPasswordInput.classList.remove('is-invalid');
            confirmPasswordInput.nextElementSibling.innerText = '';
            return true;
        }
    }

    function validateForm() {
        let isValid = true;
        const email = emailInput.value;
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;
        const username = usernameInput.value;
        const phone = phoneInput.value;
        const name = nameInput.value;
        const faculty = facultyInput.value;
        const department=departmentInput.value;

        if (!validateEmail(email)) {
            isValid = false;
        }

        if (!validatePassword(password)) {
            isValid = false;
        }

        if (!validateConfirmPassword(confirmPassword)) {
            isValid = false;
        }

        if (!validateLogin(username)) {
            isValid = false;
        }

        if (!validatePhone(phone)) {
            isValid = false;
        }

        if (!validateFullName(name)) {
            isValid = false;
        }

        if (!validateFaculty(faculty)) {
            isValid = false;
        }

        if (!validateDepartment(department)) {
            isValid = false;
        }

        return isValid;
    }
    function clearForm() {
        emailInput.value = '';
        passwordInput.value = '';
        confirmPasswordInput.value = '';
        usernameInput.value = '';
        phoneInput.value = '';
        nameInput.value = '';
        facultyInput.value = '';
        departmentInput.value = '';
    }

    form.addEventListener('submit', function(event) {
        if (!validateForm()) {
            event.preventDefault();
        }
        else {
            event.preventDefault();
            location.reload();
            // Показываем сообщение об отправке
            alert("Сообщение отправлено!");
        }
    });

    emailInput.addEventListener('blur', function() {
        validateEmail(emailInput.value);
    });

    passwordInput.addEventListener('blur', function() {
        validatePassword(passwordInput.value);
    });

    confirmPasswordInput.addEventListener('blur', function() {
        validateConfirmPassword(confirmPasswordInput.value);
    });

    usernameInput.addEventListener('blur', function() {
        validateLogin(usernameInput.value);
    });

    phoneInput.addEventListener('blur', function() {
        validatePhone(phoneInput.value);
    });

    nameInput.addEventListener('blur', function() {
        validateFullName(nameInput.value);
    });

    facultyInput.addEventListener('blur', function() {
        validateFaculty(facultyInput.value);
    });

    departmentInput.addEventListener('blur', function() {
        validateDepartment(departmentInput.value);
    });

    const clearButton = document.getElementById('clear-button');
    clearButton.addEventListener('click', clearForm);

}