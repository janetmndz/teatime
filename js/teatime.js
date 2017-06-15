$(function (){
	var tea_name, sec_count, min_count, counter;
	var m, s;
	teatime_m = $('#teatime_m');
	teatime_s = $('#teatime_s');

	var tealist = [
		{'name':'white','time':1},
		{'name':'green','time':2},
		{'name':'black','time':3},
		{'name':'darjeeling','time':3},
		{'name':'oolong','time':3},
		{'name':'prueh','time':4},
		{'name':'herbal','time':5},
		{'name':'roobios','time':5},
		{'name':'mate','time':6}];

	$('.tea-selection').click(function(){
		teatime_startup($(this).attr('id'));
		$('.teatime-view').css('height', '100%');
		$('.view-close').css('display', 'block');
		$('.view-timer').css('display', 'block');
	});

	$('.view-close').click(function(){
		$('.teatime-view').css('height','0%');
		$('.view-close').css('display', 'none');
		$('.view-timer').css('display', 'none');
		clearInterval(counter);
	});

	function teatime_startup (tea_id) {
		//Change the color of the border
		var border_color = $('#'+tea_id).css('background-color');
		var set_border = {
			'border-left':'4px solid '+border_color, 
			'border-right': '4px solid '+border_color};

		$(".view-timer").css(set_border);
		//Get the time from the tealist array
		var result = $.grep(tealist,function(e){
			//find where the array's name = element id
			return e.name == tea_id;
		});
		
		if (result && result.length == 1) {
			//set the minute counter based on the tea id
			min_count = (result[0].time);
			//Place the name of the tea
			$('#teaname_place').text(result[0].name);
			teatime_m.text(min_count);
			teatime_s.text('00');
			m = min_count;
			s = 0
			counter = setInterval(function(){teatime_timer()}, 1000);
		}
	}

	function teatime_timer(){
		s = s-1;
		//number is doubt digits
		if (s >= 10) {
			teatime_s.text(s);
			if ((m==0)&&(s<=30)) {
				$('.teatimer').css("color","#EA5437");
			};
		}
		//number is single digit
		if (s < 10){
			teatime_s.text('0'+s);
			if(m==0){
				$('.teatimer').css('color','#EA5437');
			}
			//when number is 0
			if (s <= 0){
				m = m-1;
				//if there are still some min left
				if (m > -1) {
					teatime_m.text(m);
					s = 59;
					teatime_s.text(s);
				}
				//else stop it if there are none
				else{
					clearInterval(counter);
				}
			}
		}
	}

});
