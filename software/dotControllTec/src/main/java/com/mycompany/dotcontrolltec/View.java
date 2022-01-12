/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mycompany.dotcontrolltec;

import com.mycompany.dotcontrolltec.computadores.Cpu;
import com.mycompany.dotcontrolltec.computadores.Disco;
import com.mycompany.dotcontrolltec.computadores.InformacoesSistema;
import com.mycompany.dotcontrolltec.computadores.Ram;
import com.mycompany.exemplo.bd.Componente;
import com.mycompany.exemplo.bd.Computador;
import com.mycompany.exemplo.bd.Conection;
import com.mycompany.exemplo.bd.Tecnico;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Scanner;
import javax.swing.Timer;
import org.springframework.jdbc.core.BeanPropertyRowMapper;

import org.springframework.jdbc.core.JdbcTemplate;
import oshi.hardware.NetworkIF;

/**
 *
 * @author Aluno
 */
public class View {

    public static void main(String[] args) {
        Scanner leitor = new Scanner(System.in);
        Scanner leitor2 = new Scanner(System.in);
        Scanner leitor3 = new Scanner(System.in);
        Cpu cpu = new Cpu();
        Ram ram = new Ram();
        Disco disco = new Disco();
        Tecnico tecnico = new Tecnico();
        InformacoesSistema is = new InformacoesSistema();
        Conection config = new Conection();
        JdbcTemplate con = new JdbcTemplate(config.getDatasource());

        Integer fkComputador = null, fkDisco = null, fkRam = 0, fkCpu= null;
        String serial = is.getIpv4();
        Boolean tecnicoLogado = false;
        
        System.out.println(cpu.porcetagemDeUso());
        System.out.println(ram.porcetagemDeMemoria());
        System.out.println(disco.porcetagemDisco());
        
        System.out.println("Digite seu email: ");
        String email = leitor.nextLine();
        System.out.println("Digite sua senha: ");
        String senha = leitor2.nextLine();

        String select = "select * from Tecnico where emailTec = ? and senhaTec = ?;";
        List<Tecnico> loginTecnico = con.query(select, new BeanPropertyRowMapper(Tecnico.class), email, senha);

        while (loginTecnico.isEmpty()) {
            System.out.println("Login incorreto!");
            System.out.println("Digite seu email: ");
            email = leitor.nextLine();
            System.out.println("Digite sua senha: ");
            senha = leitor2.nextLine();

            select = "select * from Tecnico where emailTec = ? and senhaTec = ?;";
            loginTecnico = con.query(select, new BeanPropertyRowMapper(Tecnico.class), email, senha);
        }

        if (!loginTecnico.isEmpty()) {
            for (Tecnico t : loginTecnico) {
                tecnico.setEmailTec(t.getEmailTec());
                tecnico.setFkEscola(t.getFkEscola());
                tecnico.setIdTecnico(t.getIdTecnico());
                tecnico.setNomeTecnico(t.getNomeTecnico());
                tecnico.setSenhaTec(t.getSenhaTec());
                tecnico.setTelefoneTec(t.getTelefoneTec());

            }
            select = "select * from Computador where serialnum = ?;";
            List<Computador> dadosComp = con.query(select, new BeanPropertyRowMapper(Computador.class), is.getIpv4());

            if (dadosComp.isEmpty()) {
                //cadastro da maquina
                System.out.println("Cadastrando maquina!...");
                con.update("insert into Computador values(?,?,?,1,?)", "Computador_" + serial, tecnico.getFkEscola(), is.sistemaOperacional(), serial);

                //pegando id da maquina
                select = "select * from Computador where serialnum = ?;";
                dadosComp = con.query(select, new BeanPropertyRowMapper(Computador.class), is.getIpv4());
                for (Computador c : dadosComp) {
                    fkComputador = c.getIdComputador();
                }

                //cadastrando componentes da maquina
                System.out.println("Cadastrando componentes da maquina maquina!...");
                con.update("insert into Componente values(?,'DISCO',?)", disco.nome(), fkComputador);
                try{
                    con.update("insert into Componente values(?,'RAM',?)", ram.tipoMemoria(), fkComputador);
                }catch(Exception e){
                    con.update("insert into Componente values(?,'RAM',?)", "ramteste", fkComputador);
                }
                
                con.update("insert into Componente values(?,'CPU',?)", cpu.nome(), fkComputador);

                //pegando o id de cada componente da maquina
                select = "select * from Componente where fkComputador = ?;";
                List<Componente> dadosComponente = con.query(select, new BeanPropertyRowMapper(Componente.class), fkComputador);
                fkDisco = dadosComponente.get(0).getIdComponente();
                fkCpu = dadosComponente.get(2).getIdComponente();
                fkRam = dadosComponente.get(1).getIdComponente();
                tecnicoLogado = true;

            } else {
                //pegando o id de cada componente da maquina
                System.out.println("Carregando dados da maquina!...");
                select = "select * from Componente where fkComputador = ?;";
                List<Componente> dadosComponente = con.query(select, new BeanPropertyRowMapper(Componente.class), dadosComp.get(0).getIdComputador());
                fkDisco = dadosComponente.get(0).getIdComponente();
                fkRam = dadosComponente.get(1).getIdComponente();
                fkCpu = dadosComponente.get(2).getIdComponente();
                tecnicoLogado = true;

            }
        }
        if (tecnicoLogado) {
            System.out.println("-------------------------------------------------");
            System.out.println("            Configurações da maquina             ");
            System.out.println("-------------------------------------------------");
            System.out.println("Sistema operacional: " + is.sistemaOperacional());
            try{
                System.out.println("Tipo de memoria: " + ram.tipoMemoria());
            }catch(Exception e){
                
            }
            //
            System.out.println("Nome da cpu: " + cpu.nome());
            System.out.println("Nome do disco: " + disco.nome());
            System.out.println("-------------------------------------------------");
            System.out.println("Gravando dados no banco...");
            Integer fkRam1 = fkRam;
            Integer fkDisco1 = fkDisco;
            Integer fkCpu1 = fkCpu;
            Double usoCpu = cpu.porcetagemDeUso(),usoDisco =disco.porcetagemDisco(), usoRam = ram.porcetagemDeMemoria();
            
            ActionListener acao = (ActionEvent executar) -> {
                
                con.update("insert into UsoTotal values(?,?,?)",usoCpu,LocalDateTime.now(), fkCpu1);
                con.update("insert into UsoTotal values(?,?,?)",usoDisco,LocalDateTime.now() ,fkDisco1);
                con.update("insert into UsoTotal values(?,?,?)",usoRam,LocalDateTime.now() , fkRam1);
                System.out.println("-------------------------------------------------");
                System.out.println("                   Dados atuais                  ");
                System.out.println("-------------------------------------------------");
                System.out.println("Porcentagem de uso da cpu: " + usoCpu);
                System.out.println("POrcentagem de uso da ram: " + usoRam);
                System.out.println("POrcentagem de uso do disco: " + usoDisco);
                System.out.println("-------------------------------------------------");
                System.out.println("Digite CTRL + C para parar!");
            };
            Timer tempo = new Timer(5000, acao);

            //iniciar o temporizador
            tempo.start();
            
            while(true){
                tempo.start();                
            }
            
           

        
        
            
            
            
            
        }

    }
}
































///*
// * To change this license header, choose License Headers in Project Properties.
// * To change this template file, choose Tools | Templates
// * and open the template in the editor.
// */
//package com.mycompany.dotcontrolltec;
//
//import com.mycompany.dotcontrolltec.computadores.Cpu;
//import com.mycompany.dotcontrolltec.computadores.Disco;
//import com.mycompany.dotcontrolltec.computadores.InformacoesSistema;
//import com.mycompany.dotcontrolltec.computadores.Ram;
//import com.mycompany.exemplo.bd.Componente;
//import com.mycompany.exemplo.bd.Computador;
//import com.mycompany.exemplo.bd.Conection;
//import com.mycompany.exemplo.bd.Tecnico;
//import java.awt.event.ActionEvent;
//import java.awt.event.ActionListener;
//import java.time.LocalDateTime;
//import java.util.List;
//import java.util.Scanner;
//import javax.swing.Timer;
//import org.springframework.jdbc.core.BeanPropertyRowMapper;
//
//import org.springframework.jdbc.core.JdbcTemplate;
//
///**
// *
// * @author Aluno
// */
//public class View {
//
//    public static void main(String[] args) {
//        Scanner leitor = new Scanner(System.in);
//        Scanner leitor2 = new Scanner(System.in);
//        Scanner leitor3 = new Scanner(System.in);
//        Cpu cpu = new Cpu();
//        Ram ram = new Ram();
//        Disco disco = new Disco();
//        Tecnico tecnico = new Tecnico();
//        InformacoesSistema is = new InformacoesSistema();
//        Conection config = new Conection();
//        JdbcTemplate con = new JdbcTemplate(config.getDatasource());
//
//        Integer fkComputador = null, fkDisco = null, fkRam = 0, fkCpu= null;
//        String serial = cpu.id();
//        Boolean tecnicoLogado = false;
//        
//        
//        System.out.println("Digite seu email: ");
//        String email = leitor.nextLine();
//        System.out.println("Digite sua senha: ");
//        String senha = leitor2.nextLine();
//
//        String select = "select * from Tecnico where emailTec = ? and senhaTec = ?;";
//        List<Tecnico> loginTecnico = con.query(select, new BeanPropertyRowMapper(Tecnico.class), email, senha);
//
//        while (loginTecnico.isEmpty()) {
//            System.out.println("Login incorreto!");
//            System.out.println("Digite seu email: ");
//            email = leitor.nextLine();
//            System.out.println("Digite sua senha: ");
//            senha = leitor2.nextLine();
//
//            select = "select * from Tecnico where emailTec = ? and senhaTec = ?;";
//            loginTecnico = con.query(select, new BeanPropertyRowMapper(Tecnico.class), email, senha);
//        }
//
//        if (!loginTecnico.isEmpty()) {
//            for (Tecnico t : loginTecnico) {
//                tecnico.setEmailTec(t.getEmailTec());
//                tecnico.setFkEscola(t.getFkEscola());
//                tecnico.setIdTecnico(t.getIdTecnico());
//                tecnico.setNomeTecnico(t.getNomeTecnico());
//                tecnico.setSenhaTec(t.getSenhaTec());
//                tecnico.setTelefoneTec(t.getTelefoneTec());
//
//            }
//            select = "select * from Computador where serialnum = ?;";
//            List<Computador> dadosComp = con.query(select, new BeanPropertyRowMapper(Computador.class), cpu.id());
//
//            if (dadosComp.isEmpty()) {
//                //cadastro da maquina
//                System.out.println("Cadastrando maquina!...");
//                con.update("insert into Computador values(?,?,?,1,?)", "Computador_" + serial, tecnico.getFkEscola(), is.sistemaOperacional(), serial);
//
//                //pegando id da maquina
//                select = "select * from Computador where serialnum = ?;";
//                dadosComp = con.query(select, new BeanPropertyRowMapper(Computador.class), cpu.id());
//                for (Computador c : dadosComp) {
//                    fkComputador = c.getIdComputador();
//                }
//
//                //cadastrando componentes da maquina
//                System.out.println("Cadastrando componentes da maquina maquina!...");
//                con.update("insert into Componente values(?,'DISCO',?)", disco.nome(), fkComputador);
//                //con.update("insert into Componente values(?,'RAM',?)", ram.tipoMemoria(), fkComputador);
//                con.update("insert into Componente values(?,'CPU',?)", cpu.nome(), fkComputador);
//
//                //pegando o id de cada componente da maquina
//                select = "select * from Componente where fkComputador = ?;";
//                List<Componente> dadosComponente = con.query(select, new BeanPropertyRowMapper(Componente.class), fkComputador);
//                fkDisco = dadosComponente.get(0).getIdComponente();
//                fkCpu = dadosComponente.get(1).getIdComponente();
//                
//                tecnicoLogado = true;
//
//            } else {
//                //pegando o id de cada componente da maquina
//                System.out.println("Carregando dados da maquina!...");
//                select = "select * from Componente where fkComputador = ?;";
//                List<Componente> dadosComponente = con.query(select, new BeanPropertyRowMapper(Componente.class), dadosComp.get(0).getIdComputador());
//                fkDisco = dadosComponente.get(0).getIdComponente();
//                //fkRam = dadosComponente.get(1).getIdComponente();
//                fkCpu = dadosComponente.get(1).getIdComponente();
//                tecnicoLogado = true;
//
//            }
//        }
//        if (tecnicoLogado) {
//            System.out.println("-------------------------------------------------");
//            System.out.println("            Configurações da maquina             ");
//            System.out.println("-------------------------------------------------");
//            System.out.println("Sistema operacional: " + is.sistemaOperacional());
//            //System.out.println("Tipo de memoria: " + ram.tipoMemoria());
//            System.out.println("Nome da cpu: " + cpu.nome());
//            System.out.println("Nome do disco: " + disco.nome());
//            System.out.println("-------------------------------------------------");
//            System.out.println("Gravando dados no banco...");
//            Integer fkRam1 = fkRam;
//            Integer fkDisco1 = fkDisco;
//            Integer fkCpu1 = fkCpu;
//            
//            
//            ActionListener acao = (ActionEvent executar) -> {
//                con.update("insert into UsoTotal values(?,?,?)",cpu.porcetagemDeUso(),LocalDateTime.now(), fkCpu1);
//                con.update("insert into UsoTotal values(?,?,?)",disco.porcetagemDisco(),LocalDateTime.now() ,fkDisco1);
//                //con.update("insert into UsoTotal values(?,?,?)",ram.porcetagemDeMemoria(),LocalDateTime.now() , fkRam1);
//                System.out.println("-------------------------------------------------");
//                System.out.println("                   Dados atuais                  ");
//                System.out.println("-------------------------------------------------");
//                System.out.println("Porcentagem de uso da cpu: " + cpu.porcetagemDeUso());
//                //System.out.println("POrcentagem de uso da ram: " + ram.porcetagemDeMemoria());
//                System.out.println("POrcentagem de uso do disco: " + disco.porcetagemDisco());
//                System.out.println("-------------------------------------------------");
//                System.out.println("Digite CTRL + C para parar!");
//            };
//            Timer tempo = new Timer(5000, acao);
//
//            //iniciar o temporizador
//            tempo.start();
//            
//            while(true){
//                tempo.start();                
//            }
//            
//           
//
//        
//        
//            
//            
//            
//            
//        }
//
//    }
//}
