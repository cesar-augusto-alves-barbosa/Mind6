let processosBloqueadosMaquina = []
function recuperaProcessosComputador() {
    fetch(`/blacklist/recuperar_processos_computador/${sessionStorage.idComputador}`, {
        method: "POST",
    }).then(response => {
        if (response.ok) {

            response.json().then(json => {
                tabela_processos_blacklist.innerHTML = '';
                processosBloqueadosMaquina = [];
                if (json.length != 0) {
                    for (let i = 0; i < json.length; i++) {
                        processosBloqueadosMaquina.push(json[i].nomeProcesso);

                        tabela_processos_blacklist.innerHTML += `
                            <tr>
                                <td>${json[i].nomeProcesso}</td>
                                <td><i onclick="abrirPopUp(${json[i].idBlacklist})" style="color: red; cursor: pointer; font-size: 20px" class="far fa-times-circle"></i></td>
                            </tr>
                        `;
                    }
                } else {
                    tabela_processos_blacklist.innerHTML = `
                            <tr>
                                <td>Esta máquina não possui processos bloqueados</td>
                               
                            </tr>
                        `;
                }


            });

        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    });
}

function recuperaProcessosEscola() {
    fetch(`/blacklist/recuperar_processos/${sessionStorage.fkEscola}`, {
        method: "POST",
    }).then(response => {
        if (response.ok) {

            response.json().then(json => {
                processos_escola.innerHTML = '';

                for (let i = 0; i < json.length; i++) {
                    for (let j = 0; j < processosBloqueadosMaquina.length; j++) {
                        if (processosBloqueadosMaquina[j] == json[i].nomeProcesso) {
                            json[i].nomeProcesso = '';
                        }
                    }
                }
                let contadorVazios = 0;

                for (let i = 0; i < json.length; i++) {

                    if (json[i].nomeProcesso != '') {
                        processos_escola.innerHTML += `
                                <option value="${json[i].idBlacklist}">${json[i].nomeProcesso}</option>
                            `;
                    } else {
                        contadorVazios++;
                    }

                }
                if (contadorVazios == json.length) {
                    processos_escola.innerHTML = `
                                <option value="">Todos os processos foram adicionados</option>
                            `;
                }
            });

        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    });
}

function inserirProcessoBlacklistMaquina() {
    let processoSelecionado = processos_escola.value;
    if (processoSelecionado != "") {
        fetch(`/blacklist/inserir_computador_has_blacklist/${sessionStorage.idComputador}/${processoSelecionado}`, {
            method: "POST",
        }).then(response => {
            if (response.ok) {

                response.json().then(json => {
                    resposta_cadastro.innerHTML = "<span style='color: green'>Inserido com sucesso</span>";
                    recuperaProcessosComputador();
                    recuperaProcessosEscola();
                });

            } else {
                console.error('Nenhum dado encontrado ou erro na API');
            }
        });
    } else {
        alert("Selecione um processo");
    }

}
