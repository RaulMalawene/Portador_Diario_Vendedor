# Vendor Front - Portal do Vendedor

Este é o frontend do Vendor Portal, o painel onde o vendedor faz login e gere os seus produtos, categorias, inventário e encomendas, com um pequeno dashboard para ter uma visão geral do negócio. Consome a API em Laravel, o projeto irmão Vendor-back, e está publicado na Vercel.

## Links

Aplicação (área do vendedor): https://portadordiariovendedor-eosin.vercel.app

Área do cliente: https://portadordiariovendedor-eosin.vercel.app/cliente/login

## Tecnologias

Foi feito em Vue 3 com a Composition API e TypeScript, empacotado com o Vite. Uso o Vue Router para a navegação, o Pinia para guardar a sessão do vendedor, e os ícones vêm do Lucide. Os relatórios em PDF são gerados no próprio navegador com o jsPDF. Não usei nenhuma framework de CSS nem biblioteca de gráficos, o estilo e o único gráfico do dashboard foram feitos à mão. Os testes correm com o Vitest.

## Como correr

Precisas do Node 20 ou mais recente e do backend a correr. Depois é o habitual.

```
npm install
cp .env.example .env
npm run dev
```

A aplicação abre em `http://localhost:5173`.

## Variável de ambiente

Só precisas de uma, o endereço da API.

```
VITE_API_URL=http://localhost:8000/api
```

Em produção esta variável aponta para o domínio da Vercel seguido de `/api`, para os pedidos passarem pelo proxy que explico mais abaixo.

## Área do cliente e como testar as encomendas

Além do painel do vendedor, o projeto tem uma pequena área para o cliente, onde o objetivo é testar o desafio das encomendas de ponta a ponta.

A conta que o vendedor cria é a mesma que faz login na área do cliente. Para lá chegar, acrescenta `/cliente/login` ao endereço, ou seja, entra em https://portadordiariovendedor-eosin.vercel.app/cliente/login e faz login com a conta que criaste do lado do vendedor.

Uma vez lá dentro, podes reproduzir o cenário do desafio. Imagina um produto com 10 unidades em stock. Dois clientes fazem encomendas desse produto ao mesmo tempo, o cliente A pede 5 e o cliente B pede 7. Para simular isto tens duas hipóteses. Podes abrir duas abas do navegador em paralelo, ou fazer tudo numa só aba, porque a área do cliente tem um seletor no topo que te deixa alternar entre os dois clientes. Depois, do lado do vendedor, vais ver que não é possível confirmar as duas encomendas, porque juntas pedem mais do que as 10 unidades disponíveis. É esta a regra central do desafio.

## Como está organizado

O código está dividido por área de negócio, como auth, produtos, inventário e encomendas. Dentro de cada uma separei três camadas, a que fala com a API, a lógica, e os componentes. Fiz assim para a lógica não ficar presa dentro dos componentes e poder ser testada à parte.

Toda a comunicação com a API passa por um único ficheiro, um wrapper simples à volta do fetch. Desta forma não trouxe o axios só para isto, e o tratamento dos erros de validação do Laravel fica num só sítio. O vendedor e o cliente têm sessões separadas, o vendedor com o Pinia e o token no armazenamento local, o cliente com uma sessão própria mais simples.

## Dificuldades

A parte que me deu mais trabalho foi ligar o frontend ao backend em produção. O frontend na Vercel corre em https, mas a API responde em http, e o navegador bloqueia um site seguro a chamar um endereço inseguro, aquilo a que se chama conteúdo misto. Demorei algum tempo a perceber que isto não se resolvia no código da aplicação. A solução acabou por ser um proxy no `vercel.json`, que apanha os pedidos feitos a `/api` e os reencaminha do lado do servidor para a minha API. Assim o navegador só vê o domínio seguro da Vercel e deixa de bloquear.

## Melhorias futuras

O que mais quero fazer a seguir é desenvolver a área do cliente como deve ser, bem organizada e completa, com registo próprio, dashboard e a gestão das suas encomendas, em vez da consulta simples que existe hoje.

Para além disso, quero alargar os testes aos ecrãs mais importantes, tirar o IP fixo do `vercel.json` e passá-lo para uma variável de ambiente, e reforçar a autenticação com um fluxo de token de renovação. Gostaria também de dar ao backend um endereço seguro próprio, para dispensar o proxy, e de desenvolver a parte das imagens, permitindo que ao registar um produto o vendedor lhe possa anexar fotografias.
