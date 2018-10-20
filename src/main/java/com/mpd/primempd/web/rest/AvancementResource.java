package com.mpd.primempd.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mpd.primempd.domain.Avancement;
import com.mpd.primempd.service.AvancementService;
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
 * REST controller for managing Avancement.
 */
@RestController
@RequestMapping("/api")
public class AvancementResource {

    private final Logger log = LoggerFactory.getLogger(AvancementResource.class);

    private static final String ENTITY_NAME = "avancement";

    private final AvancementService avancementService;

    public AvancementResource(AvancementService avancementService) {
        this.avancementService = avancementService;
    }

    /**
     * POST  /avancements : Create a new avancement.
     *
     * @param avancement the avancement to create
     * @return the ResponseEntity with status 201 (Created) and with body the new avancement, or with status 400 (Bad Request) if the avancement has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/avancements")
    @Timed
    public ResponseEntity<Avancement> createAvancement(@RequestBody Avancement avancement) throws URISyntaxException {
        log.debug("REST request to save Avancement : {}", avancement);
        if (avancement.getId() != null) {
            throw new BadRequestAlertException("A new avancement cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Avancement result = avancementService.save(avancement);
        return ResponseEntity.created(new URI("/api/avancements/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /avancements : Updates an existing avancement.
     *
     * @param avancement the avancement to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated avancement,
     * or with status 400 (Bad Request) if the avancement is not valid,
     * or with status 500 (Internal Server Error) if the avancement couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/avancements")
    @Timed
    public ResponseEntity<Avancement> updateAvancement(@RequestBody Avancement avancement) throws URISyntaxException {
        log.debug("REST request to update Avancement : {}", avancement);
        if (avancement.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Avancement result = avancementService.save(avancement);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, avancement.getId().toString()))
            .body(result);
    }

    /**
     * GET  /avancements : get all the avancements.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of avancements in body
     */
    @GetMapping("/avancements")
    @Timed
    public List<Avancement> getAllAvancements() {
        log.debug("REST request to get all Avancements");
        return avancementService.findAll();
    }

    /**
     * GET  /avancements/:id : get the "id" avancement.
     *
     * @param id the id of the avancement to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the avancement, or with status 404 (Not Found)
     */
    @GetMapping("/avancements/{id}")
    @Timed
    public ResponseEntity<Avancement> getAvancement(@PathVariable Long id) {
        log.debug("REST request to get Avancement : {}", id);
        Optional<Avancement> avancement = avancementService.findOne(id);
        return ResponseUtil.wrapOrNotFound(avancement);
    }

    /**
     * DELETE  /avancements/:id : delete the "id" avancement.
     *
     * @param id the id of the avancement to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/avancements/{id}")
    @Timed
    public ResponseEntity<Void> deleteAvancement(@PathVariable Long id) {
        log.debug("REST request to delete Avancement : {}", id);
        avancementService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
