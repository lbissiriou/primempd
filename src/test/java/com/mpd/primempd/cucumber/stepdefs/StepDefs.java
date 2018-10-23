package com.mpd.primempd.cucumber.stepdefs;

import com.mpd.primempd.PrimempdApp;

import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.ResultActions;

import org.springframework.boot.test.context.SpringBootTest;

@WebAppConfiguration
@SpringBootTest
@ContextConfiguration(classes = PrimempdApp.class)
public abstract class StepDefs {

    protected ResultActions actions;

}
