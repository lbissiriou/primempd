package com.mpd.primempd.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mpd.primempd.domain.Trimestre;
import com.mpd.primempd.service.TrimestreService;
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
 * REST controller for managing Trimestre.
 */
@RestController
@RequestMapping("/api")
public class TrimestreResource {

    private final Logger log = LoggerFactory.getLogger(TrimestreResource.class);

    private static final String ENTITY_NAME = "trimestre";

    private final TrimestreService trimestreService;

    public TrimestreResource(TrimestreService trimestreService) {
        this.trimestreService = trimestreService;
    }

    /**
     * POST  /trimestres : Create a new trimestre.
     *
     * @param trimestre the trimestre to create
     * @return the ResponseEntity with status 201 (Created) and with body the new trimestre, or with status 400 (Bad Request) if the trimestre has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/trimestres")
    @Timed
    public ResponseEntity<Trimestre> createTrimestre(@RequestBody Trimestre trimestre) throws URISyntaxException {
        log.debug("REST request to save Trimestre : {}", trimestre);
        if (trimestre.getId() != null) {
            throw new BadRequestAlertException("A new trimestre cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Trimestre result = trimestreService.save(trimestre);
        return ResponseEntity.created(new URI("/api/trimestres/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /trimestres : Updates an existing trimestre.
     *
     * @param trimestre the trimestre to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated trimestre,
     * or with status 400 (Bad Request) if the trimestre is not valid,
     * or with status 500 (Internal Server Error) if the trimestre couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/trimestres")
    @Timed
    public ResponseEntity<Trimestre> updateTrimestre(@RequestBody Trimestre trimestre) throws URISyntaxException {
        log.debug("REST request to update Trimestre : {}", trimestre);
        if (trimestre.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Trimestre result = trimestreService.save(trimestre);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, trimestre.getId().toString()))
            .body(result);
    }

    /**
     * GET  /trimestres : get all the trimestres.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of trimestres in body
     */
    @GetMapping("/trimestres")
    @Timed
    public List<Trimestre> getAllTrimestres() {
        log.debug("REST request to get all Trimestres");
        return trimestreService.findAll();
    }

    /**
     * GET  /trimestres/:id : get the "id" trimestre.
     *
     * @param id the id of the trimestre to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the trimestre, or with status 404 (Not Found)
     */
    @GetMapping("/trimestres/{id}")
    @Timed
    public ResponseEntity<Trimestre> getTrimestre(@PathVariable Long id) {
        log.debug("REST request to get Trimestre : {}", id);
        Optional<Trimestre> trimestre = trimestreService.findOne(id);
        return ResponseUtil.wrapOrNotFound(trimestre);
    }

    /**
     * DELETE  /trimestres/:id : delete the "id" trimestre.
     *
     * @param id the id of the trimestre to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/trimestres/{id}")
    @Timed
    public ResponseEntity<Void> deleteTrimestre(@PathVariable Long id) {
        log.debug("REST request to delete Trimestre : {}", id);
        trimestreService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
