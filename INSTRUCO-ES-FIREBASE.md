# Guia Detalhado para Conectar seu Projeto ao Firebase

Para ativar a autenticação e todas as funcionalidades do Firebase no seu aplicativo, siga estes passos. O único passo manual que você precisa fazer é copiar suas chaves de configuração do Firebase para o arquivo correto no seu projeto.

## Passo 1: Acesse o Firebase Console

1.  Abra seu navegador e vá para o [Firebase Console](https://console.firebase.google.com/).
2.  Faça login com sua conta do Google.

## Passo 2: Encontre ou Crie seu Projeto Firebase

*   **Se você já tem um projeto**: Selecione o projeto que deseja usar na lista.
*   **Se você não tem um projeto**: Clique em **"Adicionar projeto"**, dê um nome a ele e siga as instruções na tela. Você pode desativar o Google Analytics se não precisar dele agora.

## Passo 3: Adicione o Firebase ao seu Aplicativo Web

Dentro do seu projeto no Firebase Console:

1.  Na página principal do projeto, você verá ícones para diferentes plataformas (iOS, Android, Web). Clique no ícone da Web **`</>`**.
2.  Se você já tem um app web, vá para o **Passo 4**. Caso contrário, você será solicitado a registrar seu aplicativo.
    *   Dê um apelido ao seu aplicativo (ex: "Minha Loja Next.js").
    *   Clique em **"Registrar aplicativo"**. Não precisa marcar a opção "Configurar o Firebase Hosting" agora.

## Passo 4: Copie a Configuração do Firebase

Após registrar o app, o Firebase exibirá um trecho de código com suas chaves de configuração. É isso que precisamos!

1.  O código se parecerá com isto:

    ```javascript
    const firebaseConfig = {
      apiKey: "AIzaSy...",
      authDomain: "seu-projeto.firebaseapp.com",
      projectId: "seu-projeto",
      storageBucket: "seu-projeto.appspot.com",
      messagingSenderId: "...",
      appId: "1:...:web:...",
      measurementId: "G-..."
    };
    ```

2.  **Copie todo o objeto `firebaseConfig`**.

    *   *Se você já fechou essa tela*, não se preocupe! Vá para as **Configurações do Projeto** (clicando no ícone de engrenagem ⚙️ ao lado de "Visão geral do projeto"), role para baixo até a seção **"Seus apps"**, selecione seu aplicativo web e você encontrará o objeto `firebaseConfig` lá.

## Passo 5: Cole a Configuração no seu Código

Agora, volte para o seu projeto aqui no Firebase Studio.

1.  Abra o arquivo: `src/firebase/config.ts`.
2.  Você verá um objeto `firebaseConfig` com valores de exemplo.
3.  **Substitua o conteúdo desse arquivo** pelo que você copiou do seu projeto Firebase. O arquivo deve conter apenas a sua configuração. Por exemplo:

    ```ts
    // Substitua este conteúdo pelo que você copiou do Firebase Console
    export const firebaseConfig = {
      apiKey: "SUA_API_KEY_REAL",
      authDomain: "SEU_PROJETO.firebaseapp.com",
      projectId: "SEU_PROJETO_ID",
      storageBucket: "SEU_PROJETO.appspot.com",
      messagingSenderId: "SEU_MESSAGING_SENDER_ID",
      appId: "SEU_APP_ID",
      measurementId: "SEU_MEASUREMENT_ID"
    };
    ```

**E é isso!** Depois de colar suas chaves, a aplicação estará totalmente conectada ao seu projeto Firebase, e a autenticação de usuários começará a funcionar.
