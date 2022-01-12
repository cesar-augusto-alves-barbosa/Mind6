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
        this.datasource.setDriverClassName("com.microsoft.sqlserver.jdbc.SQLServerDriver");
        this.datasource.setUrl("jdbc:sqlserver://mind6.database.windows.net:1433;database=bddotControlTec;user=adm@mind6;password={your_password_here};encrypt=true;trustServerCertificate=false;hostNameInCertificate=*.database.windows.net;loginTimeout=30;");
        this.datasource.setUsername("adm");
        this.datasource.setPassword("#Gfgrupo4");
    }
    
    
    // Getter

    public BasicDataSource getDatasource() {
        return datasource;
    }
}
