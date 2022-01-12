/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mycompany.dotcontrolltec.computadores;

import oshi.SystemInfo;
import oshi.software.os.OSFileStore;

/**
 *
 * @author vicari
 */
public class Disco {
    
     //atributo que tem os status do Dsico Físico
    private OSFileStore disco;
    
    public Disco(){
    
        disco = new SystemInfo().getOperatingSystem().getFileSystem().getFileStores().get(0);
        
    }
    
     //traz o espaço total do seu disco(seja HD ou SSD)
    public Double qtdEspacoTotalDisco() {

        //calculo para converter  
        Double qtdDiscoGHz = disco.getTotalSpace() / Math.pow(10, 9);

        return qtdDiscoGHz;
    }

    //traz a quantidade de espaço livre no disco
    public Double qtdEspacoLivre() {

        Double qtdDiscoLivreGHz = disco.getFreeSpace() / Math.pow(10, 9);

        return qtdDiscoLivreGHz;
    }

    public Double qtdEspacoUsadoDisco() {

        return qtdEspacoTotalDisco() - qtdEspacoLivre();

    }
    public Double porcetagemDisco() {

        return (qtdEspacoUsadoDisco() * 100.0) / qtdEspacoTotalDisco();
    }
    
    public String nome(){
        return disco.getName();
    }
    
}
