function submitForm(event) {
    event.preventDefault(); // Отменяем стандартное поведение формы, чтобы не происходило перезагрузки страницы
  
    const form = event.target;
    const formData = new FormData(form);
    console.log(formData)
    fetch('https://kruase.serveo.net/json', {
      method: 'POST',
      body: formData
    })
    .then(response => {
        console.log(formData)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
       
      }
      return response.json();
    })
    .then(data => {
      console.log('Response:', data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }