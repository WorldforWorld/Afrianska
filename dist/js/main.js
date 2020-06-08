
var modal = $('.modal'),
  message = $('.message'),
  modalBtn = $('.modal__btn'),
  closelBtn = $('.modal__close'),
  closelMessageBtn = $('.message__close'),
  modalHidden = $('.modal__dialog');
  modalHiddenMessage = $('.message__dialog');

  modalBtn.on('click', function (e) {
    e.preventDefault();
    modal.toggleClass('modal--visible');
    });
    closelBtn.on('click', function () {
    modal.toggleClass('modal--visible');
    });
    closelMessageBtn.on('click', function () {
    message.toggleClass('message--visible');
    });
    /* --------------------------------- */
  jQuery(function($){
    modal.mouseup(function (e){ // событие клика по веб-документу
      if (!modalHidden.is(e.target) && modalHidden.has(e.target).length === 0) { //если клик был не по нашему блоку и не по его дочерним элементам
        modal.toggleClass('modal--visible');// скрываем его
      }
    });
    message.mouseup(function (e){ // событие клика по веб-документу
      if (!modalHiddenMessage.is(e.target) && modalHiddenMessage.has(e.target).length === 0) { //если клик был не по нашему блоку и не по его дочерним элементам
        message.toggleClass('message--visible');// скрываем его
      }
    });
  });

/* Валидация формы - 2 */
const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const text = document.getElementById('text');

form.addEventListener('submit', e => {
	e.preventDefault();
	
	checkInputs();
});

function checkInputs() {
	// trim to remove the whitespaces
	const usernameValue = username.value.trim();
	const emailValue = email.value.trim();
	const textValue = text.value.trim();
	
	if(usernameValue === '') {
		setErrorFor(username, 'Username cannot be blank');
	} else {
    setSuccessFor(username);
    $('#small1').addClass('not_error');
    
	}
	
	if(emailValue === '') {
		setErrorFor(email, 'Email cannot be blank');
	} else if (!isEmail(emailValue)) {
		setErrorFor(email, 'Not a valid email');
	} else {
		setSuccessFor(email);
    $('#small2').addClass('not_error');
	}
	
	if(textValue === '') {
		setErrorFor(text, 'Message cannot be blank');
	} else {
		setSuccessFor(text);
    $('#small3').addClass('not_error');
	}
}
function setErrorFor(input, message) {
	const formControl = input.parentElement;
	const small = formControl.querySelector('small');
	formControl.className = 'form-control error';
	small.innerText = message;
}

function setSuccessFor(input) {
	const formControl = input.parentElement;
	formControl.className = 'form-control success';
}
	
function isEmail(email) {
	return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}
  $('form#form').submit(function(e){

    // Запрещаем стандартное поведение для кнопки submit
    e.preventDefault();
  
    // После того, как мы нажали кнопку "Отправить", делаем проверку,
    // если кол-во полей с классом .not_error равно 3 (так как у нас всего 3 поля), то есть все поля заполнены верно,
    // выполняем наш Ajax сценарий и отправляем письмо адресату
  
    if($('.not_error').length == 3) {
       // Eще одним моментом является то, что в качестве указания данных для передачи обработчику send.php, мы обращаемся $(this) к нашей форме,
       // и вызываем метод .serialize().
       // Это очень удобно, т.к. он сразу возвращает сгенерированную строку с именами и значениями выбранных элементов формы.
        $.ajax({
          url: 'send.php',
          type: 'post',
          data: $(this).serialize(),
  
          beforeSend: function(xhr, textStatus){ 
          },
  
          success: function(response){
            modal.removeClass('modal--visible');
            $(form)[0].reset();
            message.toggleClass('message--visible');
          }
        }); // end ajax({...})
        }
        // Иначе, если количество полей с данным классом не равно значению 3, мы возвращаем false,
        // останавливая отправку сообщения в невалидной форме
        else {
          return false;
        }
    
    }); // end submit()