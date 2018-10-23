package com.mpd.primempd.web.rest;

import com.mpd.primempd.PrimempdApp;

import com.mpd.primempd.domain.Fonction;
import com.mpd.primempd.repository.FonctionRepository;
import com.mpd.primempd.service.FonctionService;
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
import java.util.List;


import static com.mpd.primempd.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the FonctionResource REST controller.
 *
 * @see FonctionResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = PrimempdApp.class)
public class FonctionResourceIntTest {

    private static final String DEFAULT_TITRE = "AAAAAAAAAA";
    private static final String UPDATED_TITRE = "BBBBBBBBBB";

    @Autowired
    private FonctionRepository fonctionRepository;
    
    @Autowired
    private FonctionService fonctionService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restFonctionMockMvc;

    private Fonction fonction;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final FonctionResource fonctionResource = new FonctionResource(fonctionService);
        this.restFonctionMockMvc = MockMvcBuilders.standaloneSetup(fonctionResource)
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
    public static Fonction createEntity(EntityManager em) {
        Fonction fonction = new Fonction()
            .titre(DEFAULT_TITRE);
        return fonction;
    }

    @Before
    public void initTest() {
        fonction = createEntity(em);
    }

    @Test
    @Transactional
    public void createFonction() throws Exception {
        int databaseSizeBeforeCreate = fonctionRepository.findAll().size();

        // Create the Fonction
        restFonctionMockMvc.perform(post("/api/fonctions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(fonction)))
            .andExpect(status().isCreated());

        // Validate the Fonction in the database
        List<Fonction> fonctionList = fonctionRepository.findAll();
        assertThat(fonctionList).hasSize(databaseSizeBeforeCreate + 1);
        Fonction testFonction = fonctionList.get(fonctionList.size() - 1);
        assertThat(testFonction.getTitre()).isEqualTo(DEFAULT_TITRE);
    }

    @Test
    @Transactional
    public void createFonctionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = fonctionRepository.findAll().size();

        // Create the Fonction with an existing ID
        fonction.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restFonctionMockMvc.perform(post("/api/fonctions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(fonction)))
            .andExpect(status().isBadRequest());

        // Validate the Fonction in the database
        List<Fonction> fonctionList = fonctionRepository.findAll();
        assertThat(fonctionList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllFonctions() throws Exception {
        // Initialize the database
        fonctionRepository.saveAndFlush(fonction);

        // Get all the fonctionList
        restFonctionMockMvc.perform(get("/api/fonctions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(fonction.getId().intValue())))
            .andExpect(jsonPath("$.[*].titre").value(hasItem(DEFAULT_TITRE.toString())));
    }
    
    @Test
    @Transactional
    public void getFonction() throws Exception {
        // Initialize the database
        fonctionRepository.saveAndFlush(fonction);

        // Get the fonction
        restFonctionMockMvc.perform(get("/api/fonctions/{id}", fonction.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(fonction.getId().intValue()))
            .andExpect(jsonPath("$.titre").value(DEFAULT_TITRE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingFonction() throws Exception {
        // Get the fonction
        restFonctionMockMvc.perform(get("/api/fonctions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateFonction() throws Exception {
        // Initialize the database
        fonctionService.save(fonction);

        int databaseSizeBeforeUpdate = fonctionRepository.findAll().size();

        // Update the fonction
        Fonction updatedFonction = fonctionRepository.findById(fonction.getId()).get();
        // Disconnect from session so that the updates on updatedFonction are not directly saved in db
        em.detach(updatedFonction);
        updatedFonction
            .titre(UPDATED_TITRE);

        restFonctionMockMvc.perform(put("/api/fonctions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedFonction)))
            .andExpect(status().isOk());

        // Validate the Fonction in the database
        List<Fonction> fonctionList = fonctionRepository.findAll();
        assertThat(fonctionList).hasSize(databaseSizeBeforeUpdate);
        Fonction testFonction = fonctionList.get(fonctionList.size() - 1);
        assertThat(testFonction.getTitre()).isEqualTo(UPDATED_TITRE);
    }

    @Test
    @Transactional
    public void updateNonExistingFonction() throws Exception {
        int databaseSizeBeforeUpdate = fonctionRepository.findAll().size();

        // Create the Fonction

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restFonctionMockMvc.perform(put("/api/fonctions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(fonction)))
            .andExpect(status().isBadRequest());

        // Validate the Fonction in the database
        List<Fonction> fonctionList = fonctionRepository.findAll();
        assertThat(fonctionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteFonction() throws Exception {
        // Initialize the database
        fonctionService.save(fonction);

        int databaseSizeBeforeDelete = fonctionRepository.findAll().size();

        // Get the fonction
        restFonctionMockMvc.perform(delete("/api/fonctions/{id}", fonction.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Fonction> fonctionList = fonctionRepository.findAll();
        assertThat(fonctionList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Fonction.class);
        Fonction fonction1 = new Fonction();
        fonction1.setId(1L);
        Fonction fonction2 = new Fonction();
        fonction2.setId(fonction1.getId());
        assertThat(fonction1).isEqualTo(fonction2);
        fonction2.setId(2L);
        assertThat(fonction1).isNotEqualTo(fonction2);
        fonction1.setId(null);
        assertThat(fonction1).isNotEqualTo(fonction2);
    }
}
