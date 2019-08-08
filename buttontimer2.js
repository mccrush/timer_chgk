// ==UserScript==
// @name         buttontimer2
// @namespace    https://github.com/mccrush/buttontimer2
// @version      1.0.1
// @description  Кнопка-таймер для сайта База вопросов ЧГК
// @author       mccrush.ru
// @match        https://db.chgk.info/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    let showtime = true;
    let playsound = true;


    let divBlock = document.createElement('div');
    divBlock.style = 'position: fixed; width: 150px; top: 400px; left: 200px; background: rgba(255, 255, 255, 0.65); text-align: center; z-index: 9999; padding: 20px 10px 10px 10px;';

    let checkBoxT = document.createElement('input');
    checkBoxT.type = 'checkbox';
    checkBoxT.checked = true;
    checkBoxT.title = 'Отображать секунды';
    checkBoxT.style = 'float: left; margin-left: 20px;';
    checkBoxT.onchange = (e) => {
        if (e.target.checked) {
            showtime = true;
            divTime.textContent = 60;
        } else {
            showtime = false;
            divTime.textContent = '';
        }
    }


    let checkBoxS = document.createElement('input');
    checkBoxS.type = 'checkbox';
    checkBoxS.checked = true;
    checkBoxS.title = 'Проигрывать звук';
    checkBoxS.style = 'float: left';
    checkBoxS.onchange = (e) => {
        if (e.target.checked) {
            playsound = true;
        } else {
            playsound = false;
        }
    }

    let divTime = document.createElement('div');
    divTime.style = 'text-align: center; font-size: 40px; color: #818A91;';

    divTime.textContent = showtime ? 60 : '';

    let butButton = document.createElement('button');
    butButton.style = 'width: 100%; height: 40px; padding: 4px; text-align: center; outline: none; cursor: pointer; background: #4f7f5b; color: #fff; margin-top: 20px; -webkit-box-shadow: 0 .125rem .25rem rgba(0,0,0,.075) !important;  font-size:16px; border-radius: 4px; border-style: hidden;';
    butButton.textContent = 'Старт';

    divBlock.appendChild(checkBoxT);
    divBlock.appendChild(checkBoxS);
    divBlock.appendChild(divTime);
    divBlock.appendChild(butButton);

    document.body.appendChild(divBlock);

    let mainSignal = new Audio('https://raw.githubusercontent.com/mccrush/buttontimer2/master/mainSignal.wav');
    let preAlarm = new Audio('https://raw.githubusercontent.com/mccrush/buttontimer2/master/preAlarm.wav');

    let butStatus = false;
    let timerId, timeInt1, timeInt2;
    butButton.onclick = function (e) {
        let sec = 60;

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

            timeInt1 = setTimeout(() => {
                if (playsound) {
                    preAlarm.play();
                }

                butButton.style = 'width: 100%; height: 40px; padding: 4px; text-align: center; outline: none; cursor: pointer; background: #AA2222; color: #fff; margin-top: 20px; -webkit-box-shadow: 0 .125rem .25rem rgba(0,0,0,.075) !important;  font-size:16px; border-radius: 4px; border-style: hidden;';
            }, 51000);

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
        } else {
            clearInterval(timerId);
            clearTimeout(timeInt1);
            clearTimeout(timeInt2);
            butButton.style = 'width: 100%; height: 40px; padding: 4px; text-align: center; outline: none; cursor: pointer; background: #4f7f5b; color: #fff; margin-top: 20px; -webkit-box-shadow: 0 .125rem .25rem rgba(0,0,0,.075) !important;  font-size:16px; border-radius: 4px; border-style: hidden;';
            butButton.textContent = 'Старт';
            divTime.textContent = showtime ? 60 : '';
            butStatus = false;
        }
    }
})();