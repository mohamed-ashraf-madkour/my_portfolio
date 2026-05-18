function toggleTheme(){
  document.body.classList.toggle('light');
}

// Typing effect
const text = ["Data Analyst","Power BI Developer","Python Analyst"];
let i=0, j=0, current="", isDeleting=false;

function type(){
  current = text[i];
  if(isDeleting){
    j--;
  }else{
    j++;
  }

  document.getElementById("typing").innerHTML = current.substring(0,j);

  if(!isDeleting && j===current.length){
    isDeleting=true;
    setTimeout(type,1000);
    return;
  }

  if(isDeleting && j===0){
    isDeleting=false;
    i=(i+1)%text.length;
  }

  setTimeout(type,120);
}

type();

// Contact
function sendMessage(){
  const name=document.getElementById("name").value;
  const email=document.getElementById("email").value;
  const msg=document.getElementById("message").value;

  window.location.href=`mailto:madkourmohamed88@gmail.com?subject=Portfolio&body=${msg} (${email})`;
}
