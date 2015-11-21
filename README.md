# Стереокартинки
Плагин для jQuery для создания полноцветной иллюзии объемного изображения.

## Как подключить
Добавьте код в head секцию.
```
<script type="text/javascript" src="js/jquery.js"></script>
<script type="text/javascript" src="js/jquery.stereo.js"></script>
```
Оберните картинки div’ом и вызовите метод stereo.
```
<div class="pictures">
  <img src="images/clouds/01.jpg" />
  <img src="images/clouds/02.jpg" />
  <img src="images/clouds/03.jpg" />
</div>
<script type="text/javascript"> $('.pictures').stereo(); </script> 
```
## Опции

`speed` — интервал в миллисекундах. По умолчанию 125 мс.

`frames` — количество кадров, по умолчанию 2 или определяется автоматически.

`joined` — если все кадры склеены в одну картинку, установить в true (по умолчанию false).

`pingpong` — если установлен в true, кадры зациклены по принципу пинг-понг (по умолчанию), иначе — после последнего кадра идет первый.

Например:
```
$('.kino').stereo({
  speed: 1000/25,
  pingpong: false,
  joined: true,
  frames: 100
});
```