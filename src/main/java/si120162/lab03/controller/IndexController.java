package si120162.lab03.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import si120162.lab03.model.ListaTarefa;
import si120162.lab03.model.Tarefa;
import si120162.lab03.repo.ListaTarefaRepository;

@RestController
@RequestMapping("/")
public class IndexController {
	@RequestMapping(value = "/", method = RequestMethod.GET)
	public ModelAndView getIndex() {
		ModelAndView model = new ModelAndView();
		model.setViewName("toDoList");
		return model;

	}

	@Autowired
	ListaTarefaRepository listaTarefaRepository;

	@RequestMapping(value = "/listarListasTarefas", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<ListaTarefa>> listarListasTarefas() {

		return new ResponseEntity<>(listaTarefaRepository.findAll(), HttpStatus.OK);
	}
	
	@RequestMapping(value = "/criarListaTarefa", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Object> criarListaTarefa(@RequestBody ListaTarefa lista) {
		
		listaTarefaRepository.save(lista);
		return new ResponseEntity<>( HttpStatus.OK);
	}
	
	@RequestMapping(value = "/excluirLista", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Object> atualizarListasTarefas(@RequestBody ListaTarefa listasAtualizada) {
		
		listaTarefaRepository.delete(listasAtualizada);
		return new ResponseEntity<>( HttpStatus.OK);
	}
	
	
	@RequestMapping(value = "/excluirTodasListas", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Object> excluirTodasListas() {
		
		listaTarefaRepository.deleteAll();
		return new ResponseEntity<>( HttpStatus.OK);
	}
	
	@RequestMapping(value = "/atualizarListaTarefa", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Object> incluiTarefa(@RequestBody ListaTarefa lista) {
		
		listaTarefaRepository.save(lista);
		return new ResponseEntity<>( HttpStatus.OK);
	}
	
}
