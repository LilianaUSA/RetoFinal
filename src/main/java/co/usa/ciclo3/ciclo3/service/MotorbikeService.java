package co.usa.ciclo3.ciclo3.service;

/**
 *
 * @author Liliana Alfonso
 */
import co.usa.ciclo3.ciclo3.model.Motorbike;
import co.usa.ciclo3.ciclo3.repository.MotorbikeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MotorbikeService {

    @Autowired
    private MotorbikeRepository motorbikeRepository;

    public List<Motorbike> getAll() {
        return motorbikeRepository.getAll();
    }

    public Optional<Motorbike> getMotorbike(int idmotorbike) {
        return motorbikeRepository.getMotorbike(idmotorbike);
    }

    public Motorbike save(Motorbike motorbike) {
        if (motorbike.getId() == null) {
            return motorbikeRepository.save(motorbike);
        } else {
            Optional<Motorbike> paux = motorbikeRepository.getMotorbike(motorbike.getId());
            if (paux.isEmpty()) {
                return motorbikeRepository.save(motorbike);
            } else {
                return motorbike;
            }
        }
    }

    public Motorbike update(Motorbike motorbike) {
        if (motorbike.getId() != null) {
            Optional<Motorbike> mbike = motorbikeRepository.getMotorbike(motorbike.getId());
            if (!mbike.isEmpty()) {
                if (motorbike.getName() != null) {
                    mbike.get().setName(motorbike.getName());
                }
                if (motorbike.getBrand() != null) {
                    mbike.get().setBrand(motorbike.getBrand());
                }
                if (motorbike.getYear() != null) {
                    mbike.get().setYear(motorbike.getYear());
                }
                if (motorbike.getDescription() != null) {
                    mbike.get().setDescription(motorbike.getDescription());
                }
                if (motorbike.getCategory() != null) {
                    mbike.get().setCategory(motorbike.getCategory());
                }
                motorbikeRepository.save(mbike.get());
                return mbike.get();
            } else {
                return motorbike;
            }
        } else {
            return motorbike;
        }
    }

    public boolean deleteMotorbike(int idmotorbike) {
        Boolean qBoolean = getMotorbike(idmotorbike).map(motorbike -> {
            motorbikeRepository.delete(motorbike);
            return true;
        }).orElse(false);
        return qBoolean;
    }
}
