document.addEventListener("DOMContentLoaded", function (event) {
  console.log('Timer is run!');
  /* РАЗДЕЛ ОПИСАНИЯ ПЕРЕМЕННЫХ */
  // Стили оформления элементов
  style = {
    buttonNormal: 'width: 100%; height: 40px; padding: 4px; text-align: center; outline: none; cursor: pointer; background: #4f7f5b; color: #fff; margin-top: 20px; -webkit-box-shadow: 0 .125rem .25rem rgba(0,0,0,.075) !important;  font-size:16px; border-radius: 4px; border-style: hidden;',
    buttonActive: 'width: 100%; height: 40px; padding: 4px; text-align: center; outline: none; cursor: pointer; background: #eee; color: #373A3C; margin-top: 20px; -webkit-box-shadow: 0 .125rem .25rem rgba(0,0,0,.075) !important;  font-size:16px; border-radius: 4px; border-style: hidden;',
    buttonRed: 'width: 100%; height: 40px; padding: 4px; text-align: center; outline: none; cursor: pointer; background: #AA2222; color: #fff; margin-top: 20px; -webkit-box-shadow: 0 .125rem .25rem rgba(0,0,0,.075) !important;  font-size:16px; border-radius: 4px; border-style: hidden;',
    checkboxTime: 'float: left; margin-left: 20px;',
    checkboxSound: 'float: left',
    divBlock: 'position: fixed; width: 150px; top: 400px; left: 200px; background: rgba(255, 255, 255, 0.65); text-align: center; z-index: 9999; padding: 20px 10px 10px 10px;',
    divTime: 'text-align: center; font-size: 40px; color: #818A91;'
  }

  // Переменные параметров Времени и Звука
  let showTime = localStorage.getItem('showTime') || true;
  let playSound = localStorage.getItem('playSound') || true;
  let seconds = '';
  let timerStatus = false;
  let timeInterval1s, timeInterval50s, timeInterval60s;

  // Подключение файлов звука
  let mainSignal = new Audio('https://raw.githubusercontent.com/mccrush/timer_chgk/master/sounds/mainSignal.wav');
  let preAlarm = new Audio('https://raw.githubusercontent.com/mccrush/timer_chgk/master/sounds/preAlarm.wav');


  /* РАЗДЕЛ СОЗДАНИЯ ЭЛЕМЕНТОВ */
  // Создание блока всего таймера
  let divBlock = document.createElement('div');
  divBlock.style = style.divBlock;

  // Создание чекбокса Времени
  let checkBoxT = document.createElement('input');
  checkBoxT.type = 'checkbox';
  checkBoxT.checked = showTime;
  checkBoxT.title = 'Отображать секунды';
  checkBoxT.style = style.checkboxTime;

  // Создание чекбокса Звука
  let checkBoxS = document.createElement('input');
  checkBoxS.type = 'checkbox';
  checkBoxS.checked = playSound;
  checkBoxS.title = 'Проигрывать звук';
  checkBoxS.style = style.checkboxSound;

  // Создание блока Времени
  let divTime = document.createElement('div');
  divTime.style = style.divTime;
  divTime.textContent = showTime ? 60 : '';

  // Создание кнопки
  let butButton = document.createElement('button');
  butButton.style = style.buttonNormal;
  butButton.textContent = 'Старт';

  // Добавление элементов на страницу
  divBlock.appendChild(checkBoxT);
  divBlock.appendChild(checkBoxS);
  divBlock.appendChild(divTime);
  divBlock.appendChild(butButton);
  document.body.appendChild(divBlock);


  /* РАЗДЕЛ ОБРАБОТКИ СОБЫТИЙ */
  // Обработка события клика по чекбоксу Времени
  checkBoxT.onchange = (e) => {
    if (e.target.checked) {
      showTime = true;
      localStorage.setItem('showTime', showTime);
      divTime.textContent = seconds;
    } else {
      showTime = false;
      localStorage.setItem('showTime', showTime);
      divTime.textContent = '';
    }
  }

  // Обработка события клика по чекбоксу Звука
  checkBoxS.onchange = (e) => {
    if (e.target.checked) {
      playSound = true;
      localStorage.setItem('playSound', playSound);
    } else {
      playSound = false;
      localStorage.setItem('playSound', playSound);
    }
  }

  // Обработка события клика по кнопке Старт
  butButton.onclick = function (e) {
    seconds = 60;

    // Если таймер не запущен
    if (timerStatus == false) {
      timerStatus = true;
      if (playSound) mainSignal.play();
      e.target.style = style.buttonActive;
      e.target.textContent = 'Стоп';

      // Таймер отсчета секунд
      timeInterval1s = setInterval(() => {
        seconds = seconds - 1;
        divTime.textContent = showTime ? seconds : '';
      }, 1000);

      // Таймер 10-ти секунд
      timeInterval50s = setTimeout(() => {
        if (playSound) preAlarm.play();
        butButton.style = style.buttonRed;
      }, 51000);

      // Таймер минуты
      timeInterval60s = setTimeout(() => {
        clearInterval(timeInterval1s);
        timerStatus = false;
        if (playSound) mainSignal.play();
        butButton.style = style.buttonNormal;
        butButton.textContent = 'Старт';
        divTime.textContent = showTime ? 60 : '';
      }, 61000);
    } else { // Если таймер запущен
      clearInterval(timeInterval1s);
      clearTimeout(timeInterval50s);
      clearTimeout(timeInterval60s);
      timerStatus = false;
      butButton.style = style.buttonNormal;
      butButton.textContent = 'Старт';
      divTime.textContent = showTime ? 60 : '';
    }
  }
});
