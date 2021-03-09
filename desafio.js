// Usando o Redux (pode usar Immer ou Não).
// Crie uma store contendo os estados iniciais abaixo
// Crie as seguintes ações:
// aluno/INCREMENTAR_TEMPO, adiciona 1 dia de acesso
// aluno/REDUZIR_TEMPO, reduz 1 dia de acesso
// aluno/MODIFICAR_EMAIL(email), modifica o email do usuário
// aulas/COMPLETAR_AULA(id), completa a aula com base no ID passado
// aulas/COMPLETAR_CURSO, completa todas as aulas
// aulas/RESETAR_CURSO, reseta todas as aulas completas
// Crie constantes e action creators para as ações.
// Crie um reducer para aluno e um para aulas.
// Renderize na tela o nome, email, tempo restante e o total de aulas completas
// Configure a DevTools

const aluno = {
  nome: 'Bruno Mendes',
  email: 'andre@origamid.com',
  diasRestantes: 120,
}

const aulas = [
  {
    id: 1,
    nome: 'Design',
    completa: true,
  },
  {
    id: 2,
    nome: 'HTML',
    completa: false,
  },
  {
    id: 3,
    nome: 'CSS',
    completa: false,
  },
  {
    id: 4,
    nome: 'JavaScript',
    completa: false,
  },
]

//constants aluno
const INCREMENTAR_TEMPO = 'aluno/INCREMENTAR_TEMPO'
const REDUZIR_TEMPO = 'aluno/REDUZIR_TEMPO'
const MODIFICAR_EMAIL = 'aluno/MODIFICAR_EMAIL'

//constants aula
const COMPLETAR_AULA = 'aulas/COMPLETAR_AULA'
const COMPLETAR_CURSO = 'aulas/COMPLETAR_CURSO'
const RESETAR_CURSO = 'aulas/RESETAR_CURSO'

// action creators alunos
function incrementarTempo() {
  return { type: INCREMENTAR_TEMPO }
}

function reduzirTempo() {
  return { type: REDUZIR_TEMPO }
}

function modificarEmail(payload) {
  return { type: MODIFICAR_EMAIL, payload }
}

// action creators cursos
function completarAula(payload) {
  return { type: COMPLETAR_AULA, payload }
}

function completarCurso() {
  return { type: COMPLETAR_CURSO }
}

function resetarCurso() {
  return { type: RESETAR_CURSO }
}

// aluno reducer
function alunoReducer(state = aluno, action) {
  switch (action.type) {
    case INCREMENTAR_TEMPO:
      return { ...state, diasRestantes: state.diasRestantes + 1 }
    case REDUZIR_TEMPO:
      return { ...state, diasRestantes: state.diasRestantes - 1 }
    case MODIFICAR_EMAIL:
      return { ...state, email: action.payload }
    default:
      return state
  }
}

function aulasReducer(state = aulas, action) {
  switch (action.type) {
    case COMPLETAR_AULA:
      return state.map((aula) => {
        return aula.id === action.payload ? { ...aula, completa: true } : aula
      })

    case COMPLETAR_CURSO:
      return state.map((aula) => {
        return { ...aula, completa: true }
      })

    case RESETAR_CURSO:
      return state.map((aula) => {
        return { ...aula, completa: false }
      })

    default:
      return state
  }
}

const reducers = Redux.combineReducers({ alunoReducer, aulasReducer })
const store = Redux.createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

function render() {
  const dadosDiv = document.querySelector('#dadosAluno')
  const cursosDiv = document.querySelector('#cursos')

  const {
    alunoReducer: alunoState,
    aulasReducer: aulasState,
  } = store.getState()

  const { nome, email, diasRestantes } = alunoState

  dadosDiv.innerHTML = `
    nome: ${nome} <br> 
    email: ${email} <br> 
    dias restantes: ${diasRestantes}
  `

  let html = '<br><br> Aulas: <br>'

  aulasState.forEach((aula) => {
    html += `   
    id: ${aula.id} <br> 
    nome: ${aula.nome} <br> 
    completa ${aula.completa ? 'sim' : 'não'}
    <br> ========================== <br>    
    `
  })

  cursosDiv.innerHTML = html
}

render()

store.subscribe(render)

store.dispatch(modificarEmail('bruno@email.com'))

console.log('==store===')
console.log(store.getState())
console.log('=====')
