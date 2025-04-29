## 🌐 Iniciando o Frontend

Para iniciar a aplicação Angular localmente, execute:

```bash
ng serve
```

ou

```bash
ng s
```

### ⚠️ Observação:
Para usar um usuário com perfil de administrador e acessar menus restritos por permissão (role), é necessário alterar o papel do usuário no banco de dados manualmente:

```sql
UPDATE cadastro_usuario
SET role = 'adm'
WHERE id = {seu_id_de_usuario}
  AND role = 'user';
```

## 🌪️ Estrutura do Frontend (Angular)

A pasta `src/app` contém a organização principal da aplicação Angular:

- **`components/`**: Componentes de interface visual divididos por funcionalidade:
  - `auth/`: telas de login, cadastro etc.
  - `home/`: página inicial ou painel após login.

- **`guards/`**: Proteções de rota:
  - `auth.guard.ts`: impede acesso não autorizado a rotas protegidas.

- **`services/`**: Serviços para chamadas HTTP:
  - `auth/`: autenticação e autorização.
  - `candidatura/`: envio de candidaturas.
  - `vagas/`: gestão de vagas.
  - `notificacao.service.ts`: envio de notificações.

- **Arquivos principais:**
  - `app.component.ts`: componente raiz da aplicação.
  - `app.routes.ts`: definição de rotas.
  - `app.config.ts`: configuração da aplicação.
  - `main.ts` e `server.ts`: bootstrap e SSR (server-side rendering).

- **Arquivos de configuração:**
  - `angular.json`, `package.json`, `tsconfig.*`: configuração do Angular e TypeScript.



