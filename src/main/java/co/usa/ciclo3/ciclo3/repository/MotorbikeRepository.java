package co.usa.ciclo3.ciclo3.repository;

/**
 *
 * @author Liliana Alfonso
 */
import co.usa.ciclo3.ciclo3.model.Motorbike;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;
import co.usa.ciclo3.ciclo3.repository.crud.MotorbikeCrudRepository;

@Repository
public class MotorbikeRepository {

    @Autowired
    private MotorbikeCrudRepository motorbikeCrudRepository;

    public List<Motorbike> getAll() {
        return (List<Motorbike>) motorbikeCrudRepository.findAll();
    }

    public Optional<Motorbike> getMotorbike(int id) {
        return motorbikeCrudRepository.findById(id);
    }

    public Motorbike save(Motorbike motorbike) {
        return motorbikeCrudRepository.save(motorbike);
    }

    public void delete(Motorbike motorbike) {
        motorbikeCrudRepository.delete(motorbike);
    }
}
