<?php
session_start();
$answer10 = $_POST['answer10'];
$_SESSION['answer10'] = $answer10;

$questions = array(
    '1' => array(
        'question' => 'Что такое HTML?',
        'answer' => 'язык разметки',
    ),
    '2' => array(
        'question' => 'Что такое CSS?',
        'answer' => 'язык стилей',
    ),
    '3' => array(
        'question' => 'Что такое JavaScript?',
        'answer' => 'язык программирования',
    ),
    '4' => array(
        'question' => 'Какай тэг определяет заголовок документа HТМL? ',
        'answer' => 'head',
    ),
    '5' => array(
        'question' => ' Какой тэг определяет тело документа HТМL?',
        'answer' => 'body',
    ),
    '6' => array(
        'question' => 'Какой атрибут тега ВОDY позволяет изменять цвет "активных" гиперссылок?',
        'answer' => 'alink',
    ),
    '7' => array(
        'question' => 'Каким тегом объявляется web-страница?',
        'answer' => 'html',
    ),
    '8' => array(
        'question' => 'Какие тэги задают размер заголовка?',
        'answer' => 'h1',
    ),
    '9' => array(
        'question' => 'Какие тэги создают абзац в документе?',
        'answer' => 'p',
    ),
    '10' => array(
        'question' => 'Какой тег нужно добавить для переноса строки?',
        'answer' => 'br',
    ),

);

$num_correct = 0;
$wrong_answers = array();

foreach ($questions as $num => $data) {
    if (isset($_SESSION['answer'.$num]))
    {
        if ($_SESSION['answer'.$num] == $data['answer'])
            $num_correct++;
        else
        {
            $wrong_answers[$num] = array(
                'input' => $_SESSION['answer'.$num],
                'correct' => $data['answer']
            );
        }
    }
    else
    {
        $wrong_answers[$num] = array(
            'input' => 'Ничего не было введено',
            'correct' => $data['answer']
        );
    }
}

echo "<p>Вы ответили правильно на $num_correct из ".count($questions)." вопросов.</p>";

if (!empty($wrong_answers)) {
    echo "<p>Неправильные ответы:</p>";
    foreach ($wrong_answers as $num => $answer) {
        echo "<p>Вопрос $num: Ваш ответ: {$answer['input']}, Правильный ответ: {$answer['correct']}</p>";
    }
}

// очищаем сессию
session_unset();
session_destroy();
?>
