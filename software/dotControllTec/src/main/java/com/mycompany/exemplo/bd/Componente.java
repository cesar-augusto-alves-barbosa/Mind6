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
public class Componente {
    private Integer idComponente, fkComputador;
    private String nomeComponente, tipoComponente;

    public Integer getIdComponente() {
        return idComponente;
    }

    public void setIdComponente(Integer idComponete) {
        this.idComponente = idComponete;
    }

    public Integer getFkComputador() {
        return fkComputador;
    }

    public void setFkComputador(Integer fkComputador) {
        this.fkComputador = fkComputador;
    }

    public String getNomeComponente() {
        return nomeComponente;
    }

    public void setNomeComponente(String nomeComponente) {
        this.nomeComponente = nomeComponente;
    }

    public String getTipoComponente() {
        return tipoComponente;
    }

    public void setTipoComponente(String tipoComponente) {
        this.tipoComponente = tipoComponente;
    }
    
    
}
