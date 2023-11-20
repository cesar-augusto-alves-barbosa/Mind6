const qtdDadosGrafico = 5;
let primeiraVezCPU = true;
let primeiraVezMemoria = true;
let primeiraVezDisco = true;
let target;
let gaugeCPU = 60;
let gaugeMemoria = 60;
let gaugeDisco= 60;
let tempoRecuperacao = 700;
let pontosTotais = 0;
let pontosCPU;
let pontosMemoria;
let pontosDisco;
let somaCPU = 0;
let contadorMedia = 0;
let desligado = true;
let UsoAtualRAM = 0;
let UsoAtualCPU = 0;

// Variaveis de informações da máquina
let nomeMaquina = '';
let sistemaOperacionalMaquina = '';
let ipv4Maquina = '';
let serialNumMaquina = '';
let nomeCPU = '';
let ghzCPU = 0;
let nomeMemoria = '';
let espacoMemoria = 0;
let nomeDisco = '';
let espacoDisco = 0;

// // ESSA É A VARIAVEL ONDE OS DADOS VÃO SER INSERIDOS
var mediaCPU = {
    // AQUI É INSERIDO A DATA E HORA
};

function setLigado() {
    desligado = false;
}

function atualizaInformacoesMaquina() {
    loadingInfoMaquina.style.display = 'none';
    lista_informacoes_maquina.innerHTML = '';
    lista_informacoes_maquina.innerHTML = `
            <li><b>Nome da Máquina:</b> ${nomeMaquina}</li>
            <li><b>Sistema Operacional:</b> ${sistemaOperacionalMaquina}</li>
            <li><b>IPV4:</b> ${ipv4Maquina}</li>
            <li><b>Número Serial:</b> ${serialNumMaquina}</li>
            <li><b>Processador:</b> ${nomeCPU}</li>
            <li><b>Tipo Memória RAM:</b> ${nomeMemoria}</li>
            <li><b>Espaço Total em Memória:</b> ${espacoMemoria}GB</li>
            <li><b>Nome Disco:</b> ${nomeDisco}</li>
            <li><b>Espaço Total em Disco:</b> ${espacoDisco}GB</li>
        `;
    // lista_informacoes_maquina.innerHTML = `
    //         <li><b>Nome da Máquina:</b> ${"PC-2021"}</li>
    //         <li><b>Sistema Operacional:</b> ${"Windows"}</li>
    //         <li><b>IPV4:</b> ${"190.182.168.1.1"}</li>
    //         <li><b>Número Serial:</b> ${"PCRSDDDK322"}</li>
    //         <li><b>Processador:</b> ${"Intel I5"}</li>
    //         <li><b>Tipo Memória RAM:</b> ${"DDR4"}</li>
    //         <li><b>Espaço Total em Memória:</b> ${"1000"}GB</li>
    //         <li><b>Nome Disco:</b> ${"Disk memory"}</li>
    //         <li><b>Espaço Total em Disco:</b> ${"8"}GB</li>
    //     `;
}


// ESSAS FUNÇÕES SERVEM APENAS PARA MUDAR O FORMATO DA DATA E HORA

function alteraData(data) {
    var dataFormatada = data.substring(0, data.indexOf("T"));
    var dadosData = dataFormatada.split("-");

    var dataFinal = dadosData[2] + "/" + dadosData[1] + "/" + dadosData[0] + " ";
    return dataFinal;
}

function alteraHora(Hora) {
    var horaFormatada = Hora.substring(11, Hora.indexOf("."));
    return horaFormatada;
}

function recuperarInfoComponentesMaquina(fkComputador) {
    fetch(`/componente/recuperar/${fkComputador}`, {
        method: "GET",
    }).then(response => {
        console.log("INFOS" + response)
        if (response.ok) {
            response.json().then(json => {
                console.log("INFOS" + json)
                nomeCPU = json[2].nomeComponente;
                ghzCPU = json[2].memoriaMax;
                nomeMemoria = json[1].nomeComponente;
                espacoMemoria = json[1].memoriaMax;
                nomeDisco = json[0].nomeComponente;
                espacoDisco = json[0].memoriaMax;

            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    });
}

// AQUI FAZEMOS AS PESQUISAS NO BANCO E APAGAMOS OS DADOS DO ARRAY DE DADOS ### A FUNÇÃO QUE ESTÁ SENDO RODADA VARIAS VEZES
function receberNovasLeituras(tipoComponente) {
    // AQUI VC FAZ A CHAMADA PARA O BACKEND PARA RECUPERAR OS DADOS
    // USANDO O FETCH()
    

    fetch(`/usoTotal/recuperar/${sessionStorage.idComputador}/${tipoComponente}`, {
        method: "GET",
    }).then(response => {

        if (response.ok) {

            response.json().then(json => {

                json.reverse();
                let resposta = JSON.parse(JSON.stringify(json));
                if (resposta.length == 0 || desligado) {
                    plotarGraficoCPU(0);
                    plotarGraficoMemoria(0);
                    plotarGraficoDisco(0);
                } else {
                    if (tipoComponente == "CPU") {
                        pontosCPU = analisaStatusComponente(resposta[0].usoComponente);
                        nomeCPU = resposta[0].nomeComponente;
                        ghzCPU = resposta[0].memoriaMax;
                        UsoAtualCPU = resposta[0].usoComponente;
                        plotarGraficoCPU(resposta[0].usoComponente);
                    }
                    if (tipoComponente == "RAM") {
                        pontosMemoria = analisaStatusComponente(resposta[0].usoComponente);
                        nomeMemoria = resposta[0].nomeComponente;
                        espacoMemoria = resposta[0].memoriaMax;
                        UsoAtualRAM = resposta[0].usoComponente;
                        plotarGraficoMemoria(resposta[0].usoComponente);
                    }
                    if (tipoComponente == "DISCO") {
                        nomeDisco = resposta[0].nomeComponente;
                        espacoDisco = resposta[0].memoriaMax;
                        pontosDisco = analisaStatusComponente(resposta[0].usoComponente);
                        plotarGraficoDisco(resposta[0].usoComponente);

                    }
                }



            });

        } else {
            if (tipoComponente == "CPU") {
                uso_cpu.innerHTML = "Dados não encontrados"
                plotarGraficoCPU(0);
            }
            if (tipoComponente == "Ram") {
                uso_memoria.innerHTML = "Dados não encontrados";
                plotarGraficoMemoria(0);
            }
            if (tipoComponente == "Disco") {
                uso_disco.innerHTML = "Dados não encontrados";
                plotarGraficoDisco(0);
            }

            console.error('Nenhum dado encontrado ou erro na API');

        }
    });





    fetch(`/usoTotal/recuperar_media_computadores/${sessionStorage.fkEscola}/RAM`, {
        method: "GET",
    }).then(response => {
        if (response.ok) {

            response.json().then(json => {
                json.reverse();
                let resposta = JSON.parse(JSON.stringify(json));
                configGraficoMediaComparativaRam.data.datasets[0].data[0] = resposta[0].atual;
                configGraficoMediaComparativaRam.data.datasets[0].data[1] = UsoAtualRAM;


                //window.graficoMediaComparativaRam.update();


            });

        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    });

    fetch(`/usoTotal/recuperar_media_computadores/${sessionStorage.fkEscola}/CPU`, {
        method: "GET",
    }).then(response => {
        if (response.ok) {

            response.json().then(json => {
                json.reverse();
                let resposta = JSON.parse(JSON.stringify(json));
                configGraficoMediaComparativaCPU.data.datasets[0].data[0] = resposta[0].atual;
                configGraficoMediaComparativaCPU.data.datasets[0].data[1] = UsoAtualCPU;

                //window.graficoMediaComparativaCpu.update();


            });

        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    });

}
function analisaStatusComponente(dado) {
    if (dado > 80) {
        return 3
    } else if (dado > 50) {
        return 2
    } else {
        return 1
    }
}



function verificarStatusMaquina(dadoCPU, dadoMemoria, dadoDisco) {

    pontosTotais = pontosCPU;
    pontosTotais += pontosMemoria;
    pontosTotais += pontosDisco;
    div_alerta = document.getElementById('info_uptime');
    if (pontosTotais > 7) {
        div_alerta.innerHTML = "PERIGO";
        div_alerta.style.color = "red";
    } else if (pontosTotais > 4) {
        div_alerta.innerHTML = "ALERTA";
        div_alerta.style.color = "yellow";
    } else {
        div_alerta.innerHTML = "OK";
        div_alerta.style.color = "green";
    }
}

function atualizaGraficos() {
    setTimeout(() => {
        receberNovasLeituras("CPU");
        receberNovasLeituras("RAM");
        receberNovasLeituras("DISCO");
        verificarStatusMaquina(pontosCPU, pontosMemoria, pontosDisco);
        plotarGraficoMediaCpuRam();
        atualizaGraficos();

    }, tempoRecuperacao)
}
verificarStatusMaquina(pontosCPU, pontosMemoria, pontosDisco);
// CONFIGURAÇÃO DO GRAFICO
function configurarGrafico() {
    var opts = {
        staticZones: [{
            strokeStyle: "#30b32d",
            min: 0,
            max: 50,
            height: 0.6
        },
        {
            strokeStyle: "#ffdd00",
            min: 50,
            max: 80,
            height: 0.6
        },
        {
            strokeStyle: "#f03e3e",
            min: 80,
            max: 100,
            height: 0.6
        }
        ],
        staticLabels: {
            font: "10px sans-serif", // Specifies font
            labels: [0, 50, 90], // Print labels at these values
            color: "#000000", // Optional: Label text color
            fractionDigits: 0 // Optional: Numerical precision. 0=round off.
        },
        angle: -0.2, // The span of the gauge arc
        lineWidth: 0.2, // The line thickness
        radiusScale: 0.63, // Relative radius
        pointer: {
            length: 0.58, // // Relative to gauge radius
            strokeWidth: 0.06, // The thickness
            color: '#000000' // Fill color
        },
        limitMax: false, // If false, max value increases automatically if value > maxValue
        limitMin: false, // If true, the min value of the gauge will be fixed
        colorStart: '#6F6EA0', // Colors
        colorStop: '#C0C0DB', // just experiment with them
        strokeColor: '#EEEEEE', // to see which ones work best for you
        generateGradient: true,
        highDpiSupport: true, // High resolution support

    };

    return opts;
}

function plotarGraficoCPU(dado) {
    if (primeiraVezCPU) {
        target = document.getElementById('grafico_cpu'); // your canvas element
        gaugeCPU = new Gauge(target).setOptions(configurarGrafico());
        gaugeCPU.maxValue = 100; // set max gauge value
        gaugeCPU.setMinValue(0); // Prefer setter over gauge.minValue = 0
        gaugeCPU.animationSpeed = 20; // set animation speed (32 is default value)
        gaugeCPU.set(dado);
        primeiraVezCPU = false;
        uso_cpu.innerHTML = dado + "%";
        tempoRecuperacao = 7000;

    } else {
        gaugeCPU.set(dado);
        uso_cpu.innerHTML = dado + "%";

    }
}

function plotarGraficoMediaCpuRam() {
    // criação do gráfico na página
    let ctx = document.getElementById('grafico_comparacao_cpu_computadores').getContext('2d');
    window.graficoMediaComparativaCpu = new Chart(ctx, configGraficoMediaComparativaCPU);

    let ctx2 = document.getElementById('grafico_comparacao_ram_computadores').getContext('2d');
    window.graficoMediaComparativaRam = new Chart(ctx2, configGraficoMediaComparativaRam);

}

function plotarGraficoMemoria(dado) {
    if (primeiraVezMemoria) {
        target = document.getElementById('grafico_memoria'); // your canvas element
        gaugeMemoria = new Gauge(target).setOptions(configurarGrafico());
        gaugeMemoria.maxValue = 100; // set max gauge value
        gaugeMemoria.setMinValue(0); // Prefer setter over gauge.minValue = 0
        gaugeMemoria.animationSpeed = 20; // set animation speed (32 is default value)
        gaugeMemoria.set(dado);
        primeiraVezMemoria = false;
        uso_memoria.innerHTML = dado + "%";
        tempoRecuperacao = 7000;
    } else {
        gaugeMemoria.set(dado);
        uso_memoria.innerHTML = dado + "%";
    }
}

function plotarGraficoDisco(dado) {
    if (primeiraVezDisco) {
        target = document.getElementById('grafico_disco'); // your canvas element
        gaugeDisco = new Gauge(target).setOptions(configurarGrafico());
        gaugeDisco.maxValue = 100; // set max gauge value
        gaugeDisco.setMinValue(0); // Prefer setter over gauge.minValue = 0
        gaugeDisco.animationSpeed = 20; // set animation speed (32 is default value)
        gaugeDisco.set(dado);
        primeiraVezDisco = false;
        uso_disco.innerHTML = dado + "%";
        tempoRecuperacao = 7000;
    } else {
        gaugeDisco.set(dado);
        uso_disco.innerHTML = dado + "%";
    }
}

// GRÁFICO DE BARRA MEDIA DE USO RAM / RAM MAQUINA ATUAL


var configGraficoMediaComparativaRam = {
    type: 'bar',
    data: {
        labels: ["Média Atual Global", "Uso Maquina Atual"],
        datasets: [{
            label: 'RAM',
            borderColor: "#000",
            backgroundColor: '#1111FF',
            data: [],// AQUI É INSERIDO A OS DADOS OU SEJA A QUANTIDADE QUE VAI SER EXIBIDA NO GRAFICO
            fill: false,
        }]
    },
    options: {
        responsive: true,
        title: {
            display: true,
            text: 'Media de uso da RAM Global x Uso RAM Atual'
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
                    labelString: 'Leitura'
                }
            }],
            yAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'Média % todas maquinas RAM x Uso RAM'
                }, ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
};

// GRÁFICO DE BARRA MEDIA DE USO CPU / CPU MAQUINA ATUAL

var configGraficoMediaComparativaCPU = {
    type: 'bar',
    data: {
        labels: ["Média Atual Global", "Uso Maquina Atual"],
        datasets: [{
            label: 'CPU',
            borderColor:  "#000",
            backgroundColor: '#1111FF',
            data: [],// AQUI É INSERIDO A OS DADOS OU SEJA A QUANTIDADE QUE VAI SER EXIBIDA NO GRAFICO
            fill: false,
        }]
    },
    options: {
        responsive: true,
        title: {
            display: true,
            text: 'Media de uso da CPU Global x Uso CPU Atual'
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
            x: [{
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'Leitura'
                }
            }],
            y: [{
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'Média % todas maquinas CPU x Uso CPU'
                }, ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
};


