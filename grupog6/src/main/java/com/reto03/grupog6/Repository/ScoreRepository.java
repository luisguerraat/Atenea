package com.reto03.grupog6.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.reto03.grupog6.CrudRepository.ScoreCrudRepository;
import com.reto03.grupog6.Entities.Score;
import com.reto03.grupog6.Entities.Reservation;

@Repository
public class ScoreRepository {
    @Autowired
    private ScoreCrudRepository scoreCrudRepository;

    public List<Score> getAll() {
        return (List<Score>) scoreCrudRepository.findAll();
    }

    public Score addScore(Score score) {
        if (score.getIdScore() == null || score.getIdScore() == 0)
            return scoreCrudRepository.save(score);
        else
            return score;
    }

    private Score existScore(Integer id) {
        Optional<Score> objScore = scoreCrudRepository.findById(id);
        Score objScoreRespuesta;

        if (objScore.isEmpty() == true)
            objScoreRespuesta = null;
        else
            objScoreRespuesta = objScore.get();
        
        return objScoreRespuesta;

    }
    
    public Score updScore(Score score) {
        Score objScore;
        Reservation reservation = new Reservation();

        objScore = existScore(score.getIdScore());
        if (objScore == null)
            return score;
        else {
            if (score.getMessageText() != null)
                objScore.setMessageText(score.getMessageText());

            if (score.getStars() != null)
                objScore.setStars(score.getStars());

            if (score.getReservation() != null){
                reservation.setIdReservation(score.getReservation().getIdReservation());
                objScore.setReservation(reservation);
            }

            return scoreCrudRepository.save(objScore);

        }
    }

    public void delScore(Integer id) {
        Score objScore;

        objScore = existScore(id);
        if (objScore != null)
            scoreCrudRepository.deleteById(id);
    }

    public Score getScore(Integer id) {
        Score objScore;

        objScore = existScore(id);
        if (objScore != null)
            return objScore;
        else
            return null;
        
    }


}
