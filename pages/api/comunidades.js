import { SiteClient } from 'datocms-client'

export default async function receiveRequest(request, response) {

    if (request.method == 'POST') {


        const API_TOKEN = process.env.NEXT_PUBLIC_TOKEN
        const client = new SiteClient(API_TOKEN)

        const registroCriado = await client.items.create({
            itemType: "966973", // model ID
            ...request.body,
        });

        response.json({
            registroCriado: registroCriado
        })

        return;
    }

    res.status(404).json({
        message: 'Ainda não temos nada no Get'
    })
}