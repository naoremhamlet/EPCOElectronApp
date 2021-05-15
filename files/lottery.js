const Datastore = require('nedb');
let payments = new Datastore({filename: 'payments.db', autoload: true});
let todays = new Datastore({filename: 'todays.db', autoload: true});
let lottery_winners = new Datastore({filename: 'lottery_winners.db', autoload: true});
let tender_winners = new Datastore({filename: 'tender_winners.db', autoload: true});
let lucky_draw_winners = new Datastore({filename: 'lucky_draw_winners.db', autoload: true});
let todays_lottery_winner = new Datastore({filename: 'todays_lottery_winner.db', autoload: true});
let todays_tender_winner = new Datastore({filename: 'todays_tender_winner.db', autoload: true});
let todays_lucky_draw_winner = new Datastore({filename: 'todays_lucky_draw_winner.db', autoload: true});
let lottery_months = new Datastore({filename: 'lottery_months.db', autoload: true});

$("document").ready(function(){
    $("#lottery_dialog").dialog({
        autoOpen: false,
        title: "Marup :",
        modal: true,
        buttons: [
            {  
                text: "Lottery",
                click: function(){
                    lottery_date = document.getElementById("lottery_date").value;
                    if(lottery_date == ""){
                        alert("Please enter a Month");
                    }
                    else{
                        addLotteryDue(lottery_date);
                    }
                }
            },
            {  
                text: "Tender",
                click: function(){
                    lottery_date = document.getElementById("lottery_date").value;
                    if(lottery_date == ""){
                        alert("Please enter a Month");
                    }
                    else{
                        addTenderDue(lottery_date);
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
    lottery_dialog.style.opacity = "1";
});

$("#lottery_date").datepicker({
    changeYear: true,
    changeMonth: true,
    dateFormat: 'MM yy',
    onClose: function(dateText, inst) { 
        $(this).datepicker('setDate', new Date(inst.selectedYear, inst.selectedMonth, 1));
    }
})

$("#new_lottery").click(function(){
$("#lottery_dialog").dialog({
    autoOpen: true
});
});

function addLotteryDue(date){

        if(confirm("Start Lottery for "+ date)){

            lottery_months.find({_id: date},(err,docs) => {

                if(docs.length > 0){
                    
                    alert("Lottery of "+date+" is already done/started");
                    return;

                }
                else{

                    todays.remove({},{multi: true});
                    todays_lottery_winner.remove({},{multi: true});
                    todays_tender_winner.remove({},{multi: true});
                    todays_lucky_draw_winner.remove({},{multi: true});
        
                    let months = new Object();
                    
                    months._id = date;
                    months.month = "Lottery";
                    lottery_months.insert(months);
                    
                    let lottery = new Object();
        
                    lottery._id = "month";
                    lottery.month = date;
        
                    todays.insert(lottery);

                    payments.update({}, { $addToSet: {due: {$each: [date]}}},{multi: true}, function (err, numReplaced) {});

                }

            });

            $('.ui-dialog-content').dialog('close');

            }
    
}

function addTenderDue(date){

    if(confirm("Start Tender for "+ date)){

        lottery_months.find({_id: date},(err,docs) => {

            if(docs.length > 0){
                
                alert("Tender of "+date+" is already done/started");
                return;

            }
            else{

                todays.remove({},{multi: true});
                todays_lottery_winner.remove({},{multi: true});
                todays_tender_winner.remove({},{multi: true});
                todays_lucky_draw_winner.remove({},{multi: true});
    
                let months = new Object();
    
                months._id = date;
                months.month = "Tender";
                lottery_months.insert(months);
                
                let lottery = new Object();
    
                lottery._id = "month";
                lottery.month = date;
    
                todays.insert(lottery);

                payments.update({}, { $addToSet: {due: {$each: [date]}}},{multi: true}, function (err, numReplaced) {});

            }

        });

        $('.ui-dialog-content').dialog('close');

        }

}

let winner_btn = document.getElementById('show_winner');

winner_btn.addEventListener('click', () => {

    lottery_winner_table.style.opacity ="1";
    draw_winner_table.style.opacity = "1";
    lottery_winners.find({}, (err,docs) => {
        
        let i, row;
        buildTable(docs);

        function buildTable(data){
            let table = document.getElementById('lwtb');

            table.innerHTML = "";

            for(i=0; i<data.length; i++){

                row =`<tr>
                            <td>${data[i]._id}</td>
                            <td>${data[i].member_name}</td>
                        </tr>`
                    table.innerHTML += row;
            }
            row =`<br>
                <tr>
                    <td> </td>
                    <td><b>Total: ${data.length}</b></td>
                </tr>`
            table.innerHTML += row;
        }
    });

    tender_winners.find({}, (err,docs) => {
        
        let i, row;
        buildTable(docs);

        function buildTable(data){
            let table = document.getElementById('twtb');

            table.innerHTML = "";

            let head_t = document.getElementById('head_t');

            head_t.innerHTML = "&nbsp&nbsp&nbsp Tender Winner";

            for(i=0; i<data.length; i++){

                row =`<tr>
                            <td>${data[i]._id}</td>
                            <td>${data[i].member_name}</td>
                        </tr>`
                    table.innerHTML += row;
            }
            row =`<br>
                <tr>
                    <td> </td>
                    <td><b>Total: ${data.length}</b></td>
                </tr>`
            table.innerHTML += row;
        }
    });

    lucky_draw_winners.find({}, (err,docs) => {
        
        let i, row;
        buildTable(docs);

        function buildTable(data){
            let table = document.getElementById('dwtb');

            table.innerHTML = "";

            for(i=0; i<data.length; i++){

                row =`<tr>
                            <td>${data[i]._id}</td>
                            <td>${data[i].member_name}</td>
                        </tr>`
                    table.innerHTML += row;
            }
            row =`<br>
                <tr>
                    <td> </td>
                    <td><b>Total: ${data.length}</b></td>
                </tr>`
            table.innerHTML += row;
        }
    });

    user_data.style.opacity = "1";
});

let month_btn = document.getElementById('show_month');

month_btn.addEventListener('click', () => {
    lottery_months.find({}, (err,docs) => {
        
        let i, row;
        buildTable(docs);

        function buildTable(data){
            let lwtb = document.getElementById('lwtb');
            let dwtb = document.getElementById('dwtb');
            let twtb = document.getElementById('twtb');

            lwtb.innerHTML = "";
            dwtb.innerHTML = "";
            twtb.innerHTML = "";

            let head_t = document.getElementById('head_t');

            head_t.innerHTML = "&nbsp&nbsp&nbspMonth";

            for(i=0; i<data.length; i++){

                row =`<tr>
                            <td>${data[i]._id}</td>
                            <td>${data[i].month}</td>
                        </tr>`
                    twtb.innerHTML += row;
            }
            row =`<br>
                <tr>
                    <td> </td>
                    <td><b>Total: ${data.length}</b></td>
                </tr>`
            twtb.innerHTML += row;
        }

    
    lottery_winner_table.style.opacity ="0";
    draw_winner_table.style.opacity = "0";
    user_data.style.opacity = "1";
});
});