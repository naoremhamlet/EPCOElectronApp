
$("#accordion").accordion({
    collapsible: true,
    event: "click",
    heightStyle: true,
    active: false
    
});


$("document").ready(function(){
    $("#pay_dialog").dialog({
        autoOpen: false,
        title: "Payment:",
        modal: true,
        buttons: [
            {  
                text: "Pay",
                click: function(){
                    date = document.getElementById("date").value;
                    if(date == ""){
                        alert("Please enter a Month");
                    }
                    else{
                        addPayment(date);
                        
                    }
                }
            },
            {
                text: "Cancel",
                click: function(){
                    $(this).dialog("close");
                }
            }
    ],
        height: 300,
        width: 500,
    });
    pay_dialog.style.opacity = "1";
    accordion.style.opacity = "1";
});

$("#date").datepicker({
    changeYear: true,
    changeMonth: true,
    dateFormat: 'MM yy',
    onClose: function(dateText, inst) { 
        $(this).datepicker('setDate', new Date(inst.selectedYear, inst.selectedMonth, 1));
    }
})

$("#share_pay,#loan_pay").click(function(){
$("#pay_dialog").dialog({
    autoOpen: true
});
});