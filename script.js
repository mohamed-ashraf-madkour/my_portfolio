### ⚙️ js/script.js
```javascript
function setTheme(mode){
  document.body.classList.toggle('light', mode==='light');
  localStorage.setItem('theme', mode);
}

function toggleTheme(){
  const isLight = document.body.classList.contains('light');
  setTheme(isLight ? 'dark' : 'light');
}

(function(){
  const saved = localStorage.getItem('theme') || 'dark';
  setTheme(saved);
})();

function sendMessage(){
  const name=document.getElementById('name').value;
  const email=document.getElementById('email').value;
  const msg=document.getElementById('message').value;

  if(!name||!email||!msg){
    alert('Fill all fields');
    return;
  }

  window.location.href = `mailto:madkourmohamed88@gmail.com?subject=Portfolio from ${name}&body=${msg} (${email})`;
}
