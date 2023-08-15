# Langchain, Pinecone, and GPT with Next.js

## Technologies Used

- Next.js
- LangchainJS
- Pineceone Vector Database
- GPT3

## Getting Started

### Prerequisites

To run this app, you need the following:

1. An [OpenAI](https://platform.openai.com/) API key
2. [Pinecone](https://app.pinecone.io/) API Key

### Up and running

To run the app locally, follow these steps:

1. Clone this repo

```sh
git clone https://github.com/engageintellect/pinecone-gpt.git
```

2. Change into the directory and install the dependencies using either NPM, PNPM or Yarn

3. Copy `.example.env.local` to a new file called `.env.local` and update with your API keys and environment.

   **Be sure your environment is an actual environment given to you by Pinecone, like `us-west4-gcp-free`**

4. (Optional) - Add your own custom text or markdown files into the `/documents` folder.

5. Run the app:

```sh
pnpm run dev
```

