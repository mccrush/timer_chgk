document.addEventListener("DOMContentLoaded", function (event) {

  // Перменные параметров Времени и Звука
  let showtime = localStorage.getItem('showtime') || true;
  let playsound = localStorage.getItem('playsound') || true;
  let sec = '';

  console.log('showtime в начале:', showtime);


  // Создание блока всего таймера
  let divBlock = document.createElement('div');
  divBlock.style = 'position: fixed; width: 150px; top: 400px; left: 200px; background: rgba(255, 255, 255, 0.65); text-align: center; z-index: 9999; padding: 20px 10px 10px 10px;';

  // Создание чекбокса Времени
  let checkBoxT = document.createElement('input');
  checkBoxT.type = 'checkbox';
  checkBoxT.checked = showtime;
  checkBoxT.title = 'Отображать секунды';
  checkBoxT.style = 'float: left; margin-left: 20px;';

  // Обработка события клика по чекбоксу Времени
  checkBoxT.onchange = (e) => {
    if (e.target.checked) {
      showtime = true;
      localStorage.setItem('showtime', showtime);
      divTime.textContent = sec;
    } else {
      showtime = false;
      localStorage.setItem('showtime', showtime);
      divTime.textContent = '';
    }
  }


  // Создание чекбокса Звука
  let checkBoxS = document.createElement('input');
  checkBoxS.type = 'checkbox';
  checkBoxS.checked = playsound;
  checkBoxS.title = 'Проигрывать звук';
  checkBoxS.style = 'float: left';

  // Обработка события клика по чекбоксу Звука
  checkBoxS.onchange = (e) => {
    if (e.target.checked) {
      playsound = true;
      localStorage.setItem('playsound', playsound);
    } else {
      playsound = false;
      localStorage.setItem('playsound', playsound);
    }
  }

  // Создание блока Времени
  let divTime = document.createElement('div');
  divTime.style = 'text-align: center; font-size: 40px; color: #818A91;';
  divTime.textContent = showtime ? 60 : '';

  // Создание кнопки
  let butButton = document.createElement('button');
  butButton.style = 'width: 100%; height: 40px; padding: 4px; text-align: center; outline: none; cursor: pointer; background: #4f7f5b; color: #fff; margin-top: 20px; -webkit-box-shadow: 0 .125rem .25rem rgba(0,0,0,.075) !important;  font-size:16px; border-radius: 4px; border-style: hidden;';
  butButton.textContent = 'Старт';

  // Вставка чекбоксов, блока времени и кнопки в главный блок
  divBlock.appendChild(checkBoxT);
  divBlock.appendChild(checkBoxS);
  divBlock.appendChild(divTime);
  divBlock.appendChild(butButton);

  // Вставка главного блока в тело страницы
  document.body.appendChild(divBlock);


  // Подключение файлов звука
  let mainSignal = new Audio('https://raw.githubusercontent.com/mccrush/buttontimer2/master/sounds/mainSignal.wav');
  let preAlarm = new Audio('https://raw.githubusercontent.com/mccrush/buttontimer2/sounds/master/preAlarm.wav');

  let butStatus = false;
  let timerId, timeInt1, timeInt2;

  // Обработка события клика по кнопке Старт
  butButton.onclick = function (e) {
    sec = 60;

    // Если таймер не запущен
    if (butStatus == false) {
      if (playsound) {
        mainSignal.play();
      }

      e.target.textContent = 'Стоп';
      e.target.style = 'width: 100%; height: 40px; padding: 4px; text-align: center; outline: none; cursor: pointer; background: #eee; color: #373A3C; margin-top: 20px; -webkit-box-shadow: 0 .125rem .25rem rgba(0,0,0,.075) !important;  font-size:16px; border-radius: 4px; border-style: hidden;';
      butStatus = true;
      timerId = setInterval(() => {
        sec = sec - 1;
        divTime.textContent = showtime ? sec : '';
      }, 1000);

      // Таймер добавочного времени. 51 секунда
      timeInt1 = setTimeout(() => {
        if (playsound) {
          preAlarm.play();
        }

        butButton.style = 'width: 100%; height: 40px; padding: 4px; text-align: center; outline: none; cursor: pointer; background: #AA2222; color: #fff; margin-top: 20px; -webkit-box-shadow: 0 .125rem .25rem rgba(0,0,0,.075) !important;  font-size:16px; border-radius: 4px; border-style: hidden;';
      }, 51000);

      // Таймер основного времени. 61 секунда
      timeInt2 = setTimeout(() => {
        clearInterval(timerId);
        if (playsound) {
          mainSignal.play();
        }

        butStatus = false;
        divTime.textContent = showtime ? 60 : '';
        butButton.style = 'width: 100%; height: 40px; padding: 4px; text-align: center; outline: none; cursor: pointer; background: #4f7f5b; color: #fff; margin-top: 20px; -webkit-box-shadow: 0 .125rem .25rem rgba(0,0,0,.075) !important;  font-size:16px; border-radius: 4px; border-style: hidden;';
        butButton.textContent = 'Старт';
      }, 61000);
    } else { // Если таймер запущен
      clearInterval(timerId);
      clearTimeout(timeInt1);
      clearTimeout(timeInt2);
      butButton.style = 'width: 100%; height: 40px; padding: 4px; text-align: center; outline: none; cursor: pointer; background: #4f7f5b; color: #fff; margin-top: 20px; -webkit-box-shadow: 0 .125rem .25rem rgba(0,0,0,.075) !important;  font-size:16px; border-radius: 4px; border-style: hidden;';
      butButton.textContent = 'Старт';
      divTime.textContent = showtime ? 60 : '';
      butStatus = false;
    }
  }
});
