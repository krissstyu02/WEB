<?php
session_start();
$answer6 = $_POST['answer6'];
$_SESSION['answer6'] = $answer6;
?>

<link rel="stylesheet" type="text/css" href="style.css">

<p class="question">Вопрос 7:</p>
<p class="text">Каким тегом объявляется web-страница?</p>
<form action="task8.php" method="post">
  <input class="answer" type="text" name="answer7"/>
  <input class="submit" type="submit"/>
</form>
