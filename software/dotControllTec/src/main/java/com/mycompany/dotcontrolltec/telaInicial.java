package com.mycompany.dotcontrolltec;

import com.mycompany.dotcontrolltec.computadores.Cpu;
import com.mycompany.dotcontrolltec.computadores.InformacoesSistema;
import com.mycompany.dotcontrolltec.computadores.Ram;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.swing.Timer;
import oshi.hardware.NetworkIF;

public class telaInicial extends javax.swing.JFrame {

    public telaInicial() {

        initComponents();
        this.setLocationRelativeTo(null);
   
        }
    
    
    TelaLogin irLogin = new TelaLogin();

    @SuppressWarnings("unchecked")
    // <editor-fold defaultstate="collapsed" desc="Generated Code">//GEN-BEGIN:initComponents
    private void initComponents() {

        jPanel1 = new javax.swing.JPanel();
        lblSubtitulo = new javax.swing.JLabel();
        jPanel2 = new javax.swing.JPanel();
        btnLogar = new javax.swing.JButton();

        setDefaultCloseOperation(javax.swing.WindowConstants.EXIT_ON_CLOSE);
        setTitle(".CONTROLTEC");
        setBackground(new java.awt.Color(0, 0, 0));
        addWindowListener(new java.awt.event.WindowAdapter() {
            public void windowOpened(java.awt.event.WindowEvent evt) {
                formWindowOpened(evt);
            }
        });
        getContentPane().setLayout(new org.netbeans.lib.awtextra.AbsoluteLayout());

        jPanel1.setBackground(new java.awt.Color(0, 0, 0));
        jPanel1.setLayout(new org.netbeans.lib.awtextra.AbsoluteLayout());

        lblSubtitulo.setBackground(new java.awt.Color(255, 255, 255));
        lblSubtitulo.setFont(new java.awt.Font("Franklin Gothic Medium", 1, 24)); // NOI18N
        lblSubtitulo.setForeground(new java.awt.Color(255, 255, 255));
        lblSubtitulo.setText("Mind6 Digital Solutions");
        jPanel1.add(lblSubtitulo, new org.netbeans.lib.awtextra.AbsoluteConstraints(210, 280, -1, -1));

        jPanel2.setBackground(new java.awt.Color(0, 0, 102));
        jPanel2.setBorder(new javax.swing.border.LineBorder(new java.awt.Color(0, 0, 0), 2, true));

        javax.swing.GroupLayout jPanel2Layout = new javax.swing.GroupLayout(jPanel2);
        jPanel2.setLayout(jPanel2Layout);
        jPanel2Layout.setHorizontalGroup(
            jPanel2Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGap(0, 487, Short.MAX_VALUE)
        );
        jPanel2Layout.setVerticalGroup(
            jPanel2Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGap(0, 4, Short.MAX_VALUE)
        );

        jPanel1.add(jPanel2, new org.netbeans.lib.awtextra.AbsoluteConstraints(90, 260, -1, 8));

        btnLogar.setBackground(new java.awt.Color(0, 0, 0));
        btnLogar.setFont(new java.awt.Font("Leelawadee UI", 1, 70)); // NOI18N
        btnLogar.setForeground(new java.awt.Color(255, 255, 255));
        btnLogar.setText(".CONTROLTEC");
        btnLogar.setBorder(null);
        btnLogar.setCursor(new java.awt.Cursor(java.awt.Cursor.DEFAULT_CURSOR));
        btnLogar.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                btnLogarActionPerformed(evt);
            }
        });
        jPanel1.add(btnLogar, new org.netbeans.lib.awtextra.AbsoluteConstraints(90, 160, -1, -1));

        getContentPane().add(jPanel1, new org.netbeans.lib.awtextra.AbsoluteConstraints(0, 0, 660, 500));

        pack();
    }// </editor-fold>//GEN-END:initComponents

    private void btnLogarActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_btnLogarActionPerformed
        // TODO add your handling code here:
        irLogin.show();
        this.dispose();
    }//GEN-LAST:event_btnLogarActionPerformed

    private void formWindowOpened(java.awt.event.WindowEvent evt) {//GEN-FIRST:event_formWindowOpened
        // TODO add your handling code here:
        try {
            Thread.sleep(3000);
        } catch (Exception e) {
            e.printStackTrace();
        }
        new TelaLogin().setVisible(true);
        this.dispose();
        
        
    }//GEN-LAST:event_formWindowOpened

    public static void main(String args[]) {
             new telaInicial().setVisible(true);

//        java.awt.EventQueue.invokeLater(new Runnable() {
//            public void run() {
//        
//                new telaInicial().setVisible(true);
//                Cpu cpu= new Cpu(); 
//                InformacoesSistema is = new InformacoesSistema();
//          
//                System.out.println("cpu: "+ cpu.voltagem());
//               
//
//            }
//        });
    }

    // Variables declaration - do not modify//GEN-BEGIN:variables
    private javax.swing.JButton btnLogar;
    private javax.swing.JPanel jPanel1;
    private javax.swing.JPanel jPanel2;
    private javax.swing.JLabel lblSubtitulo;
    // End of variables declaration//GEN-END:variables
}
