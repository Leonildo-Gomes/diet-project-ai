# Roadmap do Frontend 🚀

Este documento descreve os próximos passos e melhorias planejadas para o frontend da aplicação Dieta.

---

## Fase 1: Melhorias de Usabilidade e UX

*O objetivo desta fase é tornar a aplicação existente mais robusta, intuitiva e agradável de usar.*

- [ ] **Implementar Skeleton Loading:** Substituir o spinner de carregamento atual por um "esqueleto" da interface do plano de dieta para melhorar a percepção de velocidade.
- [ ] **Melhorar Apresentação dos Resultados:**
    - [ ] Formatar cada dia da semana usando componentes `Card`.
    - [ ] Estruturar as refeições (café da manhã, almoço, etc.) de forma clara dentro de cada card.
- [ ] **Aprimorar Formulário de Dados:**
    - [ ] Adicionar `Tooltips` ou `HoverCards` explicativas para campos como "Nível de Atividade".
    - [ ] Implementar um seletor de unidades (métrico/imperial) para peso e altura.
- [ ] **Adicionar Suporte a Tema Escuro (Dark Mode):** Implementar um toggle para alternar entre os temas claro e escuro.
- [ ] **Tratamento de Erros da API:** Criar componentes de alerta para exibir mensagens amigáveis quando o backend retornar um erro.

---

## Fase 2: Novas Funcionalidades Essenciais

*O objetivo desta fase é adicionar funcionalidades de alto valor que tornem a aplicação mais útil.*

- [ ] **Adicionar Campos de Restrições Alimentares:**
    - [ ] Incluir checkboxes ou um multi-select no formulário para o usuário indicar restrições (vegetariano, vegano, etc.) e alergias.
- [ ] **Interface para Lista de Compras:**
    - [ ] Criar uma nova seção ou um modal para exibir a lista de compras gerada pelo backend.
    - [ ] Adicionar um botão "Copiar Lista" ou "Imprimir".
- [ ] **Funcionalidade de Impressão/PDF:** Adicionar um botão para permitir que o usuário imprima ou salve o plano de dieta como PDF.

---

## Fase 3: Funcionalidades Avançadas e Qualidade de Código

*O objetivo desta fase é transformar a aplicação em um serviço completo e garantir sua manutenibilidade.*

- [ ] **Implementar Autenticação e Perfis de Usuário:**
    - [ ] Configurar NextAuth.js (ou similar) para login/registro.
    - [ ] Criar páginas de perfil e histórico de planos.
    - [ ] Proteger rotas que exigem que o usuário esteja logado.
- [ ] **Configurar Testes Automatizados:**
    - [ ] Instalar e configurar Jest e React Testing Library.
    - [ ] Escrever testes unitários para funções críticas e testes de componentes para as principais partes da UI.
- [ ] **Implementar Streaming da Resposta da IA:** Modificar a lógica de fetch para processar a resposta do backend em tempo real, exibindo o plano de dieta à medida que é gerado.
