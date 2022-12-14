const data = require('../data/zoo_data');

const { species } = data;
// console.log(species)

function filtroPorNome(arrayDeObjetos) {
  return arrayDeObjetos.map(({ name }) => name);
}

function filtrandoAnimais(localizacao) {
  const animaisFiltrados = species.filter(({ location }) => location === localizacao);
  return filtroPorNome(animaisFiltrados);
}

function especiesPorRegiao() {
  return {
    NE: filtrandoAnimais('NE'),
    NW: filtrandoAnimais('NW'),
    SE: filtrandoAnimais('SE'),
    SW: filtrandoAnimais('SW'),
  };
}

function nomeandoAnimais(nome) {
  const { residents } = species.find(({ name }) => name === nome);
  return residents.map(({ name }) => name);
}

function especiesPorNome() {
  const { NE, NW, SE, SW } = especiesPorRegiao();
  return {
    NE: NE.map((nome) => ({ [nome]: nomeandoAnimais(nome) })),
    NW: NW.map((nome) => ({ [nome]: nomeandoAnimais(nome) })),
    SE: SE.map((nome) => ({ [nome]: nomeandoAnimais(nome) })),
    SW: SW.map((nome) => ({ [nome]: nomeandoAnimais(nome) })),
  };
}

function especiesOrdenadas({ NE, NW, SE, SW }) {
  return {
    NE: NE.map((objeto) => ({ [Object.keys(objeto)]: Object.values(objeto)[0].sort() })),
    NW: NW.map((objeto) => ({ [Object.keys(objeto)]: Object.values(objeto)[0].sort() })),
    SE: SE.map((objeto) => ({ [Object.keys(objeto)]: Object.values(objeto)[0].sort() })),
    SW: SW.map((objeto) => ({ [Object.keys(objeto)]: Object.values(objeto)[0].sort() })),
  };
}

function nomeandoPorSexo(especie, sexo) {
  const { residents } = species.find(({ name }) => name === especie);
  const animaisPorSexo = residents.filter(({ sex }) => sex === sexo);
  return animaisPorSexo.map(({ name }) => name);
}

function especiesPorSexo(sexo) {
  const { NE, NW, SE, SW } = especiesPorRegiao();
  return {
    NE: NE.map((especie) => ({ [especie]: nomeandoPorSexo(especie, sexo) })),
    NW: NW.map((especie) => ({ [especie]: nomeandoPorSexo(especie, sexo) })),
    SE: SE.map((especie) => ({ [especie]: nomeandoPorSexo(especie, sexo) })),
    SW: SW.map((especie) => ({ [especie]: nomeandoPorSexo(especie, sexo) })),
  };
}

function analisandoOrdenacao(sex) {
  if (!sex) {
    return especiesOrdenadas(especiesPorNome());
  } return especiesOrdenadas(especiesPorSexo(sex));
}

function getAnimalMap(options) {
  if (!options || !options.includeNames) return especiesPorRegiao();

  const { sex, sorted } = options;

  if (sorted) return analisandoOrdenacao(sex);

  if (sex) return especiesPorSexo(sex);

  return especiesPorNome();
}

module.exports = getAnimalMap;

// ---------------------------------------------------------------- ANOTA????ES GERAIS ---------------------------------------------------------------------------------
// A fun????o nomeandoAnimais(arrayDeObjetos) retorna:
//
// [ 'lions', 'giraffes' ]
//
// --------------------------------------------------------------------------------------------------
// A fun????o filtrandoAnimais(localizacao) retorna:
//
// [
//   {
//     id: '0938aa23-f153-4937-9f88-4858b24d6bce',
//     name: 'lions',
//     popularity: 4,
//     location: 'NE',
//     availability: [ 'Tuesday', 'Thursday', 'Saturday', 'Sunday' ],
//     residents: [ [Object], [Object], [Object], [Object] ]
//   },
//   {
//     id: '01422318-ca2d-46b8-b66c-3e9e188244ed',
//     name: 'giraffes',
//     popularity: 4,
//     location: 'NE',
//     availability: [ 'Wednesday', 'Thursday', 'Tuesday', 'Friday' ],
//     residents: [ [Object], [Object], [Object], [Object], [Object], [Object] ]
//   }
// ]
//
//--------------------------------------------------------------------------------------------------
// A fun????o especiesPorRegiao() retorna:
//
// {
//   NE: ['lions', 'giraffes'],
//   NW: ['tigers', 'bears', 'elephants'],
//   SE: ['penguins', 'otters'],
//   SW: ['frogs', 'snakes'],
// };
//
//--------------------------------------------------------------------------------------------------
// A fun????o nomeandoAnimais(nome) retorna em residents:
//
// [
//   { name: 'Zena', sex: 'female', age: 12 },
//   { name: 'Maxwell', sex: 'male', age: 15 },
//   { name: 'Faustino', sex: 'male', age: 7 },
//   { name: 'Dee', sex: 'female', age: 14 }
// ]
//
// Na sequ??ncia, por meio da constante nomes, retorna:
//
// [ 'Zena', 'Maxwell', 'Faustino', 'Dee' ]
//
//--------------------------------------------------------------------------------------------------
// A fun????o especiesPorNomeRegiao() desestrutura cada chave do objeto gerado em especiesPorRegiao(). O valor de cada chave ?? um array com os nomes das esp??cies. Sendo assim, posso usar o map() para percorrer os elementos.
//
// NE.map((nome) => ({ [nome]: nomeandoAnimais(nome)}))
//
// O objetivo do map() ?? gerar um objeto no lugar de cada string de nomes. A pr??pria string ser?? a chave do objeto e seu valor ?? o resultado da fun????o nomeandoAnimais().
// O resultado ??:
//
// {
//   NE: [ { lions: [Array] }, { giraffes: [Array] } ],
//   NW: [ { tigers: [Array] }, { bears: [Array] }, { elephants: [Array] } ],
//   SE: [ { penguins: [Array] }, { otters: [Array] } ],
//   SW: [ { frogs: [Array] }, { snakes: [Array] } ]
// }
//
//--------------------------------------------------------------------------------------------------
// A fun????o nomeandoAnimais(nome) vai encontrar o objeto da esp??cie que est?? ligada ao nome por meio do find(). Desse retorno, s?? quero acessar a propriedade residents. Ent??o j?? fiz a desestrutura????o direta:
//
// const { residents } = species.find(({ name }) => name === nome);
//
// A express??o acima retorna:
//
// [
//   { name: 'Zena', sex: 'female', age: 12 },
//   { name: 'Maxwell', sex: 'male', age: 15 },
//   { name: 'Faustino', sex: 'male', age: 7 },
//   { name: 'Dee', sex: 'female', age: 14 }
// ]
//
// Entretanto, s?? quero os nomes. Ent??o, usei o map() para refazer o array.
//
// residents.map(({ name }) => name);
//
// O retorno do map() ser??:
//
// [ 'Zena', 'Maxwell', 'Faustino', 'Dee' ]
//
//--------------------------------------------------------------------------------------------------
// A fun????o todosNomesOrdenados() vai pegar o objeto resultado da fun????o especiesPorNomeERegiao() e ajust??-lo, ordenando os nomes dos bichos de cada esp??cie. Para isso, usei novamente o map() e os m??todos Object.keys() e Object.values() para acessar as chaves e valores de cada objeto que est?? dentro do array que comp??e as localiza????es.
//
// Como as chaves s??o o nome da esp??cie, n??o tenho um nome padr??o para cham??-las. Assim, usei [Object.keys(objeto)] para fazer essa chamada. Depois, fiz Object.values(objeto) para acessar o valor da chave. Por??m, o valor ?? um array e Object.values colocou esse array dentro de outro array: [ [ 'Zena', 'Maxwell', 'Faustino', 'Dee' ] ]. Sendo assim, precisei usar o [0] para acessar o array com os nomes e a?? sim dar o sort().
//
//--------------------------------------------------------------------------------------------------
// Inicialmente, eu tinha colocado a fun????o getAnimalMap() da seguinte forma:
//
// if (!options) {
//   return especiesPorRegiao();
// }

// const chaves = Object.keys(options);
// const valores = Object.values(options);
// const machoOuFemea = valores.find((elemento) => elemento === 'female' || elemento === 'male')

// if (chaves.includes('includeNames') && chaves.includes('sex') && chaves.includes('sorted')) {
//   return especiesOrdenadas(especiesPorSexo(machoOuFemea));
// }

// if (chaves.includes('includeNames') && chaves.includes('sex')) {
//   return especiesPorSexo(machoOuFemea);
// }

// if (chaves.includes('includeNames') && chaves.includes('sorted')) {
//   return especiesOrdenadas(especiesPorNome());
// }

// if (chaves.includes('includeNames')) {
//   return especiesPorNome();
// }

// return especiesPorRegiao();

// Precisei refatorar v??rias vezes, pois o Lint reclamava da complexidade e do n??mero de linhas.
