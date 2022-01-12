function setModal() {
    if (document.getElementById('modal').style.display == 'none') {
        document.getElementById('modal').style.display = 'block';
        document.getElementById('header__profile').style.border = '#2f2f2f 0.5px solid';
        document.getElementById('header__profile').style.borderRadius = '29px';
    } else {
        document.getElementById('modal').style.display = 'none';
        document.getElementById('header__profile').style.border = '';
        document.getElementById('header__profile').style.borderRadius = '';
    }
}



function fecharModal() {
    document.getElementById('modal').style.display = 'none';
    document.getElementById('header__profile').style.border = '';
    document.getElementById('header__profile').style.borderRadius = '';
}


let url = window.location.href;
if (url.indexOf("profile.html") == -1) {
    document.getElementById('modal__spn-nome').innerHTML = sessionStorage.nome_usuario_meuapp;
    document.getElementById('modal__spn-email').innerHTML = sessionStorage.login_usuario_meuapp;
}


// ---------------------------------------------------------------------------------------------------------------
// VERIFICAÇÃO DE GESTOR

function verificar_gestor() {
    if (sessionStorage.gestor == "false") {
        link_gestor.style.display = 'none';
    }
}
verificar_gestor();

// ---------------------------------------------------------------------------------------------------------------
// SESSÃO

function finalizar_sessao(Page) {
    var login_usuario = sessionStorage.login_usuario_meuapp;
    fetch(`/tecnico/sair/${login_usuario}`, { cache: 'no-store' });
    sessionStorage.clear();
    window.location = Page;
}

// window.onunload = () => {
//     var login_usuario = sessionStorage.login_usuario_meuapp;
//     fetch(`/tecnico/sair/${login_usuario}`, { cache: 'no-store' });
//     sessionStorage.clear();
// };

function validar_sessao() {
    var login_usuario = sessionStorage.login_usuario_meuapp;
    fetch(`/tecnico/sessao/${login_usuario}`, { cache: 'no-store' })
        .then(resposta => {
            if (resposta.ok) {
                resposta.text().then(texto => {
                    console.log('Sessão :) ', texto);
                });
            } else {
                console.error('Sessão :.( ');
                finalizar_sessao('../login.html');
            }
        });
}

validar_sessao();




