const Datastore = require('nedb');

let members = new Datastore({filename: 'members.db', autoload: true});
let agents = new Datastore({filename: 'agents.db', autoload: true});
let payments = new Datastore({filename: 'payments.db', autoload: true});
let deletes = new Datastore({filename: 'deletes.db', autoload: true});
let todays = new Datastore({filename: 'todays.db', autoload: true});
let lottery_winners = new Datastore({filename: 'lottery_winners.db', autoload: true});
let tender_winners = new Datastore({filename: 'tender_winners.db', autoload: true});
let lucky_draw_winners = new Datastore({filename: 'lucky_draw_winners.db', autoload: true});
let todays_lottery_winner = new Datastore({filename: 'todays_lottery_winner.db', autoload: true});
let todays_tender_winner = new Datastore({filename: 'todays_tender_winner.db', autoload: true});
let todays_lucky_draw_winner = new Datastore({filename: 'todays_lucky_draw_winner.db', autoload: true});

let search_btn = document.getElementById('search');

var search_serial_no;
var name;
var status;
var personal_details = document.getElementById('personal_details');

search_btn.addEventListener('click', () => {
search_serial_no = document.getElementById('search_serial_no').value;
search_serial_no = parseInt(search_serial_no);


members.findOne({_id: search_serial_no}, (err, doc) => {

    const data = doc;

    personal_details.style.backgroundColor = "white";


    if(data == null){
        alert("Please Enter a valid Serial no.");
        document.getElementById('search_serial_no').value = null;
        search_serial_no = null;
        
        document.getElementById('show_serial_no').innerHTML = "";
        document.getElementById('show_member_name').innerHTML = "";
        document.getElementById('show_gender').innerHTML = "";
        document.getElementById('show_phone').innerHTML = "";
        document.getElementById('show_address').innerHTML = "";
        document.getElementById('show_agent').innerHTML = "";
        document.getElementById('show_aadhar').innerHTML = "";
        document.getElementById('show_share_due_month').innerHTML = "";

    }
    else{

        document.getElementById('show_serial_no').innerHTML = doc._id + "&nbsp&nbsp&nbsp&nbsp&nbsp" +doc.status;
        document.getElementById('show_member_name').innerHTML = doc.member_name;
        document.getElementById('show_gender').innerHTML = doc.gender;
        document.getElementById('show_phone').innerHTML = doc.phone;
        document.getElementById('show_address').innerHTML = doc.address;
        document.getElementById('show_agent').innerHTML = doc.agent;
        document.getElementById('show_aadhar').innerHTML = doc.aadhar;
        if(data.status == "D"){
            personal_details.style.backgroundColor = "#e69090";
        }
        name = doc.member_name;  
        status = doc.status;   //Please dont delete this . it is used in addToToday function
    }

});
payments.findOne({_id: search_serial_no}, (err,doc) =>{
    if(doc != null){
        document.getElementById('show_share_due_month').innerHTML = doc.due;
    }
});
}); 

function addPayment(date){
    payments.findOne({_id: search_serial_no}, (err, doc) => {
    
    const pay = doc;

    if(doc == null){
        alert("Please Enter a valid Serial No to pay");
    }
    else if(search_serial_no == null || search_serial_no == 0){
        alert("Serial No not Enter");
    }

    else{
        payments.update({_id: search_serial_no}, {$addToSet: {paid: {$each: [date]}}},function (err, numReplaced) {
            const no = numReplaced;
            if(no > 0){
                payments.findOne({_id: search_serial_no}, (err,doc) =>{
                    document.getElementById('show_share_due_month').innerHTML = doc.due;
                });
            }
        }); 
        payments.update({_id: search_serial_no},{$pull: {due: date}}, (err, numReplaced) =>{
            alert(date+": Paid");
        });

        todays.findOne({_id: "month"}, (err,doc) =>{
            const month = doc.month;
            if(month == date){
                addToday(date);
            }
        });
        
    }

});
$('.ui-dialog-content').dialog('close');
}

lottery_winner_btn = document.getElementById('lottery_winner_button');
lottery_winner_btn.addEventListener('click', () => {

    if(search_serial_no == null || search_serial_no == 0){
        alert("Serial not Enter");
    }

    else{

    if(confirm("Member mark as Lottery Winner")){

    members.findOne({_id: search_serial_no}, (err, doc) => {
        
        
        let data = new Object();

        data._id = doc._id;
        data.member_name = doc.member_name;

        lottery_winners.insert(data);
        todays_lottery_winner.insert(data);

        const find = {"share_serial":doc._id,"share_name":doc.member_name,"share_status":doc.status};
        const replace = {"share_serial":doc._id,"share_name":doc.member_name,"share_status":"LW"};
        console.log(find);
        console.log(replace);
        agents.findOne({_id: doc.agent},(err,docs)=>{
            console.log(docs.shares);
        });
        agents.update({_id: doc.agent},{$pull: {shares: find}}, (err,numReplaced)=>{
            console.log(numReplaced);
        });
        agents.update({_id: doc.agent},{$addToSet: {shares: replace}},(err,numReplaced)=>{
            console.log(numReplaced);
        });


        document.getElementById('show_serial_no').innerHTML = "";
        document.getElementById('show_member_name').innerHTML = "";
        document.getElementById('show_gender').innerHTML = "";
        document.getElementById('show_phone').innerHTML = "";
        document.getElementById('show_address').innerHTML = "";
        document.getElementById('show_agent').innerHTML = "";
        document.getElementById('show_aadhar').innerHTML = "";
        document.getElementById('show_share_due_month').innerHTML = "";

    });

    members.remove({_id: search_serial_no});
    payments.remove({_id: search_serial_no});
    document.getElementById('search_serial_no').value = null;
    search_serial_no = null;
    
    }
    }

});


tender_winner_btn = document.getElementById('tender_winner_button');
tender_winner_btn.addEventListener('click', () => {


    if(search_serial_no == null || search_serial_no == 0){
        alert("Serial not Enter");
        document.getElementById('search_serial_no').value = null;
        search_serial_no = null;
    }

    else{

    if(confirm("Member mark as Tender Winner")){

    members.findOne({_id: search_serial_no}, (err, doc) => {
        
        
        let data = new Object();

        data._id = doc._id;
        data.member_name = doc.member_name;

        tender_winners.insert(data);
        todays_tender_winner.insert(data);

        const find = {"share_serial":doc._id,"share_name":doc.member_name,"share_status":doc.status};
        const replace = {"share_serial":doc._id,"share_name":doc.member_name,"share_status":"TW"};

        agents.update({_id: doc.agent},{$pull: {shares: find}});
        agents.update({_id: doc.agent},{$addToSet: {shares: replace}});


        document.getElementById('show_serial_no').innerHTML = "";
        document.getElementById('show_member_name').innerHTML = "";
        document.getElementById('show_gender').innerHTML = "";
        document.getElementById('show_phone').innerHTML = "";
        document.getElementById('show_address').innerHTML = "";
        document.getElementById('show_agent').innerHTML = "";
        document.getElementById('show_aadhar').innerHTML = "";
        document.getElementById('show_share_due_month').innerHTML = "";

    });

    members.remove({_id: search_serial_no});
    payments.remove({_id: search_serial_no});
    document.getElementById('search_serial_no').value = null;
    search_serial_no = null;
    
    }
    }

});



lucky_draw_winner_btn = document.getElementById('lucky_draw_winner_button');
lucky_draw_winner_btn.addEventListener('click', () => {


    if(search_serial_no == null || search_serial_no == 0){
        alert("Serial not Enter");
        document.getElementById('search_serial_no').value = null;
        search_serial_no = null;
    }

    else{

    if(confirm("Member mark as Lucky Draw Winner")){

    members.findOne({_id: search_serial_no}, (err, doc) => {
        
        
        let data = new Object();

        data._id = doc._id;
        data.member_name = doc.member_name;

        lucky_draw_winners.insert(data);
        todays_lucky_draw_winner.insert(data);

    });
    
    }
    }

});



delete_btn = document.getElementById('delete_button');
delete_btn.addEventListener('click', () => {


    if(search_serial_no == null || search_serial_no == 0){
        alert("Serial not Enter");
        document.getElementById('search_serial_no').value = null;
        search_serial_no = null;
    }

    else{

    if(confirm("Cancel Membership")){

    members.findOne({_id: search_serial_no}, (err, doc) => {
        
        let data = new Object();
        data._id = doc._id;
        data.member_name = doc.member_name;

        deletes.insert(data);

        const find = {"share_serial":doc._id,"share_name":doc.member_name,"share_status":doc.status};
        const replace = {"share_serial":doc._id,"share_name":doc.member_name,"share_status":"D"};

        agents.update({_id: doc.agent},{$pull: {shares: find}});
        agents.update({_id: doc.agent},{$addToSet: {shares: replace}});

        members.update({_id: doc._id}, {$set: {status: "D"}});

        personal_details.style.backgroundColor = "#e69090";
    });

    
    document.getElementById('search_serial_no').value = null;
    search_serial_no = null;
    }
    }

});

function addToday(date){
    let lottery = new Object();

    lottery._id = search_serial_no;
    lottery.member_name = name;
    lottery.status = status;

    todays.insert(lottery);
}