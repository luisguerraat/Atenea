package com.reto03.grupog6.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.reto03.grupog6.CrudRepository.GamaCrudRepository;
import com.reto03.grupog6.Entities.Gama;

@Repository
public class GamaRepository {
    @Autowired
    private GamaCrudRepository gamaCrudRepository;

    public List<Gama> getAll() {
        return (List<Gama>) gamaCrudRepository.findAll();
    }

    public Gama addGama(Gama gama) {
        if (gama.getIdGama() == null || gama.getIdGama() == 0)
            return gamaCrudRepository.save(gama);
        else
            return gama;
    }

    private Gama existGama(Integer id) {
        Optional<Gama> objGama = gamaCrudRepository.findById(id);
        Gama objGamaRespuesta;

        System.out.println("Entra a Repo Gama " + id);

        if (objGama.isEmpty() == true)
        {
            System.out.println("Entra a Repo Gama null" + id);
            objGamaRespuesta = null;

        }
        else
        {
            System.out.println("Entra a Repo Gama no null" + id);
            objGamaRespuesta = objGama.get();
        }
        
        return objGamaRespuesta;

    }
    
    public Gama updGama(Gama gama) {
        Gama objGama;

        objGama = existGama(gama.getIdGama());
        if (objGama == null)
            return gama;
        else {
            if (gama.getName() != null)
                objGama.setName(gama.getName());

            if (gama.getDescription() != null)
                objGama.setDescription(gama.getDescription());

            return gamaCrudRepository.save(objGama);

        }
    }

    public void delGama(Integer id) {
        Gama objGama;

        objGama = existGama(id);
        if (objGama != null)
            gamaCrudRepository.deleteById(id);
    }

    public Gama getGama(Integer id) {
        Gama objGama;

        objGama = existGama(id);
        if (objGama != null)
            return objGama;
        else
            return null;
        
    }


}
