package com.mpd.primempd.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mpd.primempd.domain.Corps;
import com.mpd.primempd.service.CorpsService;
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
 * REST controller for managing Corps.
 */
@RestController
@RequestMapping("/api")
public class CorpsResource {

    private final Logger log = LoggerFactory.getLogger(CorpsResource.class);

    private static final String ENTITY_NAME = "corps";

    private final CorpsService corpsService;

    public CorpsResource(CorpsService corpsService) {
        this.corpsService = corpsService;
    }

    /**
     * POST  /corps : Create a new corps.
     *
     * @param corps the corps to create
     * @return the ResponseEntity with status 201 (Created) and with body the new corps, or with status 400 (Bad Request) if the corps has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/corps")
    @Timed
    public ResponseEntity<Corps> createCorps(@RequestBody Corps corps) throws URISyntaxException {
        log.debug("REST request to save Corps : {}", corps);
        if (corps.getId() != null) {
            throw new BadRequestAlertException("A new corps cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Corps result = corpsService.save(corps);
        return ResponseEntity.created(new URI("/api/corps/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /corps : Updates an existing corps.
     *
     * @param corps the corps to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated corps,
     * or with status 400 (Bad Request) if the corps is not valid,
     * or with status 500 (Internal Server Error) if the corps couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/corps")
    @Timed
    public ResponseEntity<Corps> updateCorps(@RequestBody Corps corps) throws URISyntaxException {
        log.debug("REST request to update Corps : {}", corps);
        if (corps.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Corps result = corpsService.save(corps);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, corps.getId().toString()))
            .body(result);
    }

    /**
     * GET  /corps : get all the corps.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of corps in body
     */
    @GetMapping("/corps")
    @Timed
    public List<Corps> getAllCorps() {
        log.debug("REST request to get all Corps");
        return corpsService.findAll();
    }

    /**
     * GET  /corps/:id : get the "id" corps.
     *
     * @param id the id of the corps to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the corps, or with status 404 (Not Found)
     */
    @GetMapping("/corps/{id}")
    @Timed
    public ResponseEntity<Corps> getCorps(@PathVariable Long id) {
        log.debug("REST request to get Corps : {}", id);
        Optional<Corps> corps = corpsService.findOne(id);
        return ResponseUtil.wrapOrNotFound(corps);
    }

    /**
     * DELETE  /corps/:id : delete the "id" corps.
     *
     * @param id the id of the corps to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/corps/{id}")
    @Timed
    public ResponseEntity<Void> deleteCorps(@PathVariable Long id) {
        log.debug("REST request to delete Corps : {}", id);
        corpsService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
