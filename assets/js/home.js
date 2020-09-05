let formLoaded = true;
let tableLoaded = false;
let tempTables = [];
let submitButton = $('.submit-btn')
let forms = $('#newForm');
let tables = $('#tables');
let dataForm = $('#form1');
let buttonContainer = $('#traversal_buttons');
let nextButton = $('#next-page');
let previousButton = $('#previous-page');
let deleteButton = $('.deletebtn');
let form = $('.input-container input');
let currentPage = 0;

// Function to show forms on clicking to ADD button when tables are loaded
function showForm(){
   formLoaded = true;
   tableLoaded = false;
   forms.css('display','block');
   tables.css('display','none');
   buttonContainer.css('display','none');
}

//Function to show Tables on Clicking on View button when forms are laoded
function showTable(){
   formLoaded = false;
   tableLoaded = true;
   forms.css('display','none');
   tables.css('display','block');
   buttonContainer.css('display','block');
}

// function does ajax call on mySQL database to fetch 3 rows of unversity information, 
// fetches information and append it to the table element 
function loadTable(currentPage){
   tempTables = [];
   $.ajax({
      type: 'get',
      url: `/users/loadtable/?start=${currentPage}`,
      success: (data) => {
         for(let i = 1 ; i <= data.data.table.length ; i++){
            tempTables[i-1] = data.data.table[i-1];
           let eachRow = constructTable(data.data.table[i-1],i);
           tables.append(eachRow); 
         }
         activateEditButtons();
         activateDeleteButtons();
      },
      failure: (error) => {
         console.log(error.responseText);
      }
   })
}

// function to construct Table each time
function constructTable(table, row){
   return(`
         <tr>
            <td> ${row + currentPage} </td>
            <td> ${table.uniname} </td>
            <td> ${table.registeration_date.substring(0,10)} </td>
            <td> ${table.expiry_date.substring(0,10)} </td> 
            <td> ${table.imageurl} </td>
            <td> ${table.number_of_students} </td>
            <td> ${table.email} </td>
            <td> ${table.weburl} </td>
            <td> ${table.contact_number} </td>
            <td class="edit_icon" data-id="${table.uid}"> <i class="fas fa-pen"></i> </td>
            <td class="delete_icon" onclick="document.getElementById('id04').style.display='block'" 
            data-id="${table.uid}"> <i class="fas fa-times-circle"></i> </td>
         </tr>    
   `)
}

// After submission of form this function removes those filled values
function removeValues(){
   $('.input-container input').val('');
   submitButton.attr('data-action','/users/store_data');
   $(form[0]). attr('readonly',false);
}

// Function to destroy previously loaded rows on page traversal
function destroyTable(){
   tables.find("tr:gt(0)").remove();
}

// previous page Button
previousButton.click(() => {
   if(currentPage > 2){
      destroyTable();
      currentPage = currentPage - 3;
      loadTable(currentPage);
   }
})

// Next Page button
nextButton.click(() => {
   destroyTable();
   currentPage = currentPage + 3;
   loadTable(currentPage);
})

//Function to activate edit button on each row element
function activateEditButtons(){
   $('.edit_icon').each(function() {
      let self = this;
      $(self).click(() => {

         let id = parseFloat($(this).attr('data-id'));
         index = -1;
         if(tempTables[0].uid === id) index = 0 ;
         else if(tempTables[1].uid === id) index = 1;
         else index = 2;
         
         showForm();
         fillform(tempTables[index]);
         submitButton.attr('data-action','/users/update_data');
      })
   })
}

function fillform(data){
  $(form[0]).val(data.uniname);
  $(form[0]). attr('readonly','readonly');
  $(form[1]).val(data.registeration_date.substring(0,10));
  $(form[2]).val(data.expiry_date.substring(0,10));
  $(form[3]).val(data.imageurl);
  $(form[4]).val(data.number_of_students);
  $(form[5]).val(data.email);
  $(form[6]).val(data.weburl);
  $(form[7]).val(data.contact_number);
}

//Function activates delete button on each row element
function activateDeleteButtons(){
   $('.delete_icon').each(function() {
      let self = this;
      $(self).click(() => {
         let id = $(this).attr('data-id');
         deleteButton.attr('data-id', id);
      })
   })
}

// function to make the final delete call on confirmation 
deleteButton.click(() => {
   let id = deleteButton.attr('data-id');
   $.ajax({
      method: 'get',
      url: `/users/delete/?id=${id}`,
      success: (data) => {
         destroyTable();
         loadTable(currentPage);
         $('#id04').css('display','none');
      }
   })
})

// ADD button event listener
$('.add-btn').click(() => {
   if(formLoaded){
      $('#id01').css('display','block');
   }
   else{
      removeValues();
     showForm();
   }
})

// view button event Listener
$('.view-btn').click(() => {
   if(formLoaded){
      destroyTable();
      loadTable(currentPage);
      showTable();
   }
})

// Function to hanlde Form Submissions
dataForm.submit((e) => {
   e.preventDefault();

   $.ajax({
      type: 'Post',
      url: submitButton.attr('data-action'),
      data: dataForm.serialize(),
      success: (data) => {
         $("#id02").css('display','block');
         setTimeout(() => {
            $("#id02").css('display','none');
            removeValues();
         },5000);
      },
      error: (error) => {
         console.log(error.responseText);
         $("#id03").css('display','block');
         setTimeout(() => {
            $("#id03").css('display','none');
            removeValues();
         },5000);
     }
   })

});

