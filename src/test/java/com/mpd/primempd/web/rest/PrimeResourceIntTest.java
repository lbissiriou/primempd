package com.mpd.primempd.web.rest;

import com.mpd.primempd.PrimempdApp;

import com.mpd.primempd.domain.Prime;
import com.mpd.primempd.repository.PrimeRepository;
import com.mpd.primempd.service.PrimeService;
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

import com.mpd.primempd.domain.enumeration.Typeprime;
/**
 * Test class for the PrimeResource REST controller.
 *
 * @see PrimeResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = PrimempdApp.class)
public class PrimeResourceIntTest {

    private static final String DEFAULT_LIBELLE_PRIME = "AAAAAAAAAA";
    private static final String UPDATED_LIBELLE_PRIME = "BBBBBBBBBB";

    private static final Double DEFAULT_TAUX_MENSUEL = 1D;
    private static final Double UPDATED_TAUX_MENSUEL = 2D;

    private static final Typeprime DEFAULT_TYPE_PRIME = Typeprime.MENSUELLE;
    private static final Typeprime UPDATED_TYPE_PRIME = Typeprime.TRIMESTRIELLE;

    @Autowired
    private PrimeRepository primeRepository;
    
    @Autowired
    private PrimeService primeService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restPrimeMockMvc;

    private Prime prime;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PrimeResource primeResource = new PrimeResource(primeService);
        this.restPrimeMockMvc = MockMvcBuilders.standaloneSetup(primeResource)
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
    public static Prime createEntity(EntityManager em) {
        Prime prime = new Prime()
            .libellePrime(DEFAULT_LIBELLE_PRIME)
            .tauxMensuel(DEFAULT_TAUX_MENSUEL)
            .typePrime(DEFAULT_TYPE_PRIME);
        return prime;
    }

    @Before
    public void initTest() {
        prime = createEntity(em);
    }

    @Test
    @Transactional
    public void createPrime() throws Exception {
        int databaseSizeBeforeCreate = primeRepository.findAll().size();

        // Create the Prime
        restPrimeMockMvc.perform(post("/api/primes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(prime)))
            .andExpect(status().isCreated());

        // Validate the Prime in the database
        List<Prime> primeList = primeRepository.findAll();
        assertThat(primeList).hasSize(databaseSizeBeforeCreate + 1);
        Prime testPrime = primeList.get(primeList.size() - 1);
        assertThat(testPrime.getLibellePrime()).isEqualTo(DEFAULT_LIBELLE_PRIME);
        assertThat(testPrime.getTauxMensuel()).isEqualTo(DEFAULT_TAUX_MENSUEL);
        assertThat(testPrime.getTypePrime()).isEqualTo(DEFAULT_TYPE_PRIME);
    }

    @Test
    @Transactional
    public void createPrimeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = primeRepository.findAll().size();

        // Create the Prime with an existing ID
        prime.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPrimeMockMvc.perform(post("/api/primes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(prime)))
            .andExpect(status().isBadRequest());

        // Validate the Prime in the database
        List<Prime> primeList = primeRepository.findAll();
        assertThat(primeList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllPrimes() throws Exception {
        // Initialize the database
        primeRepository.saveAndFlush(prime);

        // Get all the primeList
        restPrimeMockMvc.perform(get("/api/primes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(prime.getId().intValue())))
            .andExpect(jsonPath("$.[*].libellePrime").value(hasItem(DEFAULT_LIBELLE_PRIME.toString())))
            .andExpect(jsonPath("$.[*].tauxMensuel").value(hasItem(DEFAULT_TAUX_MENSUEL.doubleValue())))
            .andExpect(jsonPath("$.[*].typePrime").value(hasItem(DEFAULT_TYPE_PRIME.toString())));
    }
    
    @Test
    @Transactional
    public void getPrime() throws Exception {
        // Initialize the database
        primeRepository.saveAndFlush(prime);

        // Get the prime
        restPrimeMockMvc.perform(get("/api/primes/{id}", prime.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(prime.getId().intValue()))
            .andExpect(jsonPath("$.libellePrime").value(DEFAULT_LIBELLE_PRIME.toString()))
            .andExpect(jsonPath("$.tauxMensuel").value(DEFAULT_TAUX_MENSUEL.doubleValue()))
            .andExpect(jsonPath("$.typePrime").value(DEFAULT_TYPE_PRIME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingPrime() throws Exception {
        // Get the prime
        restPrimeMockMvc.perform(get("/api/primes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePrime() throws Exception {
        // Initialize the database
        primeService.save(prime);

        int databaseSizeBeforeUpdate = primeRepository.findAll().size();

        // Update the prime
        Prime updatedPrime = primeRepository.findById(prime.getId()).get();
        // Disconnect from session so that the updates on updatedPrime are not directly saved in db
        em.detach(updatedPrime);
        updatedPrime
            .libellePrime(UPDATED_LIBELLE_PRIME)
            .tauxMensuel(UPDATED_TAUX_MENSUEL)
            .typePrime(UPDATED_TYPE_PRIME);

        restPrimeMockMvc.perform(put("/api/primes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedPrime)))
            .andExpect(status().isOk());

        // Validate the Prime in the database
        List<Prime> primeList = primeRepository.findAll();
        assertThat(primeList).hasSize(databaseSizeBeforeUpdate);
        Prime testPrime = primeList.get(primeList.size() - 1);
        assertThat(testPrime.getLibellePrime()).isEqualTo(UPDATED_LIBELLE_PRIME);
        assertThat(testPrime.getTauxMensuel()).isEqualTo(UPDATED_TAUX_MENSUEL);
        assertThat(testPrime.getTypePrime()).isEqualTo(UPDATED_TYPE_PRIME);
    }

    @Test
    @Transactional
    public void updateNonExistingPrime() throws Exception {
        int databaseSizeBeforeUpdate = primeRepository.findAll().size();

        // Create the Prime

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPrimeMockMvc.perform(put("/api/primes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(prime)))
            .andExpect(status().isBadRequest());

        // Validate the Prime in the database
        List<Prime> primeList = primeRepository.findAll();
        assertThat(primeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePrime() throws Exception {
        // Initialize the database
        primeService.save(prime);

        int databaseSizeBeforeDelete = primeRepository.findAll().size();

        // Get the prime
        restPrimeMockMvc.perform(delete("/api/primes/{id}", prime.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Prime> primeList = primeRepository.findAll();
        assertThat(primeList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Prime.class);
        Prime prime1 = new Prime();
        prime1.setId(1L);
        Prime prime2 = new Prime();
        prime2.setId(prime1.getId());
        assertThat(prime1).isEqualTo(prime2);
        prime2.setId(2L);
        assertThat(prime1).isNotEqualTo(prime2);
        prime1.setId(null);
        assertThat(prime1).isNotEqualTo(prime2);
    }
}
