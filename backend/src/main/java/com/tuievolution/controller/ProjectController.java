package com.tuievolution.controller;

import com.tuievolution.model.Project;
import com.tuievolution.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController // Burası bir REST API'dir. JSON döner.
@RequestMapping("/api/projects") // Bu adresten ulaşılır.
@CrossOrigin(origins = "http://localhost:3000") // DİKKAT: React'in çalıştığı porta izin veriyoruz. Yoksa CORS hatası alırsın.
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