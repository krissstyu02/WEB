<?php
session_start();

// проверяем, авторизован ли пользователь
if(!isset($_SESSION['logged_user'])) {
    header("Location: index.php");
    exit;
}

// проверяем, не заблокирован ли пользователь
if(isset($_SESSION['blocked_time']) && $_SESSION['blocked_time'] > time()) {
    echo "<p>Вы исчерпали лимит попыток входа. Пожалуйста, попробуйте снова через минуту.</p>";
    exit;
}

?>

<html>
<head>
    <title>Вводи пароль</title>
    <meta charset="utf-8"/>
</head>
<body>
<p>Привет, <?php echo $_SESSION['logged_user']; ?>, ты
    на секретной странице!!! :)</p>
</body>
</html>