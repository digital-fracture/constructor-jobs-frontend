const preloader = document.getElementById("preloader");
const mod1 = document.getElementById("modal1");
const mod2 = document.getElementById("modal2");
const mod3 = document.getElementById("modal3");
const firstcolumn = document.getElementById('firstcolumn');
const secondcolumn = document.getElementById('secondcolumn');
const thirdcolumn = document.getElementById('thirdcolumn');
const container = document.getElementById('container');
const sendtext = document.getElementById('sendtext')
document.addEventListener('DOMContentLoaded', function() {
   var modalButtons = document.querySelectorAll('.js-open-modal'),
       overlay      = document.querySelector('.js-overlay-modal'),
       closeButtons = document.querySelectorAll('.js-modal-close');

   modalButtons.forEach(function(item){
      item.addEventListener('click', function(e) {
         e.preventDefault();
         var modalId = this.getAttribute('data-modal'),
             modalElem = document.querySelector('.modal[data-modal="' + modalId + '"]');
         modalElem.classList.add('active');
         overlay.classList.add('active');
      });

   });

   closeButtons.forEach(function(item){
      item.addEventListener('click', function(e) {
         var parentModal = this.closest('.modal');
         parentModal.classList.remove('active');
         overlay.classList.remove('active');
      });

   });

    document.body.addEventListener('keyup', function (e) {
        var key = e.keyCode;
        if (key == 27) {
            document.querySelector('.modal.active').classList.remove('active');
            document.querySelector('.overlay').classList.remove('active');
        };
    }, false);

    overlay.addEventListener('click', function() {
        document.querySelector('.modal.active').classList.remove('active');
        this.classList.remove('active');
    });
});
const fileInput = document.getElementById('file');
const fileLabel = document.getElementById('label');
fileInput.addEventListener('change', () => {
const fileName = fileInput.value.split('\\').pop();
fileLabel.textContent = fileName;
});
const reset= document.getElementById('reset')
reset.addEventListener('click', () => {
fileLabel.textContent = "Нажмите, чтобы выбрать файл";
fileNameField.value = "";
fileInput.value = "";
});
const sendButton = document.getElementById("upload");

sendButton.onclick = async function(file_name2) {
    const data = new FormData();
    data.append("file", fileInput.files[0])
    preloader.style.display = "block";
    mod1.style.display = "none";
    await fetch(
        "https://kruase.serveo.net/file",
        {
            method: "POST",
            body: data
        }
    )
    .then(response => response.blob())
    .then(blob => {
        preloader.style.display = "none";
        mod1.style.display = "block"
        const url = window.URL.createObjectURL(new Blob([blob], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }));
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = file_name2;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);  
    })
    .catch(error => console.error(error));
  }

const sendphoto = document.getElementById('file2');
const position = document.getElementById('position');
const working = document.getElementById('working');
const phone = document.getElementById('phone');
const email = document.getElementById('email');
const official = document.getElementById('official');
const sendresume = document.getElementById("sendresume");
sendresume.onclick = async function(file_name) {
    
    const data = new FormData();
    data.append("file", sendphoto.files[0]);
    data.append("position", position.value);
    data.append("speciality", working.value);
    data.append("phone", phone.value);
    data.append("email", email.value);
    data.append("description", official.value);
    preloader.style.display = "block";
    mod2.style.display = "none"
    await fetch(
        "https://kruase.serveo.net/pdf",
        {
            method: "POST",
            body: data
        }
    ).then(response => response.blob()
    
    )
    .then(blob => {
        preloader.style.display = "none";
        mod2.style.display = "block"
        const url = window.URL.createObjectURL(new Blob([blob], { type: 'application/pdf' }));
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = file_name;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);  
    })
    .catch(error => console.error(error));
  }
  function clearTextarea() {
    document.getElementById("officialonly").value = "";
  }
    const sendtextonly = document.getElementById('sendtextonly')
    sendtextonly.onclick = async function() {
    const doc = document.getElementById("officialonly")
    preloader.style.display = "block";
    mod3.style.display = "none"
    
     
    const majorik = JSON.parse(
        await fetch(
            "https://kruase.serveo.net/api", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "text": doc.value
                })
            }
        )
        .then(response => {
            preloader.style.display = "none";
            mod3.style.display = "block";
            doc.style.display = "none";
            container.style.display = "block";
            sendtext.style.display = "none"
            return response.text();
        })
    );

    firstcolumn.value = majorik['requirements'];
    secondcolumn.value = majorik['conditions'];
    thirdcolumn.value = majorik['notes'];
  }
