
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
  // Валидация формы
  $( document ).ready(function() {
    $("#btn").click(
      function(){
			sendAjaxForm('result_form', 'ajax_form', 'action_ajax_form.php');
			return false; 
		}
	);
});
function sendAjaxForm(result_form, ajax_form, url) {
    $.ajax({
        url: url   , //url страницы (action_ajax_form.php)
        // ('../php/action_ajax_form.php') 
        type:     "POST", //метод отправки
        dataType: "html", //формат данных
        data: $("#"+ajax_form).serialize(),  // Сеарилизуем объект
        success: function(response) { //Данные отправлены успешно
        	result = $.parseJSON(response);
        	$('#result_form').html('Имя: '+result.first_name +'<br>Email: '+ result.email+'<br>Message: '+ result.message);
          modal.removeClass('modal--visible');
          message.toggleClass('message--visible');
    	},
    	error: function(response) { // Данные не отправлены
            $('#result_form').html('Ошибка. Данные не отправлены.');
    	}
 	});
}
