var i18nHelper = {
	FolderName: '',
	FileName: '',
	Init: function(){
		$('#dropdown-lang').change(function() {
			var selection = $('#dropdown-lang option:selected').data().lang;
			i18nHelper.LoadBundles(selection.replace('-','_'));
			$('#mainDiv [lang]:not(".bootstrap-select li")').attr('lang',selection);
			
			//Bind smartphone size langList click event
			if($('#mainDiv .navbar-toggle:visible').length > 0){
				$('.navbar-toggle').click();
			}			
		});
	},
	LoadBundles: function(lang){
		$.i18n.properties({
			name:i18nHelper.FileName, 
			path:'lib/jquery-i18n/bundle/' + i18nHelper.FolderName + '/', 
			mode:'both',
			language:lang, 
			callback: function() {
				i18nHelper.UpdateMessages();
			}
		});
	},
	UpdateMessages: function(){
		$('[data-msg]').each(function(){
        		var msg = $(this).data().msg;
        		$(this).html(eval(msg));
      		});	
	
	}
}
