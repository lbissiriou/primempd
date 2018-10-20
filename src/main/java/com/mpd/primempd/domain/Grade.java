package com.mpd.primempd.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Grade.
 */
@Entity
@Table(name = "grade")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Grade implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "grade")
    private String grade;

    @Column(name = "indice_base")
    private Integer indiceBase;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getGrade() {
        return grade;
    }

    public Grade grade(String grade) {
        this.grade = grade;
        return this;
    }

    public void setGrade(String grade) {
        this.grade = grade;
    }

    public Integer getIndiceBase() {
        return indiceBase;
    }

    public Grade indiceBase(Integer indiceBase) {
        this.indiceBase = indiceBase;
        return this;
    }

    public void setIndiceBase(Integer indiceBase) {
        this.indiceBase = indiceBase;
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
        Grade grade = (Grade) o;
        if (grade.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), grade.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Grade{" +
            "id=" + getId() +
            ", grade='" + getGrade() + "'" +
            ", indiceBase=" + getIndiceBase() +
            "}";
    }
}
