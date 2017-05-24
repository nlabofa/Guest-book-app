$(document).ready(function(){
   $('#updateGuest').on('click', updateUser);
   $('.deleteUser').on('click', deleteUser);
});
   function updateUser(){
     fetch('edit-58d93ea93649dd57388033c0', {
       method: 'put',
       headers: {'Content-Type': 'application/json'},
       body: JSON.stringify({
         'fullname': 'Darth Vader',
         'email': 'niyola@hj.com',
         'comment': 'I find your lack of faith disturbing.'
       })
     })
   }

   function deleteUser(){
     var confirmation = confirm('Are you sure?');

     if(confirmation){
       $.ajax({
         type:'DELETE',
         url:'/guests/delete/'+$(this).data('id')
       }).done(function(response){
        console.log('successfully deleted');
       });
     }else{
       return false;
     }
   }
