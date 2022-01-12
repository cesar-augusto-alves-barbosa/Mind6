/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mycompany.dotcontrolltec.computadores;

import java.awt.Color;
import java.text.DecimalFormat;
import javax.swing.JPanel;
import javax.swing.JTabbedPane;
import org.jfree.chart.ChartFactory;
import org.jfree.chart.ChartFrame;
import org.jfree.chart.ChartPanel;
import org.jfree.chart.JFreeChart;
import org.jfree.chart.labels.StandardCategoryItemLabelGenerator;
import org.jfree.chart.plot.CategoryPlot;
import org.jfree.chart.plot.PlotOrientation;
import org.jfree.chart.renderer.category.LineAndShapeRenderer;
import org.jfree.data.category.DefaultCategoryDataset;
import org.jfree.data.general.DefaultPieDataset;

/**
 *
 * @author Aluno
 */
public class Grafico {


    public void GraficoLinha(DefaultCategoryDataset dados, String titulo, String tituloLateral, String tituloBaixo, JPanel painel) {
        JFreeChart grafico = ChartFactory.createLineChart(titulo, tituloLateral, tituloBaixo, dados, PlotOrientation.VERTICAL, true, true, false);
        CategoryPlot plot = grafico.getCategoryPlot();
        final LineAndShapeRenderer renderer = (LineAndShapeRenderer) plot.getRenderer();
//        plot.setBackgroundPaint(Color.BLACK);
        renderer.setSeriesPaint(0, Color.BLUE);
        renderer.setSeriesShapesVisible(0, true);



        ChartPanel painelGrafico = new ChartPanel(grafico);
        painelGrafico.setSize(painel.getWidth(), painel.getHeight());
        painel.add(painelGrafico);
    }

    public void GraficoDunuts(DefaultPieDataset dados, String titulo, JPanel painel) {
        JFreeChart grafico = ChartFactory.createRingChart(titulo, dados, true, true, false);
        grafico.setTextAntiAlias(true);
       

        ChartPanel painelGrafico = new ChartPanel(grafico);
        painelGrafico.setSize(painel.getWidth(), painel.getHeight());
        painel.removeAll();
        painel.add(painelGrafico);

    }
}
