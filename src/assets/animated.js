/* Set the width of the side navigation to 250px and the left margin of the page content to 250px and add a black background color to body */
function openNav() {
    document.querySelector("#mySidenav").style.width = "250px";
    // document.getElementById("main").style.marginLeft = "250px";
    // document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
    document.querySelector('#main').style.opacity = "0.3";
}

/* Set the width of the side navigation to 0 and the left margin of the page content to 0, and the background color of body to white */
function closeNav() {
    document.querySelector("#mySidenav").style.width = "0";
    // document.getElementById("main").style.marginLeft = "0";
    document.querySelector('#main').style.opacity = "1";
    // document.body.style.backgroundColor = "white";
}

/* The Follwing is for switch Night Mode/Light Mode */
let swich=document.querySelector('.btn')
swich.addEventListener('click',(e)=>{
   let parentDoc =e.target.parentElement.parentElement
    if(parentDoc.classList.contains('active')){
        parentDoc.classList.remove('active')
        document.querySelector('input[type=checkbox]').checked=false
    }else{
        parentDoc.classList.add('active')
        document.querySelector('input[type=checkbox]').checked=true
    }
    // console.log(e.target.parentElement.parentElement);
    /* Night Mode */
    if (document.querySelector('input[type=checkbox]').checked) {
        document.querySelector('#main').style.backgroundColor ="black"
        document.querySelector('#main').style.color ="white"
        document.querySelector('#main nav #menu-icon').style.color ="white"
        document.querySelector('.btnMain-body label').innerHTML ="🌚"
    }else {
        document.querySelector('#main').style.backgroundColor ="white"
        document.querySelector('#main').style.color ="black"
        document.querySelector('#main nav #menu-icon').style.color =""
        document.querySelector('.btnMain-body label').innerHTML ="🌞"
    }
})
document.querySelector('body').addEventListener('scroll',()=>{
    document.querySelector('nav').className ="stay-top"
})

// Taking Note Box
const noteBox = document.querySelector('.note')
const noteColose = document.querySelector('.note .nav .btn-danger')
// document.querySelector('.note').style.resize ="horizontal"
let close = false
function takeNote(){
        
    document.querySelector(".note").style.width="800px"
    document.querySelector(".note .hide").style.display="block"
    document.querySelector(".note").style.overflow="visible"
    
        close = true
}
document.querySelector('.note .nav .btn-danger').addEventListener("click",()=>{
    if (close) {
        document.querySelector(".note").style.width="0px"
        document.querySelector(".note .hide").style.display="none"
        document.querySelector(".note").style.overflow="hidden"
        close = false
    }
})