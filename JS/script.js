
function toggleContent(id)
{
    var content = document.getElementById("content" + id);
    if (content.style.display === "none") {
        content.style.display = "block";
    } else {
        content.style.display = "none";
    }
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
    minutes = minutes < 10 ? '0'+minutes : minutes;
    let status_time = `${hours}/${minutes}/${seconds} ${ampm}`;

    let content1 = document.getElementById("content1");
    content1.innerHTML = status_date + ' ' + status_time;
}
