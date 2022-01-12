/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mycompany.dotcontrolltec.computadores;

import oshi.SystemInfo;
import oshi.hardware.CentralProcessor;
import oshi.hardware.GlobalMemory;
import oshi.hardware.HardwareAbstractionLayer;
import oshi.software.os.OSFileStore;
import oshi.software.os.OperatingSystem;
import oshi.software.os.OperatingSystem.OSVersionInfo;

/**
 *
 * @author vicari
 */
public class CpuRamDisco {

    SystemInfo si = new SystemInfo();
    
    CentralProcessor.ProcessorIdentifier cpu2 = si.getHardware().getProcessor().getProcessorIdentifier();

    //atributo que tem os status do processador
    private CentralProcessor cpu;
    //atributo que tem os status da memória RAM
    private GlobalMemory ram;
    //atributo que tem os status do Dsico Físico
    private OSFileStore disco;

    public CpuRamDisco() {

        //pegando as informações do computador de dentro do systemInfo do oshi
        cpu = new SystemInfo().getHardware().getProcessor();

        //pegando as inrfomações da memória ram de dentro do oshi
        ram = new SystemInfo().getHardware().getMemory();

        //pega o disco principal numa lista de discos
        disco = new SystemInfo().getOperatingSystem().getFileSystem().getFileStores().get(0);
    }

    //traz a frenquencia numa lista(vetor) em Hz
    public Double frenquenciaCpu() {
        long N1 = cpu.getCurrentFreq()[0];
        long N2 = cpu.getCurrentFreq()[1];
        long N3 = cpu.getCurrentFreq()[2];
        long N4 = cpu.getCurrentFreq()[3];

        //soma da média dos núcleos
        long mediaNucleos = (N1 + N2 + N3 + N4) / 4;

        //calulo de Hz para GHz
        return mediaNucleos / Math.pow(10, 9);

    }

    //traz a frequencia máxima do processador
    public Double frequenciaMax() {

        //calulo de Hz para GHz
        return cpu.getMaxFreq() / Math.pow(10, 9);
    }

    //traz a quantidade total de memória Ram da máquina
    public Double qtdMemoriaRamTotal() {

        //calculo para conversão de bytes para GB
        Double GB = ram.getTotal() / Math.pow(10, 9);

        return GB;
    }

    //traz a memoria ram livre
    public Double qtdMemoriaRamLivre() {

        //calculo para a conversão de bytes para GB
        Double GB = ram.getAvailable() / Math.pow(10, 9);

        return GB;
    }

    //traz a quantidade de memória usada
    public Double qtdMemoriaRamUsada() {

        //calculo para saber a qunatidade de memoria usada
        return qtdMemoriaRamTotal() - qtdMemoriaRamLivre();
    }

    //traz o espaço total do seu disco(seja HD ou SSD)
    public Double qtdEspacoTotalDisco() {

        //calculo para converter  
        Double GB = disco.getTotalSpace() / Math.pow(10, 9);

        return GB;
    }

    //traz a quantidade de espaço livre no disco
    public Double qtdEspacoLivre() {

        Double GB = disco.getFreeSpace() / Math.pow(10, 9);

        return GB;
    }

    public Double qtdEspacoUsadoDisco() {

        return qtdEspacoTotalDisco() - qtdEspacoLivre();

    }

    public String nomeProcessador() {

        String nomecpu = cpu.getProcessorIdentifier().toString();

        return nomecpu;
    }

    public String sistemaOperacional() {

        OperatingSystem op = si.getOperatingSystem();

        String SO = op.getFamily();

        OSVersionInfo VersaoSO = op.getVersionInfo();
        
        return SO + VersaoSO;

    }
    
    public String informacoesProcessador(){
        
        HardwareAbstractionLayer hal = si.getHardware();
        
        CentralProcessor infoCpu = hal.getProcessor();
        
        String mostra = cpu.getProcessorIdentifier().toString();
        
        return mostra;
    }


}
