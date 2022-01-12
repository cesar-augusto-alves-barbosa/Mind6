/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mycompany.dotcontrolltec;

import java.io.IOException;
import org.json.JSONObject;

public class TesteSlack {

    public static void main(String[] args) throws IOException, InterruptedException, Exception {
        
        Slack slack = new Slack();
        JSONObject json = new JSONObject();
        
        json.put("text", "é foda? :shrug:");
        
        slack.sendMessage(json);
    }
}
