package com.tuievolution.controller;

import com.tuievolution.model.Project;
import com.tuievolution.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "https://tuievolution-backend.onrender.com") // Buraya Vercel linkinizi yazın
@RestController
@RequestMapping("/api/projects")
public class ProjectController {

    @Autowired
    private ProjectService projectService;

    // GET İsteği: Tüm projeleri ver
    @GetMapping
    public List<Project> getAllProjects() {
        return projectService.getAllProjects();
    }

    // POST İsteği: Yeni proje ekle (Başlangıç verisi yüklemek için kullanabilirsin)
    @PostMapping
    public Project createProject(@RequestBody Project project) {
        return projectService.saveProject(project);
    }
}