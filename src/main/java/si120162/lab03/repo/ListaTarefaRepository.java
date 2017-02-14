package si120162.lab03.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import si120162.lab03.model.ListaTarefa;

public interface ListaTarefaRepository extends JpaRepository<ListaTarefa, Long	>{
	List<ListaTarefa> findAll();
}
