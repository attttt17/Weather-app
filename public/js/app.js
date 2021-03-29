


 const weatherform = document.querySelector('form')
 const search = document.querySelector('input')
 
  const message1=document.querySelector('#message1')

  const message2 = document.querySelector('#message2')
  const message3 = document.querySelector('#message3')
 // message1.textContent = 'from javascript'


 weatherform.addEventListener('submit',(e)=>{
     e.preventDefault()
      const location = search.value
    
    fetch('/weather?address='+location).then((response)=>{
     response.json().then((data)=>{
         if(data.error){
            message1.textContent=data.error
            message2.textContent= ''
         }
         else{

         
          message1.textContent=data.location
          message2.textContent = 'It is currently    ' +data.forecast.description 
          message3.textContent = 'Current Tempreature  :    '+ data.forecast.tempreature + '   degree  '

          document.getElementById('message4').innerHTML = "<img src = '" + data.forecast.icon + "'alt = 'infinix'>"
         }
     })
})
 })