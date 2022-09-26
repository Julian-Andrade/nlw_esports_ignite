// Importando Express
import express, { response } from "express";
import { PrismaClient } from "@prisma/client";
import { convertHourStringToMinutes } from "./utils/convert-hour-to-minutes";
import { convertMinutesToHourString } from "./utils/convert-minutes-to-hours";
import cors from "cors";

// Permite utilizar o express na const app
const app = express();
// Permite o express entender conteúdo em JSON
app.use(express.json());
// Permite declarar quais front-ends eu desejo que teja acesso a aplicação
app.use(cors());

// Permite utilizar a porta 3001 através da const PORT
const PORT = 3001;

// Portas
app.listen(PORT, () => {
  console.log(`O Express funcionou corretamente na porta ${PORT}.`);
});

// Permite utilizar o framework ORM Prisma
const prisma = new PrismaClient({
  log: ["query"],
});

// Rotas

// Pegar => games
app.get('/games', async (request, response) => {
  const games = await prisma.game.findMany({
    include: {
      _count: {
        select: {
          ads: true,
        }
      }
    }
  });

  return response.json(games);
});

// Postar -> Anúncios
app.post("/games/:id/ads", async (request, response) => {
  const gameId = request.params.id;
  const body: any = request.body;

  const ad = await prisma.ad.create({
    data: {
      gameId,
      name: body.name,
      yersPlaying: body.yersPlaying,
      discord: body.discord,
      weekDays: body.weekDays.join(","),
      hourStart: convertHourStringToMinutes(body.hourStart),
      hourEnd: convertHourStringToMinutes(body.hourEnd),
      useVoiceChannel: body.useVoiceChannel,
    },
  });

  return response.status(201).json(ad);
});

// Pegar => games -> :id do game -> anúncio deste game escolhido por id
app.get("/games/:id/ads", async (request, response) => {
  // // Pega o parâmetro estabelecido na rota ":id"
  const gameId = request.params.id;

  // Retorna diversos valores de acordo os critérios estabelecidos
  const ads = await prisma.ad.findMany({
    select: {
      id: true,
      name: true,
      weekDays: true,
      useVoiceChannel: true,
      yersPlaying: true,
      hourStart: true,
      hourEnd: true,
    },
    where: {
      gameId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return response.json(
    ads.map((ad) => {
      return {
        ...ad,
        weekDays: ad.weekDays.split(","),
        hourStart: convertMinutesToHourString(ad.hourStart),
        hourEnd: convertMinutesToHourString(ad.hourEnd),
      };
    })
  );
});

// Pegar => ads -> :id do ad -> discord deste anúncio escolhido por id
app.get("/ads/:id/discord", async (request, response) => {
  // // Pega o parâmetro estabelecido na rota ":id"
  const adId = request.params.id;
  // Retorna este parâmetro que foi pego na rota ":id"
  // findUniqueOrThrow -> Retorna um único valor caso contrário retorna um erro
  const ad = await prisma.ad.findUniqueOrThrow({
    select: {
      discord: true,
    },
    where: {
      id: adId,
    },
  });

  return response.json({
    discord: ad.discord,
  });
});
