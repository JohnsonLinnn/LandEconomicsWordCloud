console.log("this web is runni");


const submitText = document.querySelector('#textInput');
console.log(submitText); 

submitText.addEventListener('submit', (e) => {
  console.log(submitText.inputMsg.value); 
  e.preventDefault();
    var x = Math.floor(Math.random() * 50) + 40;
    var divider =(Math.floor(Math.random() * 10))%4;
    if(submitText.inputMsg.value!="" && divider==0){
      db.collection('submitedText').add({
        text: submitText.inputMsg.value,
        size:x
        }).then(() => {
        // close the create modal & reset for
        submitText.reset();
        console.log("s_working"); 
    }).catch(err => {
      console.log(err.message);
    });
  }else if(submitText.inputMsg.value!="" && divider==1){
      db.collection('submitedText2').add({
        text: submitText.inputMsg.value,
        size:x
        }).then(() => {
        // close the create modal & reset for
        submitText.reset();
        console.log("s_working"); 
    }).catch(err => {
      console.log(err.message);
    });
  }else if(submitText.inputMsg.value!="" && divider==2){
      db.collection('submitedText3').add({
        text: submitText.inputMsg.value,
        size:x
        }).then(() => {
        // close the create modal & reset for
        submitText.reset();
        console.log("s_working"); 
    }).catch(err => {
      console.log(err.message);
    });
  }else if(submitText.inputMsg.value!="" && divider==3){
    db.collection('submitedText4').add({
      text: submitText.inputMsg.value,
      size:x
      }).then(() => {
      // close the create modal & reset for
      submitText.reset();
      console.log("s_working"); 
  }).catch(err => {
    console.log(err.message);
  });
}
console.log(divider);
  //addingSecondpage
});