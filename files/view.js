const Datastore = require('nedb');


let members = new Datastore({filename: 'members.db', autoload: true});
let deletes = new Datastore({filename: 'deletes.db', autoload: true});
let payments = new Datastore({filename: 'payments.db', autoload: true});
let todays = new Datastore({filename: 'todays.db', autoload: true});
let todays_lottery_winner = new Datastore({filename: 'todays_lottery_winner.db', autoload: true});
let todays_tender_winner = new Datastore({filename: 'todays_tender_winner.db', autoload: true});
let todays_lucky_draw_winner = new Datastore({filename: 'todays_lucky_draw_winner.db', autoload: true});


let member_btn = document.getElementById('member_list');

member_btn.addEventListener('click', () => {

    lottery_winner_table.style.opacity = "0";
    tender_winner_table.style.opacity = "0";
    lucky_draw_winner_table.style.opacity = "0";

    members.find({}, (err,docs) => {
        
        let i, row;
        buildTable(docs);

        function buildTable(data){

            let table = document.getElementById('tb');
            let lwtb = document.getElementById('lwtb');
            let twtb = document.getElementById('twtb');
            let dwtb = document.getElementById('dwtb');

            table.innerHTML = "";
            lwtb.innerHTML = "";
            twtb.innerHTML = "";
            dwtb.innerHTML = "";

            for(i=0; i<data.length; i++){

                row =`<tr>
                            <td>${data[i]._id}&nbsp&nbsp${data[i].status}</td>
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
});

let paid_btn = document.getElementById('paid_list');

paid_btn.addEventListener('click', () => {

    lottery_winner_table.style.opacity = "1";
    tender_winner_table.style.opacity = "1";
    lucky_draw_winner_table.style.opacity = "1";

    todays.find({}, (err,docs) => {
        
        let i, row;
        buildTable(docs);

        function buildTable(data){
            let table = document.getElementById('tb');
            let lwtb = document.getElementById('lwtb');
            let twtb = document.getElementById('twtb');
            let dwtb = document.getElementById('dwtb');

            table.innerHTML = "";
            lwtb.innerHTML = "";
            twtb.innerHTML = "";
            dwtb.innerHTML = "";


            for(i=0; i<data.length; i++){

                if(data[i]._id == "month"){
                    continue;
                }

                row =`<tr>
                            <td>${data[i]._id}&nbsp&nbsp${data[i].status}</td>
                            <td>${data[i].member_name}</td>
                        </tr>`
                    table.innerHTML += row;
            }

            if(data.length == 0){
                
                row =`<br>
                    <tr>
                        <td> </td>
                        <td><b>Total: 0</b></td>
                    </tr>
                    <br>`
            table.innerHTML += row;
            }
            else{

            row =`<br>
                    <tr>
                        <td> </td>
                        <td><b>Total: ${data.length - 1}</b></td>
                    </tr>
                    <br>`
            table.innerHTML += row;
            }

        }
    });



    todays_lottery_winner.find({}, (err,docs) => {
        
        let i, row;
        buildTable(docs);

        function buildTable(data){

            let winner_tb = document.getElementById('lwtb');

            

            for(i=0; i<data.length; i++){



                row =`<tr>
                            <td>${data[i]._id}</td>
                            <td>${data[i].member_name}</td>
                        </tr>`
                    winner_tb.innerHTML += row;
            }
            row =`<br>`
            winner_tb.innerHTML += row;
            
        }
    });

    todays_tender_winner.find({}, (err,docs) => {
        
        let i, row;
        buildTable(docs);

        function buildTable(data){

            let winner_tb = document.getElementById('twtb');

            

            for(i=0; i<data.length; i++){



                row =`<tr>
                            <td>${data[i]._id}</td>
                            <td>${data[i].member_name}</td>
                        </tr>`
                    winner_tb.innerHTML += row;
            }
            row =`<br>`
            winner_tb.innerHTML += row;
            
        }
    });

    todays_lucky_draw_winner.find({}, (err,docs) => {
        
        let i, row;
        buildTable(docs);

        function buildTable(data){

            let winner_tb = document.getElementById('dwtb');

            

            for(i=0; i<data.length; i++){



                row =`<tr>
                            <td>${data[i]._id}</td>
                            <td>${data[i].member_name}</td>
                        </tr>`
                    winner_tb.innerHTML += row;
            }
            row =`<br>`
            winner_tb.innerHTML += row;
            
        }
    }); 
});

let due_btn = document.getElementById('due_list');

due_btn.addEventListener('click', () => {

    lottery_winner_table.style.opacity = "0";
    tender_winner_table.style.opacity = "0";
    lucky_draw_winner_table.style.opacity = "0";
   
    payments.find({}, (err,docs) => {
        
        let i, row;
        buildTable(docs);

        function buildTable(data){

            let table = document.getElementById('tb');
            let lwtb = document.getElementById('lwtb');
            let twtb = document.getElementById('twtb');
            let dwtb = document.getElementById('dwtb');

            table.innerHTML = "";
            lwtb.innerHTML = "";
            twtb.innerHTML = "";
            dwtb.innerHTML = "";


            for(i=0; i<data.length; i++){

                if(data[i].due.length == 0){
                    continue;
                }

                row =`<tr>
                            <td>${data[i]._id}</td>
                            <td>${data[i].member_name}</td>
                        </tr>`
                    table.innerHTML += row;
            }

            row =`<br>`
            table.innerHTML += row;
        }
    });
});

let delete_btn = document.getElementById('delete_list');

delete_btn.addEventListener('click', () => {

    lottery_winner_table.style.opacity = "0";
    tender_winner_table.style.opacity = "0";
    lucky_draw_winner_table.style.opacity = "0";

    deletes.find({}, (err,docs) => {
        
        let i, row;
        buildTable(docs);

        function buildTable(data){

            let table = document.getElementById('tb');
            let lwtb = document.getElementById('lwtb');
            let twtb = document.getElementById('twtb');
            let dwtb = document.getElementById('dwtb');

            table.innerHTML = "";
            lwtb.innerHTML = "";
            twtb.innerHTML = "";
            dwtb.innerHTML = "";

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

});


$('#generate_pdf').click(function (){

    var HTML_Width = $(".user_data_container").width();
    var HTML_Height = $(".user_data_container").height();
    var top_left_margin = 15;
    var PDF_Width = HTML_Width+(top_left_margin*2);
    var PDF_Height = (PDF_Width*1.5)+(top_left_margin*2);
    var canvas_image_width = HTML_Width;
    var canvas_image_height = HTML_Height;
    
    var totalPDFPages = Math.ceil(HTML_Height/PDF_Height)-1;
    

    html2canvas($(".user_data_container")[0],{allowTaint:true}).then(function(canvas) {
        canvas.getContext('2d');
        
        console.log(canvas.height+"  "+canvas.width);
        
        
        var imgData = canvas.toDataURL("image/jpeg", 2);
        var pdf = new jsPDF('p', 'pt',  [PDF_Width, PDF_Height]);
        pdf.addImage(imgData, 'JPG', top_left_margin, top_left_margin,canvas_image_width,canvas_image_height);
        
        
        for (var i = 1; i <= totalPDFPages; i++) { 
            pdf.addPage(PDF_Width, PDF_Height);
            pdf.addImage(imgData, 'JPG', top_left_margin, -(PDF_Height*i)+(top_left_margin*4),canvas_image_width,canvas_image_height);
        }
        
        pdf.save("epco.pdf");
    });
});