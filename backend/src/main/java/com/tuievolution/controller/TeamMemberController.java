package com.tuievolution.controller;

import com.tuievolution.model.TeamMember;
import com.tuievolution.repository.TeamMemberRepository;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@CrossOrigin(origins = "https://tuievolution-backend.onrender.com") // Buraya Vercel linkinizi yazın
@RestController
@RequestMapping("/api/team")
public class TeamMemberController {

    private final TeamMemberRepository teamMemberRepository;

    public TeamMemberController(TeamMemberRepository teamMemberRepository) {
        this.teamMemberRepository = teamMemberRepository;
    }

    @GetMapping
    public List<TeamMember> getAllMembers() {
        return teamMemberRepository.findAll();
    }
}