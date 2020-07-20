/*fetch('http://localhost:3000/weather?address=Cairo')
.then((response) => response.json()) .then((data) => console.log(data))*/

const htmlForm = document.querySelector('form');

htmlForm.addEventListener('submit',(e) => {
   
    e.preventDefault();
    const location = document.getElementById('locationText');
    
    fetch('http://localhost:3000/weather?address=' + location.value)
    .then((response) => response.json()) .then((data) => {
        const resultText = document.getElementById('result');
        
        if(data.error)
        {
            return resultText.innerText = data.error;
        }
        
        resultText.innerText = 'The Forcast in '+ data.Location + ' is ' + data.Temperature;
        
    });

});

