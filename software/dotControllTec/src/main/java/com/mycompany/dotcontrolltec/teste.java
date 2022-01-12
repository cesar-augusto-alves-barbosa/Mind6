/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mycompany.dotcontrolltec;

import com.mycompany.dotcontrolltec.computadores.InformacoesSistema;
import java.io.IOException;
import oshi.SystemInfo;

/**
 *
 * @author Aluno
 */
public class teste {
    public static void main(String[] args) throws IOException {
        
        InformacoesSistema infosis = new InformacoesSistema();
     
        
        System.out.println(infosis.serialPlacaMae());

        
    }
}
