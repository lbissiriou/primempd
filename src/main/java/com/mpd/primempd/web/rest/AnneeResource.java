package com.mpd.primempd.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mpd.primempd.domain.Annee;
import com.mpd.primempd.service.AnneeService;
import com.mpd.primempd.web.rest.errors.BadRequestAlertException;
import com.mpd.primempd.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Annee.
 */
@RestController
@RequestMapping("/api")
public class AnneeResource {

    private final Logger log = LoggerFactory.getLogger(AnneeResource.class);

    private static final String ENTITY_NAME = "annee";

    private final AnneeService anneeService;

    public AnneeResource(AnneeService anneeService) {
        this.anneeService = anneeService;
    }

    /**
     * POST  /annees : Create a new annee.
     *
     * @param annee the annee to create
     * @return the ResponseEntity with status 201 (Created) and with body the new annee, or with status 400 (Bad Request) if the annee has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/annees")
    @Timed
    public ResponseEntity<Annee> createAnnee(@RequestBody Annee annee) throws URISyntaxException {
        log.debug("REST request to save Annee : {}", annee);
        if (annee.getId() != null) {
            throw new BadRequestAlertException("A new annee cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Annee result = anneeService.save(annee);
        return ResponseEntity.created(new URI("/api/annees/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /annees : Updates an existing annee.
     *
     * @param annee the annee to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated annee,
     * or with status 400 (Bad Request) if the annee is not valid,
     * or with status 500 (Internal Server Error) if the annee couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/annees")
    @Timed
    public ResponseEntity<Annee> updateAnnee(@RequestBody Annee annee) throws URISyntaxException {
        log.debug("REST request to update Annee : {}", annee);
        if (annee.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Annee result = anneeService.save(annee);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, annee.getId().toString()))
            .body(result);
    }

    /**
     * GET  /annees : get all the annees.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of annees in body
     */
    @GetMapping("/annees")
    @Timed
    public List<Annee> getAllAnnees() {
        log.debug("REST request to get all Annees");
        return anneeService.findAll();
    }

    /**
     * GET  /annees/:id : get the "id" annee.
     *
     * @param id the id of the annee to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the annee, or with status 404 (Not Found)
     */
    @GetMapping("/annees/{id}")
    @Timed
    public ResponseEntity<Annee> getAnnee(@PathVariable Long id) {
        log.debug("REST request to get Annee : {}", id);
        Optional<Annee> annee = anneeService.findOne(id);
        return ResponseUtil.wrapOrNotFound(annee);
    }

    /**
     * DELETE  /annees/:id : delete the "id" annee.
     *
     * @param id the id of the annee to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/annees/{id}")
    @Timed
    public ResponseEntity<Void> deleteAnnee(@PathVariable Long id) {
        log.debug("REST request to delete Annee : {}", id);
        anneeService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
