import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const email = searchParams.get("email");
    const id = searchParams.get("id");

    if (!email || !id) {
      return NextResponse.json(
        { error: "Parâmetros inválidos" },
        { status: 400 }
      );
    }

    console.log("Webhook recebido:", { email, id });

    // salvar no banco de dados

    return NextResponse.json({ message: "Webhook recebido com sucesso" });
  } catch (error) {
    console.error("Erro no webhook:", error);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
