package com.mpd.primempd.web.rest;

import com.mpd.primempd.PrimempdApp;

import com.mpd.primempd.domain.Trimestre;
import com.mpd.primempd.repository.TrimestreRepository;
import com.mpd.primempd.service.TrimestreService;
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
 * Test class for the TrimestreResource REST controller.
 *
 * @see TrimestreResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = PrimempdApp.class)
public class TrimestreResourceIntTest {

    private static final Integer DEFAULT_CODE_TRIMESTRE = 1;
    private static final Integer UPDATED_CODE_TRIMESTRE = 2;

    private static final String DEFAULT_TRIMESTRE = "AAAAAAAAAA";
    private static final String UPDATED_TRIMESTRE = "BBBBBBBBBB";

    @Autowired
    private TrimestreRepository trimestreRepository;
    
    @Autowired
    private TrimestreService trimestreService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restTrimestreMockMvc;

    private Trimestre trimestre;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TrimestreResource trimestreResource = new TrimestreResource(trimestreService);
        this.restTrimestreMockMvc = MockMvcBuilders.standaloneSetup(trimestreResource)
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
    public static Trimestre createEntity(EntityManager em) {
        Trimestre trimestre = new Trimestre()
            .codeTrimestre(DEFAULT_CODE_TRIMESTRE)
            .trimestre(DEFAULT_TRIMESTRE);
        return trimestre;
    }

    @Before
    public void initTest() {
        trimestre = createEntity(em);
    }

    @Test
    @Transactional
    public void createTrimestre() throws Exception {
        int databaseSizeBeforeCreate = trimestreRepository.findAll().size();

        // Create the Trimestre
        restTrimestreMockMvc.perform(post("/api/trimestres")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(trimestre)))
            .andExpect(status().isCreated());

        // Validate the Trimestre in the database
        List<Trimestre> trimestreList = trimestreRepository.findAll();
        assertThat(trimestreList).hasSize(databaseSizeBeforeCreate + 1);
        Trimestre testTrimestre = trimestreList.get(trimestreList.size() - 1);
        assertThat(testTrimestre.getCodeTrimestre()).isEqualTo(DEFAULT_CODE_TRIMESTRE);
        assertThat(testTrimestre.getTrimestre()).isEqualTo(DEFAULT_TRIMESTRE);
    }

    @Test
    @Transactional
    public void createTrimestreWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = trimestreRepository.findAll().size();

        // Create the Trimestre with an existing ID
        trimestre.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTrimestreMockMvc.perform(post("/api/trimestres")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(trimestre)))
            .andExpect(status().isBadRequest());

        // Validate the Trimestre in the database
        List<Trimestre> trimestreList = trimestreRepository.findAll();
        assertThat(trimestreList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllTrimestres() throws Exception {
        // Initialize the database
        trimestreRepository.saveAndFlush(trimestre);

        // Get all the trimestreList
        restTrimestreMockMvc.perform(get("/api/trimestres?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(trimestre.getId().intValue())))
            .andExpect(jsonPath("$.[*].codeTrimestre").value(hasItem(DEFAULT_CODE_TRIMESTRE)))
            .andExpect(jsonPath("$.[*].trimestre").value(hasItem(DEFAULT_TRIMESTRE.toString())));
    }
    
    @Test
    @Transactional
    public void getTrimestre() throws Exception {
        // Initialize the database
        trimestreRepository.saveAndFlush(trimestre);

        // Get the trimestre
        restTrimestreMockMvc.perform(get("/api/trimestres/{id}", trimestre.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(trimestre.getId().intValue()))
            .andExpect(jsonPath("$.codeTrimestre").value(DEFAULT_CODE_TRIMESTRE))
            .andExpect(jsonPath("$.trimestre").value(DEFAULT_TRIMESTRE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingTrimestre() throws Exception {
        // Get the trimestre
        restTrimestreMockMvc.perform(get("/api/trimestres/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTrimestre() throws Exception {
        // Initialize the database
        trimestreService.save(trimestre);

        int databaseSizeBeforeUpdate = trimestreRepository.findAll().size();

        // Update the trimestre
        Trimestre updatedTrimestre = trimestreRepository.findById(trimestre.getId()).get();
        // Disconnect from session so that the updates on updatedTrimestre are not directly saved in db
        em.detach(updatedTrimestre);
        updatedTrimestre
            .codeTrimestre(UPDATED_CODE_TRIMESTRE)
            .trimestre(UPDATED_TRIMESTRE);

        restTrimestreMockMvc.perform(put("/api/trimestres")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTrimestre)))
            .andExpect(status().isOk());

        // Validate the Trimestre in the database
        List<Trimestre> trimestreList = trimestreRepository.findAll();
        assertThat(trimestreList).hasSize(databaseSizeBeforeUpdate);
        Trimestre testTrimestre = trimestreList.get(trimestreList.size() - 1);
        assertThat(testTrimestre.getCodeTrimestre()).isEqualTo(UPDATED_CODE_TRIMESTRE);
        assertThat(testTrimestre.getTrimestre()).isEqualTo(UPDATED_TRIMESTRE);
    }

    @Test
    @Transactional
    public void updateNonExistingTrimestre() throws Exception {
        int databaseSizeBeforeUpdate = trimestreRepository.findAll().size();

        // Create the Trimestre

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTrimestreMockMvc.perform(put("/api/trimestres")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(trimestre)))
            .andExpect(status().isBadRequest());

        // Validate the Trimestre in the database
        List<Trimestre> trimestreList = trimestreRepository.findAll();
        assertThat(trimestreList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTrimestre() throws Exception {
        // Initialize the database
        trimestreService.save(trimestre);

        int databaseSizeBeforeDelete = trimestreRepository.findAll().size();

        // Get the trimestre
        restTrimestreMockMvc.perform(delete("/api/trimestres/{id}", trimestre.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Trimestre> trimestreList = trimestreRepository.findAll();
        assertThat(trimestreList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Trimestre.class);
        Trimestre trimestre1 = new Trimestre();
        trimestre1.setId(1L);
        Trimestre trimestre2 = new Trimestre();
        trimestre2.setId(trimestre1.getId());
        assertThat(trimestre1).isEqualTo(trimestre2);
        trimestre2.setId(2L);
        assertThat(trimestre1).isNotEqualTo(trimestre2);
        trimestre1.setId(null);
        assertThat(trimestre1).isNotEqualTo(trimestre2);
    }
}
