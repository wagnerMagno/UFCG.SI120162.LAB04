package si120162.lab03.model;

import java.io.Serializable;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity(name = "ListaTarefa")
@Table(name = "Tb_ListaTarefa")
public class ListaTarefa implements Serializable {
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;	
	private String nomeLista;	
	@OneToMany(cascade=CascadeType.ALL)
	private List<Tarefa> listaTarefas;

	public ListaTarefa() {
		super();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNomeLista() {
		return nomeLista;
	}

	public void setNomeLista(String nomeLista) {
		this.nomeLista = nomeLista;
	}

	public List<Tarefa> getListaTarefas() {
		return listaTarefas;
	}

	public void setListaTarefas(List<Tarefa> listaTarefas) {
		this.listaTarefas = listaTarefas;
	}

	public ListaTarefa(String textoListaTarefa, List<Tarefa> listaTarefas) {
		super();
		this.nomeLista = textoListaTarefa;
		this.listaTarefas = listaTarefas;
	} 
	
	
}
