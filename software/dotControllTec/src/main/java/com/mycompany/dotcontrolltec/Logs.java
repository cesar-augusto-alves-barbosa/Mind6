/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mycompany.dotcontrolltec;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.time.LocalDateTime;

/**
 *
 * @author Aluno
 */
public class Logs {
    String nome_arquivo;
    LocalDateTime dataAtual; 
    File arquivo;
    File diretorio;

    public Logs() {
        
    }
    public void gerar_Log(String texto) throws IOException{
        diretorio = new File("C:\\Mind6_logs");
        if(!diretorio.exists()){
            diretorio.mkdir();
        }
        dataAtual = LocalDateTime.now();
        this.nome_arquivo = "Mind6_"+ dataAtual.getDayOfMonth() +"_" + dataAtual.getMonthValue()+"_"+dataAtual.getYear();
        arquivo = new File("C:\\Mind6_logs\\"+nome_arquivo+".txt");
       
        if(!arquivo.exists()){
            arquivo.createNewFile();            
        }
        
        
        FileWriter fw = new FileWriter(arquivo,true); 
        BufferedWriter bw = new BufferedWriter( fw ) ;
        if(arquivo.length() == 0){
            bw.write("---------- Logs mind6 ----------");
            bw.newLine();
        }
//        if(arquivo.){
//            bw.write("aaaaaaaaaaaaaaaaaaaaaaaaa");
//        }
        bw.newLine();
        bw.write(texto);
        
        bw.close();
        fw.close();
        
        
    }
 
  
}
