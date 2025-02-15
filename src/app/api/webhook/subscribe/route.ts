import { NextResponse } from "next/server";

import { updateStreak } from "@/hooks/streak";
import { prisma } from "@/lib/prisma";

interface WebhookDataResponse {
  data: {
    id: string;
    email: string;
    status: string;
    utm_source: string;
    utm_medium: string;
    utm_campaign: string;
    utm_channel: string;
    referring_site: string;
    created_at: string;
  };
}

export async function POST(req: Request) {
  try {
    // Extrair o corpo da requisição
    const { email } = await req.json();

    // Aqui você pode processar o e-mail como quiser
    console.log("Recebido e-mail:", email);

    // Retornar uma resposta de sucesso
    return NextResponse.json({ message: "Sucesso!" }, { status: 200 });
  } catch (error) {
    console.error("Erro ao processar o webhook:", error);
    return NextResponse.json({ message: "Erro interno" }, { status: 500 });
  }
}

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

    console.log("Webhook recebido: ", { email, id });

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

    console.log("Response data: ", { data });

    const webhook = await prisma.webhookData.create({
      data: {
        id: data.id,
        email: data.email,
        status: data.status,
        utmSource: data.utm_source,
        utmMedium: data.utm_medium,
        utmCampaign: data.utm_campaign,
        utmChannel: data.utm_channel,
        referringSite: data.referring_site,
        createdAt: new Date(data.created_at),
      },
    });

    await updateStreak(data.email);

    return NextResponse.json(
      { message: "Webhook processado com sucesso", webhook },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erro no webhook: ", error);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
