/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mycompany.exemplo.bd;

import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author Aluno
 */
public class Tecnico {
    private Integer idTecnico, fkEscola,fkGestor;

    public Integer getFkGestor() {
        return fkGestor;
    }

    public void setFkGestor(Integer fkGestor) {
        this.fkGestor = fkGestor;
    }
    private String nomeTecnico, telefoneTec, emailTec,senhaTec;

    public Integer getIdTecnico() {
        return idTecnico;
    }

    public void setIdTecnico(Integer idTecnico) {
        this.idTecnico = idTecnico;
    }

    public Integer getFkEscola() {
        return fkEscola;
    }

    public void setFkEscola(Integer fkEscola) {
        this.fkEscola = fkEscola;
    }

    public String getNomeTecnico() {
        return nomeTecnico;
    }

    public void setNomeTecnico(String nomeTecnico) {
        this.nomeTecnico = nomeTecnico;
    }

    public String getTelefoneTec() {
        return telefoneTec;
    }

    public void setTelefoneTec(String telefoneTec) {
        this.telefoneTec = telefoneTec;
    }

    public String getEmailTec() {
        return emailTec;
    }

    public void setEmailTec(String emailTec) {
        this.emailTec = emailTec;
    }

    public String getSenhaTec() {
        return senhaTec;
    }

    public void setSenhaTec(String senhaTec) {
        this.senhaTec = senhaTec;
    }

    @Override
    public String toString() {
        return "Tecnico{" + "idTecnico=" + idTecnico + ", fkEscola=" + fkEscola + ", nomeTecnico=" + nomeTecnico + ", telefoneTec=" + telefoneTec + ", emailTec=" + emailTec + ", senhaTec=" + senhaTec + '}';
//        List teste = new ArrayList();
//        teste.add(idTecnico);
//        teste.add(fkEscola);
//        teste.add(nomeTecnico);
//        teste.add(telefoneTec);
//        teste.add(emailTec);
//        teste.add(senhaTec);
//        return teste.toString(); 
    }
    
    
}
