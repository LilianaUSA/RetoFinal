package co.usa.ciclo3.ciclo3.web;

/**
 *
 * @author Liliana Alfonso
 */
import co.usa.ciclo3.ciclo3.model.Motorbike;
import co.usa.ciclo3.ciclo3.service.MotorbikeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/Motorbike")
@CrossOrigin(origins = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})

public class MotorbikeController {

    @Autowired
    private MotorbikeService motorbikeService;

    @GetMapping("/all")
    public List<Motorbike> getMotorbike() {
        return motorbikeService.getAll();
    }

    @GetMapping("/{id}")
    public Optional<Motorbike> getMotorbike(@PathVariable("id") int mbikeId) {
        return motorbikeService.getMotorbike(mbikeId);
    }

    @PostMapping("/save")
    @ResponseStatus(HttpStatus.CREATED)
    public Motorbike save(@RequestBody Motorbike motorbike) {
        return motorbikeService.save(motorbike);
    }

    @PutMapping("/update")
    @ResponseStatus(HttpStatus.CREATED)
    public Motorbike update(@RequestBody Motorbike motorbike) {
        return motorbikeService.update(motorbike);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public boolean delete(@PathVariable("id") int mbikeId) {
        return motorbikeService.deleteMotorbike(mbikeId);
    }
}
