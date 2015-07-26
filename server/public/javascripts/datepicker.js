var disabledDays = ["7-31-2013", "7-8-2013"];
function disableAllTheseDays(date) {
    var m = date.getMonth(), d = date.getDate(), y = date.getFullYear();
    for (i = 0; i < disabledDays.length; i++) {
        if($.inArray((m+1) + '-' + d + '-' + y,disabledDays) != -1) {
            return [false];
        }
    }
    return [true];
}
  
$(function() {
	$( "#from" ).datepicker({
		dateFormat: "yy-mm-dd",
		defaultDate: "+1w",
		changeMonth: true,
		numberOfMonths: 1,
		minDate: 0,
		constrainInput: true,
		beforeShowDay: disableAllTheseDays,
		onClose: function( selectedDate ) {
			$( "#to" ).datepicker( "option", "minDate", selectedDate, "dateFormat", "yy-mm-dd" );
		}
	});
	$( "#to" ).datepicker({
		dateFormat: "yy-mm-dd",
		defaultDate: "+1w",
		changeMonth: true,
		numberOfMonths: 1,
		minDate: 0,
		constrainInput: true,
		beforeShowDay: disableAllTheseDays,
		onClose: function( selectedDate ) {
			$( "#from" ).datepicker( "option", "maxDate", selectedDate, "dateFormat", "yy-mm-dd" );
		}
	});
});