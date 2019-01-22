package com.aki.phaser.learnphaser.contorller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class FirstContorller {

    @RequestMapping(value = "/")
    public String login(){
        return "thymeleaf/learnPhaser";
    }
}
