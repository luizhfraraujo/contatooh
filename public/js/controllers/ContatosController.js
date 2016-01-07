angular.module('contatooh').controller('ContatosController', function($scope, Contato) {

  $scope.contatos = [];

  $scope.total = 0;

  $scope.mensagem = {texto: ''};

  $scope.incrementa = function() {
    $scope.total++;
  };

  // Para o filtro
  $scope.filtro = '';

  function buscaContatos() {
    Contato.query(
      function(contatos) {
        $scope.contatos = contatos;
        $scope.mensagem = {};
      },
      function(erro) {
        console.log(erro);
        $scope.mensagem = {
          texto: 'Não foi possivel obter a lista de contatos'
        };
      }
    );
  }

  buscaContatos();

  // código para remover contato
  $scope.remove = function(contato) {
    Contato.delete({id: contato._id},
    buscaContatos,
      function(erro) {
        console.log(erro);
        $scope.mensagem = {
          texto: 'Não foi possivel remover o contato'
        };
      }
    );
  };

});
