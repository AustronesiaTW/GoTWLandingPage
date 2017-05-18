$(document).ready(function() {
	
	var selection = 'en';
	i18nHelper.FolderName = 'privacy';
	i18nHelper.FileName = 'Messages';

	i18nHelper.Init();
	//Get browser language 
	var userLang = navigator.language || navigator.userLanguage; 
	
	$('#dropdown-lang option').each(function(){
		if($(this).data().lang == userLang){
			$(this).attr('selected',true);
			selection = userLang.replace('-','_');		
			$('#mainDiv [lang]:not(".bootstrap-select li")').attr('lang',userLang);
		}

	});
	
	i18nHelper.LoadBundles(selection);

	//Pace on done
	Pace.on('done',function(){
		$('#mainDiv').fadeIn(500);
		
		//add lang attribute to html code which Bootstrap-select generate 
		$('[data-original-index]').each(function(){
			var optionIndex = $(this).data().originalIndex;
			var optionLnag = $('#dropdown-lang option').eq(optionIndex).data().lang;			
			$(this).attr('lang',optionLnag);			
		});
	});
});
