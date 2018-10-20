package com.mpd.primempd.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mpd.primempd.domain.Affectation;
import com.mpd.primempd.service.AffectationService;
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
 * REST controller for managing Affectation.
 */
@RestController
@RequestMapping("/api")
public class AffectationResource {

    private final Logger log = LoggerFactory.getLogger(AffectationResource.class);

    private static final String ENTITY_NAME = "affectation";

    private final AffectationService affectationService;

    public AffectationResource(AffectationService affectationService) {
        this.affectationService = affectationService;
    }

    /**
     * POST  /affectations : Create a new affectation.
     *
     * @param affectation the affectation to create
     * @return the ResponseEntity with status 201 (Created) and with body the new affectation, or with status 400 (Bad Request) if the affectation has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/affectations")
    @Timed
    public ResponseEntity<Affectation> createAffectation(@RequestBody Affectation affectation) throws URISyntaxException {
        log.debug("REST request to save Affectation : {}", affectation);
        if (affectation.getId() != null) {
            throw new BadRequestAlertException("A new affectation cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Affectation result = affectationService.save(affectation);
        return ResponseEntity.created(new URI("/api/affectations/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /affectations : Updates an existing affectation.
     *
     * @param affectation the affectation to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated affectation,
     * or with status 400 (Bad Request) if the affectation is not valid,
     * or with status 500 (Internal Server Error) if the affectation couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/affectations")
    @Timed
    public ResponseEntity<Affectation> updateAffectation(@RequestBody Affectation affectation) throws URISyntaxException {
        log.debug("REST request to update Affectation : {}", affectation);
        if (affectation.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Affectation result = affectationService.save(affectation);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, affectation.getId().toString()))
            .body(result);
    }

    /**
     * GET  /affectations : get all the affectations.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of affectations in body
     */
    @GetMapping("/affectations")
    @Timed
    public List<Affectation> getAllAffectations() {
        log.debug("REST request to get all Affectations");
        return affectationService.findAll();
    }

    /**
     * GET  /affectations/:id : get the "id" affectation.
     *
     * @param id the id of the affectation to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the affectation, or with status 404 (Not Found)
     */
    @GetMapping("/affectations/{id}")
    @Timed
    public ResponseEntity<Affectation> getAffectation(@PathVariable Long id) {
        log.debug("REST request to get Affectation : {}", id);
        Optional<Affectation> affectation = affectationService.findOne(id);
        return ResponseUtil.wrapOrNotFound(affectation);
    }

    /**
     * DELETE  /affectations/:id : delete the "id" affectation.
     *
     * @param id the id of the affectation to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/affectations/{id}")
    @Timed
    public ResponseEntity<Void> deleteAffectation(@PathVariable Long id) {
        log.debug("REST request to delete Affectation : {}", id);
        affectationService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
