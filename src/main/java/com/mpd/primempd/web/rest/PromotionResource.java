package com.mpd.primempd.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mpd.primempd.domain.Promotion;
import com.mpd.primempd.service.PromotionService;
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
 * REST controller for managing Promotion.
 */
@RestController
@RequestMapping("/api")
public class PromotionResource {

    private final Logger log = LoggerFactory.getLogger(PromotionResource.class);

    private static final String ENTITY_NAME = "promotion";

    private final PromotionService promotionService;

    public PromotionResource(PromotionService promotionService) {
        this.promotionService = promotionService;
    }

    /**
     * POST  /promotions : Create a new promotion.
     *
     * @param promotion the promotion to create
     * @return the ResponseEntity with status 201 (Created) and with body the new promotion, or with status 400 (Bad Request) if the promotion has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/promotions")
    @Timed
    public ResponseEntity<Promotion> createPromotion(@RequestBody Promotion promotion) throws URISyntaxException {
        log.debug("REST request to save Promotion : {}", promotion);
        if (promotion.getId() != null) {
            throw new BadRequestAlertException("A new promotion cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Promotion result = promotionService.save(promotion);
        return ResponseEntity.created(new URI("/api/promotions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /promotions : Updates an existing promotion.
     *
     * @param promotion the promotion to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated promotion,
     * or with status 400 (Bad Request) if the promotion is not valid,
     * or with status 500 (Internal Server Error) if the promotion couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/promotions")
    @Timed
    public ResponseEntity<Promotion> updatePromotion(@RequestBody Promotion promotion) throws URISyntaxException {
        log.debug("REST request to update Promotion : {}", promotion);
        if (promotion.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Promotion result = promotionService.save(promotion);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, promotion.getId().toString()))
            .body(result);
    }

    /**
     * GET  /promotions : get all the promotions.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of promotions in body
     */
    @GetMapping("/promotions")
    @Timed
    public List<Promotion> getAllPromotions() {
        log.debug("REST request to get all Promotions");
        return promotionService.findAll();
    }

    /**
     * GET  /promotions/:id : get the "id" promotion.
     *
     * @param id the id of the promotion to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the promotion, or with status 404 (Not Found)
     */
    @GetMapping("/promotions/{id}")
    @Timed
    public ResponseEntity<Promotion> getPromotion(@PathVariable Long id) {
        log.debug("REST request to get Promotion : {}", id);
        Optional<Promotion> promotion = promotionService.findOne(id);
        return ResponseUtil.wrapOrNotFound(promotion);
    }

    /**
     * DELETE  /promotions/:id : delete the "id" promotion.
     *
     * @param id the id of the promotion to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/promotions/{id}")
    @Timed
    public ResponseEntity<Void> deletePromotion(@PathVariable Long id) {
        log.debug("REST request to delete Promotion : {}", id);
        promotionService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
