/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mycompany.dotcontrolltec.computadores;

import java.util.List;
import oshi.SystemInfo;
import oshi.hardware.NetworkIF;
import oshi.software.os.OperatingSystem;

/**
 *
 * @author Aluno
 */
public class InformacoesSistema {
    SystemInfo si;

    public InformacoesSistema() {
        si = new SystemInfo();
    }
    
   public String getIpv4(){
    
       String a ="";
       Integer contador=0;
       Integer teste = si.getHardware().getNetworkIFs().size();
       while(contador < teste){
            for(String s: si.getHardware().getNetworkIFs().get(contador).getIPv4addr()){
                a = a+ s;
                
            }
            contador++;
       }
       return a;
   }
      public String sistemaOperacional() {

        OperatingSystem op = si.getOperatingSystem();

        String SO = op.getFamily();

        OperatingSystem.OSVersionInfo VersaoSO = op.getVersionInfo();
        
        return SO + VersaoSO;

    }
      public String serialPlacaMae(){
          return si.getHardware().getComputerSystem().getSerialNumber();
      }
    
    
}
