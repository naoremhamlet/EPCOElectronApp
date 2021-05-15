const Datastore = require('nedb');

let members = new Datastore({filename: 'members.db', autoload: true});
let payments = new Datastore({filename: 'payments.db', autoload: true});


var member_name_value = document.getElementById("member_name");
var serial_no_value = document.getElementById("serial_no");
var address_value = document.getElementById("address");
var agent_value = document.getElementById("agent");



function validate(){

    if(member_name_value.value.trim() == "")        
    {
        member_name.style.border = "solid 2px red";
        return false;
    }
        else if(serial_no_value.value.trim() == "")
    {
        serial_no.style.border = "solid 2px red";
        return false;
    }
    else if(address_value.value.trim() == "")
    {
        address.style.border = "solid 2px red";
        return false;
    }
    else if(agent_value.value.trim() == "")
    { 
        agent.style.border = "solid 2px red";
        return false;
    }
    else
    {
        return true;
    }
}

let add_btn = document.getElementById('add_button');
add_btn.addEventListener('click',() => {

if(validate()){

    let member_name = document.getElementById('member_name').value;
    let serial_no = document.getElementById('serial_no').value;
    let phone = document.getElementById('phone').value;
    let address = document.getElementById('address').value;
    let agent = document.getElementById('agent').value;
    let aadhar = document.getElementById('aadhar').value;
    var gender;

    if(document.getElementById('gender_male').checked){
        gender = document.getElementById('gender_male').value;
    }
    else if(document.getElementById('gender_female').checked){
        gender = document.getElementById('gender_female').value;
    }

        let data = new Object();

        serial_no = parseInt(serial_no);

        data._id = serial_no;
        data.member_name = member_name;
        data.gender = gender;
        data.phone = phone;
        data.address = address;
        data.agent = agent;
        data.aadhar = aadhar;
        data.status = "";
        console.log(typeof(data._id));

        members.insert(data);

        let pay = new Object();

        pay._id = serial_no;
        pay.member_name = member_name;

        payments.insert(pay);
        alert("Member Added Successfully");


}
});