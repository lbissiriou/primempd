package com.mpd.primempd.web.rest;

import com.mpd.primempd.PrimempdApp;

import com.mpd.primempd.domain.Banque;
import com.mpd.primempd.repository.BanqueRepository;
import com.mpd.primempd.service.BanqueService;
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
 * Test class for the BanqueResource REST controller.
 *
 * @see BanqueResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = PrimempdApp.class)
public class BanqueResourceIntTest {

    private static final String DEFAULT_CODE_BANQUE = "AAAAAAAAAA";
    private static final String UPDATED_CODE_BANQUE = "BBBBBBBBBB";

    private static final String DEFAULT_NOM_BANQUE = "AAAAAAAAAA";
    private static final String UPDATED_NOM_BANQUE = "BBBBBBBBBB";

    private static final String DEFAULT_SIEGE_SOCIAL = "AAAAAAAAAA";
    private static final String UPDATED_SIEGE_SOCIAL = "BBBBBBBBBB";

    private static final String DEFAULT_TELEPHONE = "AAAAAAAAAA";
    private static final String UPDATED_TELEPHONE = "BBBBBBBBBB";

    private static final String DEFAULT_FAX = "AAAAAAAAAA";
    private static final String UPDATED_FAX = "BBBBBBBBBB";

    private static final String DEFAULT_EMAIL = "AAAAAAAAAA";
    private static final String UPDATED_EMAIL = "BBBBBBBBBB";

    @Autowired
    private BanqueRepository banqueRepository;
    
    @Autowired
    private BanqueService banqueService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restBanqueMockMvc;

    private Banque banque;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final BanqueResource banqueResource = new BanqueResource(banqueService);
        this.restBanqueMockMvc = MockMvcBuilders.standaloneSetup(banqueResource)
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
    public static Banque createEntity(EntityManager em) {
        Banque banque = new Banque()
            .codeBanque(DEFAULT_CODE_BANQUE)
            .nomBanque(DEFAULT_NOM_BANQUE)
            .siegeSocial(DEFAULT_SIEGE_SOCIAL)
            .telephone(DEFAULT_TELEPHONE)
            .fax(DEFAULT_FAX)
            .email(DEFAULT_EMAIL);
        return banque;
    }

    @Before
    public void initTest() {
        banque = createEntity(em);
    }

    @Test
    @Transactional
    public void createBanque() throws Exception {
        int databaseSizeBeforeCreate = banqueRepository.findAll().size();

        // Create the Banque
        restBanqueMockMvc.perform(post("/api/banques")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(banque)))
            .andExpect(status().isCreated());

        // Validate the Banque in the database
        List<Banque> banqueList = banqueRepository.findAll();
        assertThat(banqueList).hasSize(databaseSizeBeforeCreate + 1);
        Banque testBanque = banqueList.get(banqueList.size() - 1);
        assertThat(testBanque.getCodeBanque()).isEqualTo(DEFAULT_CODE_BANQUE);
        assertThat(testBanque.getNomBanque()).isEqualTo(DEFAULT_NOM_BANQUE);
        assertThat(testBanque.getSiegeSocial()).isEqualTo(DEFAULT_SIEGE_SOCIAL);
        assertThat(testBanque.getTelephone()).isEqualTo(DEFAULT_TELEPHONE);
        assertThat(testBanque.getFax()).isEqualTo(DEFAULT_FAX);
        assertThat(testBanque.getEmail()).isEqualTo(DEFAULT_EMAIL);
    }

    @Test
    @Transactional
    public void createBanqueWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = banqueRepository.findAll().size();

        // Create the Banque with an existing ID
        banque.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restBanqueMockMvc.perform(post("/api/banques")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(banque)))
            .andExpect(status().isBadRequest());

        // Validate the Banque in the database
        List<Banque> banqueList = banqueRepository.findAll();
        assertThat(banqueList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllBanques() throws Exception {
        // Initialize the database
        banqueRepository.saveAndFlush(banque);

        // Get all the banqueList
        restBanqueMockMvc.perform(get("/api/banques?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(banque.getId().intValue())))
            .andExpect(jsonPath("$.[*].codeBanque").value(hasItem(DEFAULT_CODE_BANQUE.toString())))
            .andExpect(jsonPath("$.[*].nomBanque").value(hasItem(DEFAULT_NOM_BANQUE.toString())))
            .andExpect(jsonPath("$.[*].siegeSocial").value(hasItem(DEFAULT_SIEGE_SOCIAL.toString())))
            .andExpect(jsonPath("$.[*].telephone").value(hasItem(DEFAULT_TELEPHONE.toString())))
            .andExpect(jsonPath("$.[*].fax").value(hasItem(DEFAULT_FAX.toString())))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL.toString())));
    }
    
    @Test
    @Transactional
    public void getBanque() throws Exception {
        // Initialize the database
        banqueRepository.saveAndFlush(banque);

        // Get the banque
        restBanqueMockMvc.perform(get("/api/banques/{id}", banque.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(banque.getId().intValue()))
            .andExpect(jsonPath("$.codeBanque").value(DEFAULT_CODE_BANQUE.toString()))
            .andExpect(jsonPath("$.nomBanque").value(DEFAULT_NOM_BANQUE.toString()))
            .andExpect(jsonPath("$.siegeSocial").value(DEFAULT_SIEGE_SOCIAL.toString()))
            .andExpect(jsonPath("$.telephone").value(DEFAULT_TELEPHONE.toString()))
            .andExpect(jsonPath("$.fax").value(DEFAULT_FAX.toString()))
            .andExpect(jsonPath("$.email").value(DEFAULT_EMAIL.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingBanque() throws Exception {
        // Get the banque
        restBanqueMockMvc.perform(get("/api/banques/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateBanque() throws Exception {
        // Initialize the database
        banqueService.save(banque);

        int databaseSizeBeforeUpdate = banqueRepository.findAll().size();

        // Update the banque
        Banque updatedBanque = banqueRepository.findById(banque.getId()).get();
        // Disconnect from session so that the updates on updatedBanque are not directly saved in db
        em.detach(updatedBanque);
        updatedBanque
            .codeBanque(UPDATED_CODE_BANQUE)
            .nomBanque(UPDATED_NOM_BANQUE)
            .siegeSocial(UPDATED_SIEGE_SOCIAL)
            .telephone(UPDATED_TELEPHONE)
            .fax(UPDATED_FAX)
            .email(UPDATED_EMAIL);

        restBanqueMockMvc.perform(put("/api/banques")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedBanque)))
            .andExpect(status().isOk());

        // Validate the Banque in the database
        List<Banque> banqueList = banqueRepository.findAll();
        assertThat(banqueList).hasSize(databaseSizeBeforeUpdate);
        Banque testBanque = banqueList.get(banqueList.size() - 1);
        assertThat(testBanque.getCodeBanque()).isEqualTo(UPDATED_CODE_BANQUE);
        assertThat(testBanque.getNomBanque()).isEqualTo(UPDATED_NOM_BANQUE);
        assertThat(testBanque.getSiegeSocial()).isEqualTo(UPDATED_SIEGE_SOCIAL);
        assertThat(testBanque.getTelephone()).isEqualTo(UPDATED_TELEPHONE);
        assertThat(testBanque.getFax()).isEqualTo(UPDATED_FAX);
        assertThat(testBanque.getEmail()).isEqualTo(UPDATED_EMAIL);
    }

    @Test
    @Transactional
    public void updateNonExistingBanque() throws Exception {
        int databaseSizeBeforeUpdate = banqueRepository.findAll().size();

        // Create the Banque

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restBanqueMockMvc.perform(put("/api/banques")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(banque)))
            .andExpect(status().isBadRequest());

        // Validate the Banque in the database
        List<Banque> banqueList = banqueRepository.findAll();
        assertThat(banqueList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteBanque() throws Exception {
        // Initialize the database
        banqueService.save(banque);

        int databaseSizeBeforeDelete = banqueRepository.findAll().size();

        // Get the banque
        restBanqueMockMvc.perform(delete("/api/banques/{id}", banque.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Banque> banqueList = banqueRepository.findAll();
        assertThat(banqueList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Banque.class);
        Banque banque1 = new Banque();
        banque1.setId(1L);
        Banque banque2 = new Banque();
        banque2.setId(banque1.getId());
        assertThat(banque1).isEqualTo(banque2);
        banque2.setId(2L);
        assertThat(banque1).isNotEqualTo(banque2);
        banque1.setId(null);
        assertThat(banque1).isNotEqualTo(banque2);
    }
}
