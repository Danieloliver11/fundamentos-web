let nome = document.getElementById('nome')
let email = document.getElementById('email')
let assunto = document.querySelector('#assunto')
let maps = document.getElementById('mapa')

let nomeOk =  false
let emailOk = false
let textoOk = false

nome.style.width= "100%"

email.style.width= "100%"

function validaNome(){
    let textNome = document.getElementById("textNome")
    //verifica o tamanho do 'nome'
    if (nome.value.length < 3){
        textNome.innerHTML="Nome Invalido"
        nomeOk= false
        nome.style.borderRadius= "5px"
        nome.style.border = '2px solid'
        textNome.style.color= "red"
    }else{
        textNome.innerText="Nome válido"
        textNome.style.color= "green"
        nomeOk = true
    }
}
function validaEmail(){
    let textEmail = document.getElementById("textEmail")
    // indeOF retorna 1 ou -1 para o elemento selecionado se no email não(-1) tiver "@" e ".""
    if(email.value.indexOf("@") == -1 || email.value.indexOf(".") == -1){
        textEmail.innerText = 'Email inválido'
        textEmail.style.color="red"
        emailOk=false

    }else{       
         textEmail.innerText = "Email válido"
         textEmail.style.color="green"
         emailOk=true
}
}

function textoAres(){
    let texto = document.getElementById('textArea')

    if(assunto.value.length < 100){
        texto.innerHTML= "<strong>Texto válido<strong>"
        texto.style.color="green"
        //texto.style.display="block"
        textoOk= true
    }else{
        texto.innerHTML= "<strong>Texto inválido<br> Favor colocar menos que 100 caracteres<strong>"
        texto.style.color="red"  
        textoOk=false 
       // texto.style.display="none"

    }

}
function validar(){
    if(nomeOk == true && emailOk == true && textoOk == true){
        alert("Dados enviado com sucesso!")
    }else{
        alert("[ERRO ao enviar dados!]")
    }
}
function entrar(){
    maps.style.width="200%"
    maps.style.height="800%"

    //width="250" height="200"
}

function sair(){
    maps.style.width="250px"
    maps.style.height="200px"
}