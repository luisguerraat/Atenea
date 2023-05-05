package com.reto03.grupog6.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.reto03.grupog6.CrudRepository.CarCrudRepository;
import com.reto03.grupog6.Entities.Car;


@Repository
public class CarRepository {
    @Autowired
    private CarCrudRepository carCrudRepository;

    public List<Car> getAll() {
        return (List<Car>) carCrudRepository.findAll();
    }

    public Car addCar(Car car) {
        if (car.getIdCar() == null || car.getIdCar() == 0)
            return carCrudRepository.save(car);
        else
            return car;
    }

    private Car existCar(Integer id) {
        Optional<Car> objCar = carCrudRepository.findById(id);
        Car objCarRespuesta;

        if (objCar.isEmpty() == true)
            objCarRespuesta = null;
        else
            objCarRespuesta = objCar.get();
        
        return objCarRespuesta;

    }
    
    public Car updCar(Car car) {
        Car objCar;


        objCar = existCar(car.getIdCar());
        if (objCar == null)
            return car;
        else {
            if (car.getName() != null)
                objCar.setName(car.getName());

            if (car.getBrand() != null)
                objCar.setBrand(car.getBrand());

            if (car.getYear() != null)
                objCar.setYear(car.getYear());

            if (car.getDescription() != null)
                objCar.setDescription(car.getDescription());

          
            return carCrudRepository.save(objCar);

        }
    }

    public void delCar(Integer id) {
        Car objCar;

        objCar = existCar(id);
        if (objCar != null)
            carCrudRepository.deleteById(id);
    }

    public Car getCar(Integer id) {
        Car objCar;

        objCar = existCar(id);
        if (objCar != null)
            return objCar;
        else
            return null;
        
    }


}
