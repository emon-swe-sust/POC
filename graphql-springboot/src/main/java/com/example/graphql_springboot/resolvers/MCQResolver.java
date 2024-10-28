package com.example.graphql_springboot.resolvers;

import com.example.graphql_springboot.model.MCQ;
import com.example.graphql_springboot.repository.MCQRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

import java.util.List;

@Controller
public class MCQResolver {

    @Autowired
    public MCQRepository mcqRepository;

    @QueryMapping
    public List<MCQ> getAllMCQs() {
        return mcqRepository.findAll();
    }

    @QueryMapping
    public List<MCQ> getMCQsByExamID(@Argument String examId) {
        System.out.println("getMCQByExamId: " + examId);
        return mcqRepository.findByExamId(examId);
    }

    @MutationMapping
    public MCQ addMCQ(@Argument String question, @Argument List<String> options, @Argument String examId, @Argument String answer) {
        MCQ mcq = new MCQ();
        mcq.setQuestion(question);
        mcq.setExamId(examId);
        mcq.setAnswer(answer);
        mcq.setOptions(options);

        return mcqRepository.save(mcq);
    }

    @MutationMapping
    public MCQ updateMCQ(@Argument String id, @Argument List<String> options, @Argument String examId, @Argument String answer) throws Exception{
        MCQ mcq = mcqRepository
                .findById(id)
                .orElseThrow(() -> new Exception("MCQ not found by id: " + id));
        if(options != null) {
            mcq.setOptions(options);
        }
        if(examId != null) {
            mcq.setExamId(examId);
        }
        if(answer != null) {
            mcq.setAnswer(answer);
        }
        return mcqRepository.save(mcq);
    }
}
