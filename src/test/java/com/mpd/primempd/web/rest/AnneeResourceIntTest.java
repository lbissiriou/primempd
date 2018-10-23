package com.mpd.primempd.web.rest;

import com.mpd.primempd.PrimempdApp;

import com.mpd.primempd.domain.Annee;
import com.mpd.primempd.repository.AnneeRepository;
import com.mpd.primempd.service.AnneeService;
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
 * Test class for the AnneeResource REST controller.
 *
 * @see AnneeResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = PrimempdApp.class)
public class AnneeResourceIntTest {

    private static final Integer DEFAULT_CODE_ANNEE = 1;
    private static final Integer UPDATED_CODE_ANNEE = 2;

    @Autowired
    private AnneeRepository anneeRepository;
    
    @Autowired
    private AnneeService anneeService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restAnneeMockMvc;

    private Annee annee;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AnneeResource anneeResource = new AnneeResource(anneeService);
        this.restAnneeMockMvc = MockMvcBuilders.standaloneSetup(anneeResource)
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
    public static Annee createEntity(EntityManager em) {
        Annee annee = new Annee()
            .codeAnnee(DEFAULT_CODE_ANNEE);
        return annee;
    }

    @Before
    public void initTest() {
        annee = createEntity(em);
    }

    @Test
    @Transactional
    public void createAnnee() throws Exception {
        int databaseSizeBeforeCreate = anneeRepository.findAll().size();

        // Create the Annee
        restAnneeMockMvc.perform(post("/api/annees")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(annee)))
            .andExpect(status().isCreated());

        // Validate the Annee in the database
        List<Annee> anneeList = anneeRepository.findAll();
        assertThat(anneeList).hasSize(databaseSizeBeforeCreate + 1);
        Annee testAnnee = anneeList.get(anneeList.size() - 1);
        assertThat(testAnnee.getCodeAnnee()).isEqualTo(DEFAULT_CODE_ANNEE);
    }

    @Test
    @Transactional
    public void createAnneeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = anneeRepository.findAll().size();

        // Create the Annee with an existing ID
        annee.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAnneeMockMvc.perform(post("/api/annees")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(annee)))
            .andExpect(status().isBadRequest());

        // Validate the Annee in the database
        List<Annee> anneeList = anneeRepository.findAll();
        assertThat(anneeList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllAnnees() throws Exception {
        // Initialize the database
        anneeRepository.saveAndFlush(annee);

        // Get all the anneeList
        restAnneeMockMvc.perform(get("/api/annees?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(annee.getId().intValue())))
            .andExpect(jsonPath("$.[*].codeAnnee").value(hasItem(DEFAULT_CODE_ANNEE)));
    }
    
    @Test
    @Transactional
    public void getAnnee() throws Exception {
        // Initialize the database
        anneeRepository.saveAndFlush(annee);

        // Get the annee
        restAnneeMockMvc.perform(get("/api/annees/{id}", annee.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(annee.getId().intValue()))
            .andExpect(jsonPath("$.codeAnnee").value(DEFAULT_CODE_ANNEE));
    }

    @Test
    @Transactional
    public void getNonExistingAnnee() throws Exception {
        // Get the annee
        restAnneeMockMvc.perform(get("/api/annees/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAnnee() throws Exception {
        // Initialize the database
        anneeService.save(annee);

        int databaseSizeBeforeUpdate = anneeRepository.findAll().size();

        // Update the annee
        Annee updatedAnnee = anneeRepository.findById(annee.getId()).get();
        // Disconnect from session so that the updates on updatedAnnee are not directly saved in db
        em.detach(updatedAnnee);
        updatedAnnee
            .codeAnnee(UPDATED_CODE_ANNEE);

        restAnneeMockMvc.perform(put("/api/annees")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedAnnee)))
            .andExpect(status().isOk());

        // Validate the Annee in the database
        List<Annee> anneeList = anneeRepository.findAll();
        assertThat(anneeList).hasSize(databaseSizeBeforeUpdate);
        Annee testAnnee = anneeList.get(anneeList.size() - 1);
        assertThat(testAnnee.getCodeAnnee()).isEqualTo(UPDATED_CODE_ANNEE);
    }

    @Test
    @Transactional
    public void updateNonExistingAnnee() throws Exception {
        int databaseSizeBeforeUpdate = anneeRepository.findAll().size();

        // Create the Annee

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAnneeMockMvc.perform(put("/api/annees")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(annee)))
            .andExpect(status().isBadRequest());

        // Validate the Annee in the database
        List<Annee> anneeList = anneeRepository.findAll();
        assertThat(anneeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteAnnee() throws Exception {
        // Initialize the database
        anneeService.save(annee);

        int databaseSizeBeforeDelete = anneeRepository.findAll().size();

        // Get the annee
        restAnneeMockMvc.perform(delete("/api/annees/{id}", annee.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Annee> anneeList = anneeRepository.findAll();
        assertThat(anneeList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Annee.class);
        Annee annee1 = new Annee();
        annee1.setId(1L);
        Annee annee2 = new Annee();
        annee2.setId(annee1.getId());
        assertThat(annee1).isEqualTo(annee2);
        annee2.setId(2L);
        assertThat(annee1).isNotEqualTo(annee2);
        annee1.setId(null);
        assertThat(annee1).isNotEqualTo(annee2);
    }
}
