import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    console.log("Search Params: ", searchParams);

    const email = searchParams.get("email");
    const id = searchParams.get("id");

    if (!email || !id) {
      return NextResponse.json(
        { error: "Parâmetros inválidos" },
        { status: 400 }
      );
    }

    console.log("Webhook recebido: ", { email, id });

    // Enviar POST para API de exemplo
    const response = await fetch(
      "https://backend.testeswaffle.org/webhooks/case/subscribe",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: "Falha ao notificar a API" },
        { status: 500 }
      );
    }

    const { data }: WebhookDataResponse = await response.json();

    console.log("Webhook Data: ", { data });

    const webhook = await prisma.webhookData.create({ data });

    return NextResponse.json(
      { message: "Webhook processado com sucesso", webhook },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erro no webhook: ", error);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
