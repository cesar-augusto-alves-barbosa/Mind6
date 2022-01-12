let processoExcluir = 0;
let computadoresEscola = [];

function abrirPopUp(idProcesso) {
    bgPopUpAlerta.style.display = 'block';
    divPopUpAlerta.style.display = 'flex';
    PopUpAlerta.style.display = 'flex';
    processoExcluir = idProcesso;
    recuperarMaquinasEscola();
}

function fecharPopUp() {
    bgPopUpAlerta.style.display = 'none';
    divPopUpAlerta.style.display = 'none';
    PopUpAlerta.style.display = 'none';
    processoExcluir = 0;
    computadoresEscola = [];
}


function removerProcessoEscola() {
    fetch(`/blacklist/deletar_processos_escola/${sessionStorage.fkEscola}/${processoExcluir}`, {
        method: "POST",
    }).then(response => {
        if (response.ok) {

            response.json().then(json => {
                resposta_cadastro.innerHTML = "<span style='color: green'>Processo excluido</span>";
                recuperaProcessosEscola();
                deletarProcessoTodasMaquinas(processoExcluir);

            });

        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    });
}


function removerProcessoComputador() {
    fetch(`/blacklist/deletar_processos_computador/${sessionStorage.idComputador}/${processoExcluir}`, {
        method: "POST",
    }).then(response => {
        if (response.ok) {

            response.json().then(json => {
                resposta_cadastro.innerHTML = "<span style='color: green'>Processo excluido</span>";
                recuperaProcessosComputador();
                recuperaProcessosEscola();
                fecharPopUp();
            });

        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    });
}


function recuperarMaquinasEscola() {
    fetch(`/computador/recuperar/${sessionStorage.fkEscola}`, {
        method: "GET",
    }).then(response => {
        if (response.ok) {

            response.json().then(json => {
                for (let i = 0; i < json.length; i++) {
                    computadoresEscola.push(json[i]);
                }
            });

        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    });
}

function deletarProcessoTodasMaquinas(idProcesso) {
    for (let i = 0; i < computadoresEscola.length; i++) {
        fetch(`/blacklist/deletar_processos_computador/${computadoresEscola[i].idComputador}/${idProcesso}`, {
            method: "POST",
        }).then(response => {
            if (response.ok) {
                              
            } else {
                console.error('Nenhum dado encontrado ou erro na API');
            }
        });
    }
    fecharPopUp();
}
