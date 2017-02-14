angular.module("toDoList", []).controller("toDoListCtr", function ($scope, $http) {
	
	vm = this;
	
	vm.app = "To do List";
	
	/*Objetos*/
	vm.listaTarefas = [];
	vm.nomeTarefa = "";
	vm.totalTarefasCompletar = vm.listaTarefas.length;
	vm.totalTarefasTerminada = 0;
	vm.porcentagem = 0;
	vm.isIncluir = false;
	vm.isContato = false;
	vm.listasTarefas = {};
	/*Metodos*/
	
	vm.listarListasTarefas = listarListasTarefas;
	vm.limparLista = limparLista;
	vm.adicionarTarefa = adicionarTarefa;
	vm.contabilizarTarefa = contabilizarTarefa;
	vm.excluirTarefa = excluirTarefa;
	vm.calcularPercentual = calcularPercentual;
	vm.listarContato 		= listarContato;
	
	listarListasTarefas();
	function listarListasTarefas() {
		
		$http.get("/listarListasTarefas").then(function (response){
			vm.listasTarefas = response.data;
			contabilizarTarefa();
			calcularPercentual();
		}, function (response){
		});
		
		
	};
	
	function listarContato(){
		vm.isIncluir = false;
		vm.isContato = true;
		vm.isAbrirLista = false;
		vm.isExcluirTodasListas = false;
	}
	
	vm.incluirLista = incluirLista;
	vm.cancelar = cancelar;
	vm.confirmarIncluir = confirmarIncluir;
	vm.listaIncluir = {};
	
	vm.abrirLista = abrirLista;
	vm.nomeLista = "To do List";
	vm.listaTarefas = [];
	vm.objTarefasEnvio = {};
	vm.isAbrirLista = false;
	vm.excluirLista = excluirLista;
	
	function abrirLista(listaTarefas){
		vm.isIncluir = false;
		vm.isContato = false;
		vm.isExcluirTodasListas = false;
		vm.isAbrirLista = true;
		vm.listaTarefas = [];
		
		vm.objTarefasEnvio = listaTarefas;
		vm.listaTarefas = listaTarefas.listaTarefas;
		
		vm.nomeLista = listaTarefas.nomeLista;
		vm.totalTarefasCompletar = vm.listaTarefas.length;
		contabilizarTarefa();
	}
	
	function incluirLista(){
		vm.isIncluir = true;
		vm.isContato = false;
		vm.isExcluirTodasListas = false;
		vm.listaIncluir = {};
		vm.listaIncluir.nome = "";
	}
	
	function cancelar(){
		vm.isIncluir = false;
		vm.isContato = false;
		vm.isExcluirTodasListas = false;
		vm.isAbrirLista = true;
		contabilizarTarefa();
	}
	
	function confirmarIncluir(){
		vm.isIncluir = false;
		vm.isContato = false;
		vm.isExcluirTodasListas = false;
		
		var lista = {};
		lista.listaTarefas = [];
		lista.nomeLista = vm.listaIncluir.nome;
		
		$http.post("/criarListaTarefa", lista).then(function (response){
			vm.isIncluir = true;
			vm.isContato = false;
			vm.isExcluirTodasListas = false;
			listarListasTarefas();
			vm.listaIncluir = {};
			vm.listaIncluir.nome = "";
		}, function (response){
		});
		
	}
	
	function excluirLista(){
		var listasAtualizada = [];
		
		for(var i = 0; i < vm.listasTarefas.length; i++){
			if(vm.listasTarefas[i].id != vm.objTarefasEnvio.id ){
				listasAtualizada.push(vm.listasTarefas[i]);
			}
		}
		
		$http.post("/excluirLista", vm.objTarefasEnvio).then(function (response){
			vm.isIncluir = true;
			vm.isContato = false;
			vm.isExcluirTodasListas = false;
			listarListasTarefas();
			vm.listaIncluir = {};
			vm.listaIncluir.nome = "";
		}, function (response){
		});
	}
	
	
	vm.excluirTodasListas = excluirTodasListas;
	vm.isExcluirTodasListas = false;
	vm.chamarExcluirTodasListas = chamarExcluirTodasListas;
	
	function chamarExcluirTodasListas(){
		vm.isExcluirTodasListas = true;
		vm.isIncluir = false;
		vm.isContato = false;
		vm.isAbrirLista = false;
	}
	
	function excluirTodasListas(){
		$http.get("/excluirTodasListas").then(function (response){
			vm.isIncluir = true;
			vm.isContato = false;
			vm.isExcluirTodasListas = false;
			listarListasTarefas();
			vm.listaIncluir = {};
			vm.listaIncluir.nome = "";
		}, function (response){
		});
	}
	
	function limparLista(){
		vm.listaTarefas = [];
		contabilizarTarefa();
	}
	
	function adicionarTarefa(){
		
		var obj = {};
		obj.nomeTarefa = vm.nomeTarefa;
		obj.concluida = false;
		vm.listaTarefas.push(obj);
		vm.nomeTarefa = "";
		
		$http.post("/atualizarListaTarefa", vm.objTarefasEnvio).then(function (response){
			contabilizarTarefa();
		}, function (response){
		});
		
		
	}
	
	vm.exportToExcel = exportToExcel;
	function exportToExcel() {
		
         var colunas = [
        	 {title: "Finalizada", key: "finalizada"},
        	 {title: "Nome", key: "nome"},
        	 ];
         
         var obj = {};
    	 var linhas = [];
    	 
    	 
    	 for(var i = 0; i < vm.objTarefasEnvio.listaTarefas.length; i++){
    		 obj.nome = vm.objTarefasEnvio.listaTarefas[i].nomeTarefa;
    		 obj.finalizada = vm.objTarefasEnvio.listaTarefas[i].concluida;
    		 
    		 console.log("obj", i ,obj);
    		 
    		 linhas.push(obj);
    		 obj = {};
    	 }
    	 
         /*Criando o PDF*/
         var doc = new jsPDF('p', 'pt');
         doc.text(200, 30, "Lista de Tarefas " + vm.nomeLista);
         doc.autoTable(colunas, linhas, {});
         doc.save("lista_tarefas_"+vm.nomeLista.toLowerCase()+'.pdf');
 	    	
		
    }
	
	
	function contabilizarTarefa(){
			var concluida = 0;
			var naoConcluida = 0;
			
			for(var i = 0; i < vm.listaTarefas.length ; i++){
				if(vm.listaTarefas[i].concluida === true){
					concluida++;
				}else{
					naoConcluida++;
				}
			}
			
			vm.totalTarefasCompletar = naoConcluida;
			vm.totalTarefasTerminada = concluida;
			
			calcularPercentual();
		
	}
	
	function excluirTarefa(tarefa){
		
		var lista = [];
		for(var i = 0; i < vm.listaTarefas.length ; i++){
			if(vm.listaTarefas[i].nomeTarefa != tarefa.nomeTarefa){
				lista.push(vm.listaTarefas[i]);
			}
		}
		vm.listaTarefas = lista;
		vm.objTarefasEnvio.listaTarefas = vm.listaTarefas;
		
		$http.post("/atualizarListaTarefa", vm.objTarefasEnvio).then(function (response){
			contabilizarTarefa();
		}, function (response){
		});
		
	}
	
	function calcularPercentual(){
		setTimeout(function(){ 
			if(vm.listaTarefas.length == 0){
				vm.porcentagem = 100;
			}else{
				vm.porcentagem = (vm.totalTarefasTerminada * 100) / vm.listaTarefas.length;
			}
			document.getElementById("pg").value = vm.porcentagem;
		}, 100);
	}
	
	vm.atualizarDadosLista = atualizarDadosLista;
	function atualizarDadosLista(){
		
		vm.objTarefasEnvio.listaTarefas = vm.listaTarefas;
		
		$http.post("/atualizarListaTarefa", vm.objTarefasEnvio).then(function (response){
			contabilizarTarefa();
		}, function (response){
		});
	}
	
});

