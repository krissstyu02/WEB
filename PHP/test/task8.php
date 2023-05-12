<?php
session_start();
$answer7 = $_POST['answer7'];
$_SESSION['answer7'] = $answer7;
?>

<link rel="stylesheet" type="text/css" href="style.css">

<p class="question">Вопрос 8:</p>
<p class="text">Какие тэги задают размер заголовка?</p>
<form action="task9.php" method="post">
  <input class="answer" type="text" name="answer8"/>
  <input class="submit" type="submit"/>
</form>
