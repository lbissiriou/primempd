package com.mpd.primempd.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mpd.primempd.domain.Direction;
import com.mpd.primempd.service.DirectionService;
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
 * REST controller for managing Direction.
 */
@RestController
@RequestMapping("/api")
public class DirectionResource {

    private final Logger log = LoggerFactory.getLogger(DirectionResource.class);

    private static final String ENTITY_NAME = "direction";

    private final DirectionService directionService;

    public DirectionResource(DirectionService directionService) {
        this.directionService = directionService;
    }

    /**
     * POST  /directions : Create a new direction.
     *
     * @param direction the direction to create
     * @return the ResponseEntity with status 201 (Created) and with body the new direction, or with status 400 (Bad Request) if the direction has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/directions")
    @Timed
    public ResponseEntity<Direction> createDirection(@RequestBody Direction direction) throws URISyntaxException {
        log.debug("REST request to save Direction : {}", direction);
        if (direction.getId() != null) {
            throw new BadRequestAlertException("A new direction cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Direction result = directionService.save(direction);
        return ResponseEntity.created(new URI("/api/directions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /directions : Updates an existing direction.
     *
     * @param direction the direction to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated direction,
     * or with status 400 (Bad Request) if the direction is not valid,
     * or with status 500 (Internal Server Error) if the direction couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/directions")
    @Timed
    public ResponseEntity<Direction> updateDirection(@RequestBody Direction direction) throws URISyntaxException {
        log.debug("REST request to update Direction : {}", direction);
        if (direction.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Direction result = directionService.save(direction);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, direction.getId().toString()))
            .body(result);
    }

    /**
     * GET  /directions : get all the directions.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of directions in body
     */
    @GetMapping("/directions")
    @Timed
    public List<Direction> getAllDirections() {
        log.debug("REST request to get all Directions");
        return directionService.findAll();
    }

    /**
     * GET  /directions/:id : get the "id" direction.
     *
     * @param id the id of the direction to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the direction, or with status 404 (Not Found)
     */
    @GetMapping("/directions/{id}")
    @Timed
    public ResponseEntity<Direction> getDirection(@PathVariable Long id) {
        log.debug("REST request to get Direction : {}", id);
        Optional<Direction> direction = directionService.findOne(id);
        return ResponseUtil.wrapOrNotFound(direction);
    }

    /**
     * DELETE  /directions/:id : delete the "id" direction.
     *
     * @param id the id of the direction to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/directions/{id}")
    @Timed
    public ResponseEntity<Void> deleteDirection(@PathVariable Long id) {
        log.debug("REST request to delete Direction : {}", id);
        directionService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
