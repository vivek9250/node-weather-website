const weatherForm=document.querySelector("form");
const search=document.querySelector("input");
const msg1=document.querySelector("#msg-1");
const msg2=document.querySelector("#msg-2");
weatherForm.addEventListener("submit",(e)=>{
  e.preventDefault();
  msg1.textContent='.....';
  msg2.textContent='';
  const location=search.value;
  fetch('http://localhost:3000/weather?address='+encodeURIComponent(location)+'').then((response)=>{
  response.json().then(({status:mystatus,errorMessage:err,description,searchlocation}={})=>{
    if(mystatus===300)
    {
      msg1.textContent=err;
    }
    else
    {
      console.log(searchlocation);
      msg1.textContent=searchlocation;
      msg2.textContent=description;
    }
  });
  });
});
