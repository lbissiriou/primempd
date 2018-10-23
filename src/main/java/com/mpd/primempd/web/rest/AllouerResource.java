package com.mpd.primempd.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mpd.primempd.domain.Allouer;
import com.mpd.primempd.service.AllouerService;
import com.mpd.primempd.web.rest.errors.BadRequestAlertException;
import com.mpd.primempd.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Allouer.
 */
@RestController
@RequestMapping("/api")
public class AllouerResource {

    private final Logger log = LoggerFactory.getLogger(AllouerResource.class);

    private static final String ENTITY_NAME = "allouer";

    private final AllouerService allouerService;

    public AllouerResource(AllouerService allouerService) {
        this.allouerService = allouerService;
    }

    /**
     * POST  /allouers : Create a new allouer.
     *
     * @param allouer the allouer to create
     * @return the ResponseEntity with status 201 (Created) and with body the new allouer, or with status 400 (Bad Request) if the allouer has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/allouers")
    @Timed
    public ResponseEntity<Allouer> createAllouer(@Valid @RequestBody Allouer allouer) throws URISyntaxException {
        log.debug("REST request to save Allouer : {}", allouer);
        if (allouer.getId() != null) {
            throw new BadRequestAlertException("A new allouer cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Allouer result = allouerService.save(allouer);
        return ResponseEntity.created(new URI("/api/allouers/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /allouers : Updates an existing allouer.
     *
     * @param allouer the allouer to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated allouer,
     * or with status 400 (Bad Request) if the allouer is not valid,
     * or with status 500 (Internal Server Error) if the allouer couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/allouers")
    @Timed
    public ResponseEntity<Allouer> updateAllouer(@Valid @RequestBody Allouer allouer) throws URISyntaxException {
        log.debug("REST request to update Allouer : {}", allouer);
        if (allouer.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Allouer result = allouerService.save(allouer);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, allouer.getId().toString()))
            .body(result);
    }

    /**
     * GET  /allouers : get all the allouers.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of allouers in body
     */
    @GetMapping("/allouers")
    @Timed
    public List<Allouer> getAllAllouers() {
        log.debug("REST request to get all Allouers");
        return allouerService.findAll();
    }

    /**
     * GET  /allouers/:id : get the "id" allouer.
     *
     * @param id the id of the allouer to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the allouer, or with status 404 (Not Found)
     */
    @GetMapping("/allouers/{id}")
    @Timed
    public ResponseEntity<Allouer> getAllouer(@PathVariable Long id) {
        log.debug("REST request to get Allouer : {}", id);
        Optional<Allouer> allouer = allouerService.findOne(id);
        return ResponseUtil.wrapOrNotFound(allouer);
    }

    /**
     * DELETE  /allouers/:id : delete the "id" allouer.
     *
     * @param id the id of the allouer to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/allouers/{id}")
    @Timed
    public ResponseEntity<Void> deleteAllouer(@PathVariable Long id) {
        log.debug("REST request to delete Allouer : {}", id);
        allouerService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
