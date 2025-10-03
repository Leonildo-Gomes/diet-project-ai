# Roadmap do Backend (API) 🚀

Este documento descreve os próximos passos e melhorias planejadas para a API do projeto Dieta.

---

## Fase 1: Robustez e Otimização da API

*O objetivo desta fase é fortalecer a API existente e prepará-la para novas funcionalidades.*

- [ ] **Padronizar Respostas de Erro:** Garantir que a API sempre retorne respostas de erro consistentes e com os status HTTP corretos (e.g., 400 para input inválido, 500 para falha interna).
- [ ] **Refinar o Prompt da IA:**
    - [ ] Otimizar o prompt enviado à IA para obter respostas mais consistentes e fáceis de parsear.
    - [ ] Adicionar instruções para que a IA retorne a resposta em um formato estruturado (ex: JSON em vez de texto puro).
- [ ] **Implementar Logging:** Adicionar um sistema de logging (como Pino, que integra bem com Fastify) para monitorar requisições e erros.

---

## Fase 2: Suporte a Novas Funcionalidades

*O objetivo desta fase é expandir a lógica de negócio para suportar as novas funcionalidades do frontend.*

- [ ] **Suporte a Restrições Alimentares:**
    - [ ] Modificar o endpoint de geração de dieta para aceitar parâmetros de restrições/alergias.
    - [ ] Integrar essas informações dinamicamente no prompt da IA.
- [ ] **Endpoint para Geração de Lista de Compras:**
    - [ ] Criar um novo endpoint (`/shopping-list`, por exemplo).
    - [ ] Implementar a lógica que processa um plano de dieta e gera uma lista de compras consolidada.
- [ ] **Suporte a Informações Nutricionais:**
    - [ ] Atualizar o prompt da IA para solicitar estimativas de calorias e macronutrientes.
    - [ ] Estruturar esses dados na resposta da API.

---

## Fase 3: Funcionalidades Avançadas e Escalabilidade

*O objetivo desta fase é adicionar funcionalidades complexas e garantir a qualidade e escalabilidade da API.*

- [ ] **Implementar Autenticação e Banco de Dados:**
    - [ ] Criar modelos (schema) no banco de dados para `User` e `DietPlan`.
    - [ ] Desenvolver endpoints para registro (`/register`), login (`/login`) e gerenciamento de sessão (e.g., com JWT).
    - [ ] Criar endpoints seguros para salvar (`POST /plans`) e buscar (`GET /plans`) os planos de um usuário.
- [ ] **Configurar Testes Automatizados:**
    - [ ] Instalar e configurar um framework de testes (como Jest ou Vitest).
    - [ ] Escrever testes unitários para a lógica de negócio e testes de integração para os endpoints da API.
- [ ] **Implementar Streaming da Resposta:** Modificar o endpoint de geração de dieta para enviar a resposta da IA em chunks (streaming), em vez de esperar a conclusão total.
