package com.reto03.grupog6.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.reto03.grupog6.CrudRepository.MessageCrudRepository;
import com.reto03.grupog6.Entities.Car;
import com.reto03.grupog6.Entities.Client;
import com.reto03.grupog6.Entities.Message;

@Repository
public class MessageRepository {
    @Autowired
    private MessageCrudRepository messageCrudRepository;

    public List<Message> getAll() {
        return (List<Message>) messageCrudRepository.findAll();
    }

    public Message addMessage(Message message) {
        if (message.getIdMessage() == null || message.getIdMessage() == 0)
            return messageCrudRepository.save(message);
        else
            return message;
    }

    private Message existMessage(Integer id) {
        Optional<Message> objMessage = messageCrudRepository.findById(id);
        Message objMessageRespuesta;

        if (objMessage.isEmpty() == true)
            objMessageRespuesta = null;
        else
            objMessageRespuesta = objMessage.get();
        
        return objMessageRespuesta;

    }
    
    public Message updMessage(Message message) {
        Message objMessage;
        Car car = new Car();
        Client client = new Client();

        objMessage = existMessage(message.getIdMessage());
        if (objMessage == null)
            return message;
        else {
            if (message.getMessageText() != null)
                objMessage.setMessageText(message.getMessageText());

            if (message.getCar().getIdCar() != null) {
                car.setIdCar(message.getCar().getIdCar());
                objMessage.setCar(car);
            }

            if (message.getClient().getIdClient() != null) {
                client.setIdClient(message.getClient().getIdClient());
                objMessage.setClient(client);
            }
            
            

            return messageCrudRepository.save(objMessage);

        }
    }

    public void delMessage(Integer id) {
        Message objMessage;

        objMessage = existMessage(id);
        if (objMessage != null)
            messageCrudRepository.deleteById(id);
    }

    public Message getMessage(Integer id) {
        Message objMessage;

        objMessage = existMessage(id);
        if (objMessage != null)
            return objMessage;
        else
            return null;
        
    }


}
