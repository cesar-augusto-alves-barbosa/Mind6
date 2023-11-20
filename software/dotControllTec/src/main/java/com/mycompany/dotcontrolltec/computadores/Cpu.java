/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mycompany.dotcontrolltec.computadores;

import oshi.SystemInfo;
import oshi.hardware.CentralProcessor;

/**
 *
 * @author vicari
 */
public class Cpu {

    
    SystemInfo si = new SystemInfo();

    //atributo que receberá os status do processador
    private CentralProcessor cpu;
    
    private long oldTicks[];

    public Cpu(){
        
         //pegando as informações do processador de dentro do systemInfo do oshi
        cpu = new SystemInfo().getHardware().getProcessor();
        this.oldTicks = new long[CentralProcessor.TickType.values().length];
    }
    
     //traz a frenquencia numa lista(vetor) em Hz
    public Double frenquenciaCpu() {
        //variável de retorno
        long mediaNucleos = 0;
        
        //contador para cada processador lógico
        for(Integer contador = 0; contador < cpu.getLogicalProcessorCount();contador++){
            //somando a frequência dos processsador lógicos   
            mediaNucleos += cpu.getCurrentFreq()[contador];
     
        }
        //cálculo de média dos processadores lógicos
        mediaNucleos = mediaNucleos/cpu.getLogicalProcessorCount();

        //calulo de Hz para GHz
        return mediaNucleos / Math.pow(10, 9);
    }
    
    //traz a frequencia máxima do processador
    public Double frequenciaMax() {

        //calulo de Hz para GHz
        return cpu.getMaxFreq() / Math.pow(10, 9);
    }
    //pesquisar
    public Double porcetagemDeUso() {
        double d = cpu.getSystemCpuLoadBetweenTicks(oldTicks);
        oldTicks = cpu.getSystemCpuLoadTicks();
        return d * 100.0;
    }
    public Double Temperatura(){
        //return si.getHardware().getSensors().getCpuTemperature(); Tirei pois no meu PC não funciona :/
        return 0.0;
    }
    public Integer quantidadeProcessos(){
        Integer qtdProcessos = si.getOperatingSystem().getProcesses().size();
        return qtdProcessos;
    }
    
    public String bits(){
        if(cpu.	getProcessorIdentifier().isCpu64bit()){
            return "Sim";
        }
        return "não";
    }
    public String nome(){
        return cpu.getProcessorIdentifier().getName();
    }
    public double voltagem(){
        return si.getHardware().getSensors().getCpuVoltage();
    }
}
