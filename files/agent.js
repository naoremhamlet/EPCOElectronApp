const Datastore = require('nedb');

let agents = new Datastore({filename: "agents.db", autoload: true});
let members = new Datastore({filename: "members.db", autoload: true});
let lottery_winners = new Datastore({filename: "lottery_winners.db", autoload: true});


let block1 = document.querySelector('#block1');

function createBtn(agent_name){
    const btn = document.createElement('button');
    btn.innerText = agent_name;
    block1.appendChild(btn);
    btn.setAttribute("class", "agent_button");
    var agent = agent_name;
    
    btn.addEventListener('click', () => {
        
        agents.findOne({_id: agent}, (err, docs) => {
            const data = docs;

            document.getElementById('show_agent_name').innerHTML = data._id;
            document.getElementById('show_address').innerHTML = data.address;
            document.getElementById('show_phone').innerHTML = data.phone;
        
                let i, row;
                if(data.shares != null){
                    buildTable(data.shares);
                }
                else{
                    let table = document.getElementById('tb');
                    table.innerHTML = "";
                }
                
                
                function buildTable(data){
                    let table = document.getElementById('tb');
        
                    table.innerHTML = "";

                    for(i=0; i<data.length; i++){

                        row =`<tr>
                                    <td>${data[i].share_serial}</td>
                                    <td>${data[i].share_name}</td>
                                    <td>${data[i].share_status}</td>
                                </tr>`
                        table.innerHTML += row;        
                            
                    }
                    row =`<br>
                            <tr>
                                <td> </td>
                                <td><b>Total: ${data.length}</b></td>
                                <td> </td>
                            </tr>
                            <br>`
                    table.innerHTML += row;
        
                }
        });
    });

}

var agent_name_value = document.getElementById("agent_name");
var address_value = document.getElementById("address");
var phone_value = document.getElementById("phone");



function validate(){

    if(agent_name_value.value.trim() == "")        
    {
        agent_name.style.border = "solid 2px red";
        return false;
    }
    else if(address_value.value.trim() == "")
    {
        address.style.border = "solid 2px red";
        return false;
    }
    else if(phone_value.value.trim() == "")
    { 
        phone.style.border = "solid 2px red";
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

    let agent_name = document.getElementById('agent_name').value;
    let phone = document.getElementById('phone').value;
    let address = document.getElementById('address').value;


        let data = new Object();

        data._id = agent_name;
        data.address = address;
        data.phone = phone;
        

        agents.insert(data);
        alert("Agent added Successfully");


}
});

agents.find({}, (err,docs) =>{

    var i;
    const data = docs;

    for(i=0; i<data.length; i++){

        createBtn(data[i]._id);
    }
    

});

let share_add_btn = document.getElementById("share_add_button");

share_add_btn.addEventListener('click', () => {
    
    var share_serial_no_input = document.getElementById('share_serial_no_input');
    var share_name_input = document.getElementById('share_name_input');
    var show_agent_name = document.getElementById('show_agent_name');
    var share_status_input = document.getElementById('share_status_input');
    var share_serial_no_input_value = parseInt(share_serial_no_input.value);

    members.findOne({_id: share_serial_no_input_value}, (err,docs)=>{
        if(docs == null){
            alert("Serial not found");
            return;
        }
        else if(share_serial_no_input.value.trim() == ""){
            share_serial_no_input.style.border = "solid 2px red";
            return;
        }
        else if(share_name_input.value.trim() == ""){
            share_name_input.style.border = "solid 2px red";
            return;
        }
        else if(show_agent_name.innerHTML == false){
            alert("Please Select an agent first");
            return;
        }
        else{
    
            let member = new Object();      
    
            member.share_serial = share_serial_no_input_value;
            member.share_name = share_name_input.value;
            member.share_status = share_status_input.value;
    
            agents.update({_id: show_agent_name.innerHTML}, {$addToSet: {shares: {$each: [member]}}});
    
            alert("Share added to Agent Profile");
    
            members.update({_id: share_serial_no_input_value}, {$set: {agent: show_agent_name.innerHTML, status: share_status_input.value}});
    
        }
        share_serial_no_input.value = "";
        share_name_input.value = "";
        share_status_input.value ="";
    });
    
});