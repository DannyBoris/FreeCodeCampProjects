const checkboxChange=(el)=>{
        el.parentNode.classList.toggle('checked')
}


fetch('https://res.cloudinary.com/dppogsm2u/image/upload/v1585049526/polar-bear-cubs_tqopog.jpg').then(res=>{
        console.log(res)
})
