package com.mpd.primempd.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Trimestre.
 */
@Entity
@Table(name = "trimestre")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Trimestre implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "code_trimestre")
    private Integer codeTrimestre;

    @Column(name = "trimestre")
    private String trimestre;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getCodeTrimestre() {
        return codeTrimestre;
    }

    public Trimestre codeTrimestre(Integer codeTrimestre) {
        this.codeTrimestre = codeTrimestre;
        return this;
    }

    public void setCodeTrimestre(Integer codeTrimestre) {
        this.codeTrimestre = codeTrimestre;
    }

    public String getTrimestre() {
        return trimestre;
    }

    public Trimestre trimestre(String trimestre) {
        this.trimestre = trimestre;
        return this;
    }

    public void setTrimestre(String trimestre) {
        this.trimestre = trimestre;
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
        Trimestre trimestre = (Trimestre) o;
        if (trimestre.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), trimestre.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Trimestre{" +
            "id=" + getId() +
            ", codeTrimestre=" + getCodeTrimestre() +
            ", trimestre='" + getTrimestre() + "'" +
            "}";
    }
}
