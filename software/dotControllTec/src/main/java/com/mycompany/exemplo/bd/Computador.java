/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mycompany.exemplo.bd;

/**
 *
 * @author Aluno
 */
public class Computador {
    private Integer idComputador, fkEscola;
    private String nomeComputador, serialnum;

    public Integer getIdComputador() {
        return idComputador;
    }

    public void setIdComputador(Integer idComputador) {
        this.idComputador = idComputador;
    }

    public Integer getFkEscola() {
        return fkEscola;
    }

    public void setFkEscola(Integer fkEscola) {
        this.fkEscola = fkEscola;
    }

    public String getNomeComputador() {
        return nomeComputador;
    }

    public void setNomeComputador(String nomeComputador) {
        this.nomeComputador = nomeComputador;
    }

    public String getSerialnum() {
        return serialnum;
    }

    public void setSerialnum(String serialnum) {
        this.serialnum = serialnum;
    }
    
    
    
    
}
