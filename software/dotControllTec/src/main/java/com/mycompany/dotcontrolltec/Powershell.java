/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mycompany.dotcontrolltec;

import com.mycompany.dotcontrolltec.computadores.InformacoesSistema;
import com.mycompany.exemplo.bd.Blacklist;
import com.mycompany.exemplo.bd.Computador;
import com.mycompany.exemplo.bd.Conection;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.List;
import java.util.Scanner;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import com.mycompany.exemplo.bd.Componente;
import com.mycompany.exemplo.bd.Computador;
import com.mycompany.exemplo.bd.Tecnico;

/**
 *
 * @author gusta
 */
public class Powershell {        
        Integer fkComputador = 0;   
        Integer contador = 0;
        String NomeProcesso;
        Conection config = new Conection();
        JdbcTemplate con = new JdbcTemplate(config.getDatasource());
        Computador comp = new Computador();
        InformacoesSistema infosis = new InformacoesSistema();
        Tecnico tecnico = new Tecnico();

        

    public void encerraProcesso() throws IOException {

        String select1 = "select * from Computador where serialnum = ? and fkEscola = ?;";
        List<Computador> dadosComp = con.query(select1,new BeanPropertyRowMapper(Computador.class),infosis.serialPlacaMae(),tecnico.getFkEscola());
        for(Computador c : dadosComp){
            fkComputador = c.getIdComputador();
        };

        String select = "select b.nomeProcesso from Computador_has_Blacklist ch, Computador c, Blacklist b where c.idComputador = ? and c.idComputador = ch.fkComputador and ch.fkBlacklist = b.idBlacklist;";
        List<Blacklist> SelectProcesso = con.query(select,new BeanPropertyRowMapper(Blacklist.class),fkComputador);

        
        if(!SelectProcesso.isEmpty()){
            for (Blacklist blacklist : SelectProcesso) {
                NomeProcesso = SelectProcesso.get(contador).getNomeProcesso();
                
                System.out.println(SelectProcesso.get(contador).getNomeProcesso());
                
                Scanner scn = new Scanner(System.in);
                //String command2 = "get-process";
                String command1 = "powershell.exe ";

                String teste = NomeProcesso ;

                String command10 = "Stop-Process  -name " + teste;
                //DESINTALAR COMANDO POWERSHELL

                Process powerShellProcess = Runtime.getRuntime().exec(command1 + command10);

                System.out.println("Feito");
                contador++;
            }
        
        }
    }     
    }
        

    

 

