package com.example.graphql_springboot.resolvers;

import com.example.graphql_springboot.model.Exam;
import com.example.graphql_springboot.repository.ExamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

import java.util.List;

@Controller
public class ExamResolver {

    @Autowired
    public ExamRepository examRepository;

    @QueryMapping
    public List<Exam> getAllExams() {
        System.out.println("EMON getAllExams." + examRepository.findAll());
        return examRepository.findAll();
    }

    @QueryMapping
    public Exam getExamById (@Argument String id) throws Exception {
        return examRepository
                .findById(id)
                .orElseThrow(() -> new Exception("Exam not found for id: " + id));
    }

    @QueryMapping
    public List<Exam> getExamsByAuthorId(@Argument String authorId) {
        return examRepository.findByAuthorId(authorId);
    }

    @MutationMapping
    public Exam addExam(@Argument String title, @Argument String description, @Argument String author, @Argument String authorId) {
        Exam exam = new Exam();
        exam.setTitle(title);
        exam.setDescription(description);
        exam.setAuthor(author);
        exam.setAuthorId(authorId);

        return examRepository.save(exam);
    }

    @MutationMapping
    public Exam updateExam(@Argument String id, @Argument String title, @Argument String description, @Argument String author, @Argument String authorId) throws Exception {
        Exam exam = examRepository
                .findById(id)
                .orElseThrow(() -> new Exception("Exam not found by id: " + id));
        System.out.println(exam);
        if(title != null) {
            exam.setTitle(title);
        }
        if(description != null) {
            exam.setDescription(description);
        }
        if(author != null) {
            exam.setAuthor(author);
        }
        if(authorId != null) {
            exam.setAuthorId(authorId);
        }

        return examRepository.save(exam);
    }
}
