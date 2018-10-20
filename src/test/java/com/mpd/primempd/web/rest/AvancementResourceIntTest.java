package com.mpd.primempd.web.rest;

import com.mpd.primempd.PrimempdApp;

import com.mpd.primempd.domain.Avancement;
import com.mpd.primempd.repository.AvancementRepository;
import com.mpd.primempd.service.AvancementService;
import com.mpd.primempd.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;


import static com.mpd.primempd.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the AvancementResource REST controller.
 *
 * @see AvancementResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = PrimempdApp.class)
public class AvancementResourceIntTest {

    private static final Instant DEFAULT_DATE_DEBUT = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATE_DEBUT = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_DATE_FIN = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATE_FIN = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private AvancementRepository avancementRepository;
    
    @Autowired
    private AvancementService avancementService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restAvancementMockMvc;

    private Avancement avancement;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AvancementResource avancementResource = new AvancementResource(avancementService);
        this.restAvancementMockMvc = MockMvcBuilders.standaloneSetup(avancementResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Avancement createEntity(EntityManager em) {
        Avancement avancement = new Avancement()
            .dateDebut(DEFAULT_DATE_DEBUT)
            .dateFin(DEFAULT_DATE_FIN);
        return avancement;
    }

    @Before
    public void initTest() {
        avancement = createEntity(em);
    }

    @Test
    @Transactional
    public void createAvancement() throws Exception {
        int databaseSizeBeforeCreate = avancementRepository.findAll().size();

        // Create the Avancement
        restAvancementMockMvc.perform(post("/api/avancements")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(avancement)))
            .andExpect(status().isCreated());

        // Validate the Avancement in the database
        List<Avancement> avancementList = avancementRepository.findAll();
        assertThat(avancementList).hasSize(databaseSizeBeforeCreate + 1);
        Avancement testAvancement = avancementList.get(avancementList.size() - 1);
        assertThat(testAvancement.getDateDebut()).isEqualTo(DEFAULT_DATE_DEBUT);
        assertThat(testAvancement.getDateFin()).isEqualTo(DEFAULT_DATE_FIN);
    }

    @Test
    @Transactional
    public void createAvancementWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = avancementRepository.findAll().size();

        // Create the Avancement with an existing ID
        avancement.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAvancementMockMvc.perform(post("/api/avancements")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(avancement)))
            .andExpect(status().isBadRequest());

        // Validate the Avancement in the database
        List<Avancement> avancementList = avancementRepository.findAll();
        assertThat(avancementList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllAvancements() throws Exception {
        // Initialize the database
        avancementRepository.saveAndFlush(avancement);

        // Get all the avancementList
        restAvancementMockMvc.perform(get("/api/avancements?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(avancement.getId().intValue())))
            .andExpect(jsonPath("$.[*].dateDebut").value(hasItem(DEFAULT_DATE_DEBUT.toString())))
            .andExpect(jsonPath("$.[*].dateFin").value(hasItem(DEFAULT_DATE_FIN.toString())));
    }
    
    @Test
    @Transactional
    public void getAvancement() throws Exception {
        // Initialize the database
        avancementRepository.saveAndFlush(avancement);

        // Get the avancement
        restAvancementMockMvc.perform(get("/api/avancements/{id}", avancement.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(avancement.getId().intValue()))
            .andExpect(jsonPath("$.dateDebut").value(DEFAULT_DATE_DEBUT.toString()))
            .andExpect(jsonPath("$.dateFin").value(DEFAULT_DATE_FIN.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingAvancement() throws Exception {
        // Get the avancement
        restAvancementMockMvc.perform(get("/api/avancements/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAvancement() throws Exception {
        // Initialize the database
        avancementService.save(avancement);

        int databaseSizeBeforeUpdate = avancementRepository.findAll().size();

        // Update the avancement
        Avancement updatedAvancement = avancementRepository.findById(avancement.getId()).get();
        // Disconnect from session so that the updates on updatedAvancement are not directly saved in db
        em.detach(updatedAvancement);
        updatedAvancement
            .dateDebut(UPDATED_DATE_DEBUT)
            .dateFin(UPDATED_DATE_FIN);

        restAvancementMockMvc.perform(put("/api/avancements")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedAvancement)))
            .andExpect(status().isOk());

        // Validate the Avancement in the database
        List<Avancement> avancementList = avancementRepository.findAll();
        assertThat(avancementList).hasSize(databaseSizeBeforeUpdate);
        Avancement testAvancement = avancementList.get(avancementList.size() - 1);
        assertThat(testAvancement.getDateDebut()).isEqualTo(UPDATED_DATE_DEBUT);
        assertThat(testAvancement.getDateFin()).isEqualTo(UPDATED_DATE_FIN);
    }

    @Test
    @Transactional
    public void updateNonExistingAvancement() throws Exception {
        int databaseSizeBeforeUpdate = avancementRepository.findAll().size();

        // Create the Avancement

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAvancementMockMvc.perform(put("/api/avancements")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(avancement)))
            .andExpect(status().isBadRequest());

        // Validate the Avancement in the database
        List<Avancement> avancementList = avancementRepository.findAll();
        assertThat(avancementList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteAvancement() throws Exception {
        // Initialize the database
        avancementService.save(avancement);

        int databaseSizeBeforeDelete = avancementRepository.findAll().size();

        // Get the avancement
        restAvancementMockMvc.perform(delete("/api/avancements/{id}", avancement.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Avancement> avancementList = avancementRepository.findAll();
        assertThat(avancementList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Avancement.class);
        Avancement avancement1 = new Avancement();
        avancement1.setId(1L);
        Avancement avancement2 = new Avancement();
        avancement2.setId(avancement1.getId());
        assertThat(avancement1).isEqualTo(avancement2);
        avancement2.setId(2L);
        assertThat(avancement1).isNotEqualTo(avancement2);
        avancement1.setId(null);
        assertThat(avancement1).isNotEqualTo(avancement2);
    }
}
