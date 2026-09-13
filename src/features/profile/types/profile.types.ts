// Campos alinhados exactamente com o que a API aceita em PUT /company
// (UpdateCompanyRequest) — não existe endpoint para editar o nome/email da
// própria conta (User), por isso esses dois ficam só como leitura no ecrã,
// vindos da sessão autenticada.
export interface CompanyFormState {
  name: string
  contactName: string
  phone: string
  email: string
  bankName: string
  bankAccountHolder: string
  // Fica sempre vazio ao carregar — a API nunca devolve o número completo,
  // só uma versão mascarada. Só é enviado ao guardar se o utilizador o
  // preencher (para não apagar o valor guardado ao deixar em branco).
  bankAccountNumber: string
}
