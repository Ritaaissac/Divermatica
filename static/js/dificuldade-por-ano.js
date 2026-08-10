window.dificuldadePorAno = (() => {
  const configuracoes = {
    "1": {
      adicao: {
        maxPrimeiro: 10,
        maxSegundo: 10,
        maxOpcao: 20,
        minOpcao: 1
      },
      subtracao: {
        minPrimeiro: 5,
        maxPrimeiro: 10,
        minSegundo: 1,
        maxSegundo: 5,
        resultadoMin: 0,
        falsoAmplitude: 3
      },
      multiplicacao: {
        maxNumero: 5
      },
      divisao: {
        maxQuociente: 5,
        maxDivisor: 5
      }
    },
    "2": {
      adicao: {
        maxPrimeiro: 20,
        maxSegundo: 20,
        maxOpcao: 40,
        minOpcao: 1
      },
      subtracao: {
        minPrimeiro: 10,
        maxPrimeiro: 20,
        minSegundo: 1,
        maxSegundo: 10,
        resultadoMin: 0,
        falsoAmplitude: 4
      },
      multiplicacao: {
        maxNumero: 6
      },
      divisao: {
        maxQuociente: 6,
        maxDivisor: 6
      }
    },
    "3": {
      adicao: {
        maxPrimeiro: 30,
        maxSegundo: 30,
        maxOpcao: 60,
        minOpcao: 1
      },
      subtracao: {
        minPrimeiro: 20,
        maxPrimeiro: 30,
        minSegundo: 1,
        maxSegundo: 15,
        resultadoMin: 0,
        falsoAmplitude: 5
      },
      multiplicacao: {
        maxNumero: 10
      },
      divisao: {
        maxQuociente: 10,
        maxDivisor: 10
      }
    },
    "4": {
      adicao: {
        maxPrimeiro: 50,
        maxSegundo: 50,
        maxOpcao: 90,
        minOpcao: 1
      },
      subtracao: {
        minPrimeiro: 30,
        maxPrimeiro: 60,
        minSegundo: 1,
        maxSegundo: 20,
        resultadoMin: 0,
        falsoAmplitude: 6
      },
      multiplicacao: {
        maxNumero: 12
      },
      divisao: {
        maxQuociente: 12,
        maxDivisor: 12
      }
    },
    "5": {
      adicao: {
        maxPrimeiro: 80,
        maxSegundo: 80,
        maxOpcao: 140,
        minOpcao: 1
      },
      subtracao: {
        minPrimeiro: 40,
        maxPrimeiro: 80,
        minSegundo: 1,
        maxSegundo: 25,
        resultadoMin: 0,
        falsoAmplitude: 7
      },
      multiplicacao: {
        maxNumero: 12
      },
      divisao: {
        maxQuociente: 12,
        maxDivisor: 12
      }
    }
  };

  function obterAnoEscolar() {
    const valor = sessionStorage.getItem('ano_escolar');
    const numero = Number(String(valor || '').replace(/\D/g, ''));

    if (Number.isFinite(numero) && numero >= 1 && numero <= 5) {
      return numero;
    }

    return 1;
  }

  function obterConfiguracao(chave) {
    const ano = obterAnoEscolar();
    const grupo = configuracoes[ano] || configuracoes['1'];
    return grupo[chave] || configuracoes['1'][chave];
  }

  return {
    configuracoes,
    obterAnoEscolar,
    obterConfiguracao
  };
})();
