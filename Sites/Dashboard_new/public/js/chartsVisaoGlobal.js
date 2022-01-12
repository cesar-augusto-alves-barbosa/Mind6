let primeiraVez = true;
let usoCPU;
let usoMemoria;
let usoDisco;

let primeiraVezStatus = true;

let computadores = [];
let usos = [];



var config = {
    type: 'bar',
    data: {
        labels: ["Hoje", "Ontem", "Anteontem"],
        datasets: [{
            label: 'CPU',
            borderColor: window.chartColors.blue,
            backgroundColor: '#1111FF',
            data: [],// AQUI É INSERIDO A OS DADOS OU SEJA A QUANTIDADE QUE VAI SER EXIBIDA NO GRAFICO
            fill: false,
        }]
    },
    options: {
        responsive: true,
        title: {
            display: true,
            text: 'Media de uso da CPU Global'
        },
        tooltips: {
            mode: 'index',
            intersect: false,
        },
        hover: {
            mode: 'nearest',
            intersect: true
        },
        scales: {
            xAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'Dia da leitura'
                }
            }],
            yAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'Média % de Uso CPU'
                }, ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
};

function receberNovasLeiturasMedia() {
    // AQUI VC FAZ A CHAMADA PARA O BACKEND PARA RECUPERAR OS DADOS
    // USANDO O FETCH()


    fetch(`/usoTotal/recuperar_media_computadores/${sessionStorage.fkEscola}/CPU`, {
        method: "GET",
    }).then(response => {
        if (response.ok) {

            response.json().then(json => {

                json.reverse();
                let resposta = JSON.parse(JSON.stringify(json));
                if (primeiraVez) {
                    for (let i = 0; i < 3; i++) {
                        if (i == 0) {
                            config.data.datasets[0].data[i] = resposta[0].atual;
                        } else if (i == 1) {
                            config.data.datasets[0].data[i] = resposta[0].ontem;
                        } else {
                            config.data.datasets[0].data[i] = resposta[0].antesOntem;
                        }

                    }
                    primeiraVez = false;
                } else {
                    for (let i = 0; i < 3; i++) {

                        if (i == 0) {
                            config.data.datasets[0].data[i] = resposta[0].atual;
                        } else if (i == 1) {
                            config.data.datasets[0].data[i] = resposta[0].ontem;
                        } else {
                            config.data.datasets[0].data[i] = resposta[0].antesOntem;
                        }

                    }
                }

                window.graficoLinha.update();


            });

        } else {
            if (contadorMedia < 5) {
                config.data.datasets[0].data.push(0);
                contadorMedia++;
            } else {
                config.data.datasets[0].data.shift();
                config.data.datasets[0].data.push(0);
            }

            console.error('Nenhum dado encontrado ou erro na API');

        }
    });
}

function atualizaGraficos() {
    setInterval(() => {
        receberNovasLeiturasMedia();
    }, 7000)
}

function plotarGraficoMediaCpu() {
    // criação do gráfico na página
    let ctx = document.getElementById('grafico_media_cpu_computadores').getContext('2d');
    window.graficoLinha = new Chart(ctx, config);

}
// Recuperando status das Maquinas

function usoMaquinas() {
    fetch(`/usoTotal/recuperar_todos_usos/${sessionStorage.fkEscola}`, {
        method: "GET",
    }).then(response => {

        if (response.ok) {
            response.json().then(json => {
                for (let i = 0; i < json.length; i++) {
                    usos.push(json[i]);
                }
            });

        } else {
            console.error('Nenhum dado encontrado ou erro na API');

        }
    });

}

function recuperarComputador() {
    fetch(`/computador/recuperar/${sessionStorage.fkEscola}`, {
        method: "GET",
    }).then(response => {
        if (response.ok) {
            response.json().then(json => {
                for (let i = 0; i < json.length; i++) {

                    computadores.push(json[i]);
                }
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');

        }
    });

}

let tempo = 0;
function atualizaTabelaStatus() {

    if (primeiraVezStatus) {
        primeiraVezStatus = false;
        tempo = 2000;
    }

    let recupera_maquinas_usos = setInterval(() => {
        computadores = [];
        usos = [];
        usoMaquinas();
        recuperarComputador();
        atualizaTabelaStatus();
        clearInterval(recupera_maquinas_usos);
    }, tempo);

    let recuperacao_maquinas = setInterval(() => {
        for (let i = 0; i < computadores.length; i++) {
            let pontosTotais = 0;
            let temDadoCPU = false;
            let temDadoMemoria = false;
            let temDadoDisco = false;

            for (let j = 0; j < usos.length; j++) {
                if (computadores[i].idComputador == usos[j].fkComputador) {
                    if (!temDadoCPU) {
                        temDadoCPU = true;
                        pontosTotais += analisaStatusComponente(usos[j].usoComponente);
                    } else if (!temDadoMemoria) {
                        temDadoMemoria = true;
                        pontosTotais += analisaStatusComponente(usos[j].usoComponente);
                    } else if (!temDadoDisco) {
                        temDadoDisco = true;
                        pontosTotais += analisaStatusComponente(usos[j].usoComponente);
                    }

                }
            }
            let disponibilidadeComp;
            let statusMaquina;
            if (computadores[i].disponibilidade == 1) {
                disponibilidadeComp = "<span style='color: green;'>ON</span>";
                if (pontosTotais > 7) {
                    statusMaquina = { status: "PERIGO", cor: "red" };
                } else if (pontosTotais > 4) {
                    statusMaquina = { status: "ALERTA", cor: "yellow" };
                } else {
                    statusMaquina = { status: "OK", cor: "green" };
                }
            } else {
                disponibilidadeComp = "<span style='color: red;'>OFF</span>";
                statusMaquina = { status: "OK", cor: "green" };
            }
            let maquinaAtual = "Maquina" + i;
            if (document.getElementById(maquinaAtual) != undefined) {
                document.getElementById(maquinaAtual).innerHTML = ` <td>${computadores[i].nomeComputador}</td>
                    <td>${disponibilidadeComp}</td>
                    <td style='color: ${statusMaquina.cor}'>${statusMaquina.status}</td>`
            } else {
                status_maquinas.innerHTML += `
                <tr id="Maquina${i}" class="tr-maquina">
                    <td>${computadores[i].nomeComputador}</td>
                    <td>${disponibilidadeComp}</td>
                    <td style='color: ${statusMaquina.cor}'>${statusMaquina.status}</td>
                </tr> `;
            }

        }

        clearInterval(recuperacao_maquinas);
    }, tempo + 1000);
}
atualizaTabelaStatus();




function analisaStatusComponente(dado) {
    if (dado > 80) {
        return 3
    } else if (dado > 50) {
        return 2
    } else {
        return 1
    }
}


atualizaGraficos()
plotarGraficoMediaCpu();