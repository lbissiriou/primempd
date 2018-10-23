package com.mpd.primempd.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Corps.
 */
@Entity
@Table(name = "corps")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Corps implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "libelle_corps")
    private String libelleCorps;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLibelleCorps() {
        return libelleCorps;
    }

    public Corps libelleCorps(String libelleCorps) {
        this.libelleCorps = libelleCorps;
        return this;
    }

    public void setLibelleCorps(String libelleCorps) {
        this.libelleCorps = libelleCorps;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Corps corps = (Corps) o;
        if (corps.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), corps.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Corps{" +
            "id=" + getId() +
            ", libelleCorps='" + getLibelleCorps() + "'" +
            "}";
    }
}
