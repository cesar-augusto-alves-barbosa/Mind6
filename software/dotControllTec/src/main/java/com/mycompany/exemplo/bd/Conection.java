/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mycompany.exemplo.bd;

import org.apache.commons.dbcp2.BasicDataSource;

/**
 *
 * @author Aluno
 */
public class Conection {

    private final BasicDataSource datasource;
       // Construtor
    public Conection() {
        this.datasource = new BasicDataSource();
        this.datasource.setDriverClassName("com.mysql.cj.jdbc.Driver");
        this.datasource.setUrl("jdbc:mysql://localhost:3306/mindone");
        this.datasource.setUsername("root");
        this.datasource.setPassword("root");
    }
    
    
    // Getter

    public BasicDataSource getDatasource() {
        return datasource;
    }
}
