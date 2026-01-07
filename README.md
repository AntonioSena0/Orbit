<details>
<summary><b>🇧🇷 Português</b></summary>

# Orbit | Gestão de Tarefas Interestelar

**Orbit** é um ecossistema completo de produtividade projetado para organizar o caos do dia a dia através de uma interface inspirada na exploração espacial. O sistema utiliza uma arquitetura moderna dividida entre um backend robusto em Spring Boot e um frontend dinâmico em Next.js.

O projeto foca na experiência do usuário (UX) e na integridade dos dados, tratando cada tarefa como uma unidade orbital que exige atenção e monitoramento constante.

---

## 🚀 Funcionalidades Principais

- **Gerenciamento Full CRUD:** Criação, listagem, edição e exclusão de missões (tarefas) com diferentes níveis de prioridade.
- **Autenticação JWT:** Proteção de rotas e dados através de tokens de segurança, garantindo que cada explorador acesse apenas seu próprio setor.
- **Interface Multilíngue:** Suporte nativo para Português (BR) e Inglês (US) com persistência de preferência via LocalStorage.
- **Telemetria de Dados:** Painel de estatísticas que monitora o histórico total de missões concluídas e a performance na janela dos últimos 7 dias.
- **UI/UX Futurista:** Desenvolvido com Tailwind CSS e Framer Motion para animações fluidas, feedback visual de erros e transições de estado suaves.

## 🛠️ Stack Tecnológica

### Frontend
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)

### Backend
![Spring Boot](https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white)
![Java](https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)

### Infraestrutura
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)

## 🏗️ Arquitetura e Padrões de Projeto

O Orbit foi estruturado utilizando as melhores práticas de engenharia:

1.  **Arquitetura Cliente-Servidor:** Desacoplamento total entre a lógica de negócio (API REST) e a interface (SPA).
2.  **DTO (Data Transfer Objects):** Camada de transferência de dados para isolar entidades de banco de dados.
3.  **Hydration Management:** Lógica React para sincronização entre servidor e cliente (LocalStorage).
4.  **Security Filtering:** Filtros customizados no Spring Security para validação de tokens JWT.

---

## 📦 Como Instalar e Rodar (Docker)

A forma mais rápida de subir o ecossistema completo é utilizando o Docker Compose:

1. **Clone o repositório:**
   ```bash
   git clone [https://github.com/seu-usuario/orbit.git](https://github.com/seu-usuario/orbit.git)
   ```

2. **Suba os containers:**
    ```Bash
    docker-compose up -d
    ```
    *Este comando iniciará o Banco de Dados MySQL, o Backend Spring Boot e o Frontend Next.js simultaneamente*

    **Use**
    ```bash
    docker-compose logs -f
    ```
    *Caso queira acompanhar os logs*

3. **Acesse sua aplicação:**
    - *Frontend*: http://localhost:3000
    - *Backend*: http://localhost:8080

## 📄 Licença

*Este projeto está sob a licença MIT.*

© 2026 Antonio Sena. Todos os direitos reservados. Desenvolvido com ☕ e foco espacial por Antonio Sena.

</details>

<details>
<summary><b>🇺🇸 English</b></summary>

# Orbit | Interstellar Task Management

**Orbit** is a complete productivity ecosystem designed to organize the chaos of everyday life through a space-exploration-inspired interface. The system relies on a modern architecture split between a robust Spring Boot backend and a dynamic Next.js frontend.

The project places a strong emphasis on user experience (UX) and data integrity, treating each task as an orbital unit that requires constant attention and monitoring.

---

## 🚀 Core Features

- **Full CRUD Management:** Create, list, update, and delete missions (tasks) with multiple priority levels.
- **JWT Authentication:** Secure routes and data using security tokens, ensuring that each explorer can access only their own sector.
- **Multilingual Interface:** Native support for Portuguese (BR) and English (US), with language preference persisted via LocalStorage.
- **Data Telemetry:** Statistics dashboard that tracks the total number of completed missions and performance over the last 7 days.
- **Futuristic UI/UX:** Built with Tailwind CSS and Framer Motion, delivering smooth animations, visual error feedback, and seamless state transitions.

## 🛠️ Technology Stack

### Frontend
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)

### Backend
![Spring Boot](https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white)
![Java](https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)

### Infrastructure
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)

## 🏗️ Architecture and Design Patterns

Orbit was structured following established software engineering best practices:

1. **Client–Server Architecture:** Complete decoupling between business logic (REST API) and the user interface (SPA).
2. **DTO (Data Transfer Objects):** Dedicated data transfer layer to isolate database entities.
3. **Hydration Management:** React logic to synchronize server-side and client-side state (LocalStorage).
4. **Security Filtering:** Custom Spring Security filters for JWT token validation.

---

## 📦 How to Install and Run (Docker)

The fastest way to start the full ecosystem is by using Docker Compose:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/orbit.git
    ```

2. **Start the containers:**
    ```bash
    docker-compose up -d
    ```
    *This command will start the MySQL database, the Spring Boot backend, and the Next.js frontend simultaneously.*

    **Use**
    ```bash
    docker-compose logs -f
    ```
    *to follow container output.*

3. **Access the application:**
    - *Frontend*: http://localhost:3000
    - *Backend*: http://localhost:8080

## 📄 License

*This project is licensed under the MIT License.*

© 2026 Antonio Sena. All rights reserved. Developed with coffee and a space-focused mindset by Antonio Sena.

</details>