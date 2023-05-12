<?php
session_start();

// данные были отправлены формой?
if(isset($_POST['Submit'])) {
    // проверяем данные на правильность...
    if($_POST['user_name'] === "cleo" && $_POST['user_pass'] === "password") {
        // запоминаем имя пользователя
        $_SESSION['logged_user'] = $_POST['user_name'];
        // и перенаправляем его на <секретную> страницу...
        header("Location: secretplace.php");
        exit;
    } else {
        // увеличиваем счетчик попыток авторизации
        if(isset($_SESSION['login_attempts'])) {
            $_SESSION['login_attempts']++;
        } else {
            $_SESSION['login_attempts'] = 1;
        }
        // если попытки исчерпаны, блокируем пользователя на 1 минуту
        if($_SESSION['login_attempts'] >= 3) {
            $_SESSION['blocked_time'] = time() + 60;
            echo "<p>Вы исчерпали лимит попыток входа. Пожалуйста, попробуйте снова через минуту.</p>";
            exit;
        } else {
            // возвращаем пользователя к форме авторизации
            header("Location: index.php");
            exit;
        }
    }
}
?>

<html>
<head>
    <title>Ошибка авторизации</title>
    <meta charset="utf-8"/>
</head>
<body>
<p>Вы ввели неверный логин или пароль!</p>
</body>
</html>
