angular.module('contatooh').factory('Contato', function($resource) {
	return $resource('http://localhost:3000/contatos/:id');
});
