# CONTROLE DE HÁBITOS (HABITFLOW)

[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)

Projeto pessoal construído com React, JavaScript e Tailwind CSS para registrar
tarefas diárias, controlar gastos e poupança de dinheiro e ver registros das
tarefas anteriores até 7 dias atrás. A criação desse projeto foi motivada por
querer mostrar que uma lista de tarefas (todo list) pode ser mais do que apenas
registrar tarefas simples, controlando hábitos e adotando melhores práticas na
vida pessoal.

## Instruções de instalação

### Pré-requisitos

#### Node (18.x ou superior)
#### Npm (Junto com o Node)
#### Git (Para clonagem do projeto)

---

1. Crie uma pasta no computador, e rode com um terminal:

```bash
git clone https://github.com/luizfritoli/habitflow.git
```

2. Após isso, rode:

```bash
cd habitflow
```

3. Por fim, instale as dependências:

```bash
npm install
```

## Instruções de uso

1. Para rodar o projeto, abra o terminal do VS Code e use:

```bash
npm run dev
```

O projeto abrirá de forma automática. Ou entre em http://localhost:3000
após o uso do comando.

2. No tópico "Afazeres do dia, há o campo "O que preciso fazer hoje?", é
   possível registrar tarefas diárias que o usuário deseja tornar um hábito ou
   precisa fazer no dia. Todas as tarefas dos últimos 7 dias poderão ser vistas no
   tópico "Tarefas passadas".

3. No campo "Quanto poupei hoje", coloca-se a quantidade de dinheiro que o
   usuário conseguiu poupar no dia. É salvo automaticamente. É possível resetar
   a contagem.

4. No tópico "Gráfico de gastos", há o campo "Dinheiro gasto de forma
   imprudente", onde o usuário digita a quantidade de dinheiro (apenas números)
   que gastou desnecessariamente e os gastos ficam registrados.

5. Ao registrar o primeiro gasto desnecessário, um gráfico aparece na tela, e
   conforme o usuário anota os gastos, ele pode analisar com o que mais gasta no
   gráfico de pizza.
